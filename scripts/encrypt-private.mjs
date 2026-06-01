/*
 * Encrypts the private PDFs (resume, recommendation letters) so they can be
 * served from the public static site WITHOUT being readable by the public.
 *
 * The access code you share with recruiters is the encryption password. It is
 * NEVER stored anywhere and never leaves the browser at runtime. The plaintext
 * PDFs never touch the server — only AES-256-GCM ciphertext does. A wrong code
 * fails the GCM auth tag, so decryption simply throws.
 *
 *   Source (plaintext, gitignored, never deployed):  private-src/*.pdf
 *   Output (ciphertext, deployed):                   public/assets/private/*.enc
 *                                                    public/assets/private/manifest.json
 *
 * Run it whenever you add/replace a private file:
 *   npm run encrypt                 # prompts for the code (hidden input)
 *   PRIVATE_CODE=yourcode npm run encrypt   # non-interactive
 */
import { readFile, writeFile, readdir, mkdir, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import readline from 'node:readline';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SRC_DIR = join(ROOT, 'private-src');
const OUT_DIR = join(ROOT, 'public', 'assets', 'private');
const ITERATIONS = 300000; // PBKDF2-SHA256; slows offline brute-force of the code

// Human-friendly labels + display order. Files not listed are appended,
// labelled by their filename.
const LABELS = {
  'resume.pdf': 'Resume',
  'recommendation1.pdf': 'Recommendation letter 1',
  'recommendation2.pdf': 'Recommendation letter 2',
  'recommendation3.pdf': 'Recommendation letter 3',
};

const b64 = (buf) => Buffer.from(buf).toString('base64');

function promptHidden(query) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    rl._writeToOutput = () => {}; // suppress echo
    process.stdout.write(query);
    rl.question('', (answer) => {
      rl.close();
      process.stdout.write('\n');
      resolve(answer);
    });
  });
}

async function deriveKey(password, salt) {
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(password),
    'PBKDF2',
    false,
    ['deriveKey'],
  );
  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt, iterations: ITERATIONS, hash: 'SHA-256' },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt'],
  );
}

async function main() {
  const code = (process.env.PRIVATE_CODE || (await promptHidden('Access code: '))).trim();
  if (!code) {
    console.error('No access code provided. Aborting.');
    process.exit(1);
  }
  if (code.length < 6) {
    console.warn('⚠  Short code — these files are public ciphertext, so use a long, hard-to-guess code.');
  }

  let names;
  try {
    names = (await readdir(SRC_DIR)).filter((n) => n.toLowerCase().endsWith('.pdf'));
  } catch {
    console.error(`No source folder found at private-src/. Put your PDFs there first.`);
    process.exit(1);
  }
  if (names.length === 0) {
    console.error('No PDFs found in private-src/. Nothing to encrypt.');
    process.exit(1);
  }

  // order: known labels first (in LABELS order), then any extras
  const known = Object.keys(LABELS).filter((n) => names.includes(n));
  const extra = names.filter((n) => !(n in LABELS)).sort();
  const ordered = [...known, ...extra];

  // wipe the output dir so deleted source files don't linger as ciphertext
  await rm(OUT_DIR, { recursive: true, force: true });
  await mkdir(OUT_DIR, { recursive: true });

  const salt = crypto.getRandomValues(new Uint8Array(16));
  const key = await deriveKey(code, salt);

  const files = [];
  for (const name of ordered) {
    const plain = await readFile(join(SRC_DIR, name));
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const cipher = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, plain);
    const encName = name.replace(/\.pdf$/i, '') + '.enc';
    await writeFile(join(OUT_DIR, encName), Buffer.from(cipher));
    files.push({
      label: LABELS[name] || name.replace(/\.pdf$/i, ''),
      name: encName,
      iv: b64(iv),
      filename: name,
      type: 'application/pdf',
    });
    console.log(`  encrypted ${name} -> ${encName}`);
  }

  const manifest = { v: 1, salt: b64(salt), iterations: ITERATIONS, files };
  await writeFile(join(OUT_DIR, 'manifest.json'), JSON.stringify(manifest, null, 2));
  console.log(`\n✓ Wrote ${files.length} encrypted file(s) + manifest.json to public/assets/private/`);
  console.log('  The plaintext PDFs stay in private-src/ (gitignored, never deployed).');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
