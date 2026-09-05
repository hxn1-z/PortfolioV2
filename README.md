# hani.so

My personal portfolio. A single-page site listing what I'm working on across business and software, with expandable sections and a contact form.

Live at [hani.so](https://hani.so).

## Stack

React + Vite, with Framer Motion for animation.

## Running locally

```bash
npm install
npm run dev      # start the dev server
npm run build    # production build
npm run preview  # preview the production build
```

## Environment

- `VITE_FORMSPREE_ID`: the contact form posts here when set, and falls back to a mailto link otherwise.
- `VITE_RECOMMENDATIONS_HASH`: SHA-256 hash of the access code that unlocks the resume and recommendation letters. The plain code is never stored in the build. Compute it with `echo -n "yourcode" | sha256sum`. The private files live in `public/assets/private/<yourcode>/`, so their URLs only exist once the correct code is entered.
