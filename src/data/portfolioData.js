// master doc for all portfolio data - edit this to update the site

export const personalInfo = {
  name: "Hani Zaidi",
  title: "Grade 11 Student, Robotics Business Lead, OTHS Bike Club Founder",
  tagline: "Technical builder with a business mindset.",
  email: "m.hanizaidi@gmail.com",
  location: "Oakville, ON, Canada",
  social: {
    github: "https://github.com/hxn1-z",
    linkedin: "https://www.linkedin.com/in/hani-zaidi-50aa99386/",
    instagram: "https://www.instagram.com/hanizaidi09/",
  },
  profileImage: "/assets/profile.jpg",
};

// floating cards
export const heroCards = [
  { label: "looking for", value: "summer co-op" },
];

// intro animation text - customize the loading screen
export const introAnimation = {
  name: "hxn1.dev", // the big text shown during intro
  tagline: "pls hire me", // text below the name
};

export const aboutMe = {
  title: "About",
  description: `
    I’m a Grade 11 student at Oakville Trafalgar High School who likes building real projects and improving them until they’re solid.
    I’m most interested in the mix of business and computer science; I like the strategy behind building something, and the technical work that makes it real.

    In robotics, I’m the Business Lead for FRC Team 1334, where I work on sponsorships, outreach, and team strategy.
    Outside of school, I build computer science projects for fun (usually ideas I actually want to use, not just assignments).

    Academically, I’m an Honor Roll student at OTHS and try my hardest to achieve the best results I can while balancing extracurricular activities.

    Outside of tech, I’m serious about cycling (founded my school's bike club). I train and race at the Mattamy National Cycling Centre, and I approach it the same way I approach projects: consistent work, clear goals, and measurable progress.

    I try to build things that look clean, run fast, and have a clear purpose.
  `,
  highlights: [
    "Honor Roll Student, OTHS",
    "Business Lead, FRC 1334 Robotics (managing money and finding and maintaining sponsorships)",
    "Making SafeSpace: a real-time chat app focused on privacy and encryption - check it out on safespace.hxn1.dev",
    "Founder, Oakville Trafalgar Bike Club",
    "Volunteering experience in community + STEM spaces",
  ],
};

export const skills = {
  title: "Skills",
  categories: [
    {
      name: "Programming",
      items: ["Python", "C++", "JavaScript", "HTML/CSS"],
    },
    {
      name: "Web / App",
      items: ["React", "Vite", "Node.js", "Express", "Socket.IO", "Tailwind CSS"],
    },
    {
      name: "Systems / Tools",
      items: [
        "Git",
        "Ubuntu",
        "Nginx",
        "Cloudflare Tunnel",
        "VS Code",
        "Oracle Cloud",
      ],
    },
    {
      name: "Design / Media",
      items: ["Photoshop", "Illustrator", "Premiere Pro", "Canva"],
    },
  ],
};

export const projects = {
  title: "Projects",
  subtitle: "stuff i've built or i'm still working on",
  items: [
    {
      id: 1,
      title: "SafeSpace (Real-Time Encrypted Chat)",
      description:
        "A real-time chat app focused on privacy. Built with Node/Express + Socket.IO and a React frontend. I'm working on end-to-end encryption, reliable real-time state, and a clean modern UI. Check it out on safespace.hxn1.dev",
      fullDescription: `
        SafeSpace is a privacy-focused real-time chat application designed with security in mind.
        
        Key Features:
        - Real-time messaging with Socket.IO
        - End-to-end encryption for secure conversations
        - Clean, modern React-based UI
        - Reliable state management for seamless experience
        
        This project taught me a lot about WebSocket implementations, encryption best practices, and building responsive real-time interfaces.
      `,
      image: "/assets/projects/safespace.jpg",
      media: [
        // FOR PEOPLE LOOKING AT MY PROJECT WITH GITHUB
        // Add images/videos: { type: "image", url: "/src/assets/projects/safespace-1.jpg", caption: "Chat interface" }
        // { type: "video", url: "/src/assets/projects/safespace-demo.mp4", caption: "Demo video" }
      ],
      tags: ["React", "Node.js", "Express", "Socket.IO", "E2EE"],
      liveUrl: "https://safespace.hxn1.dev",
      githubUrl: "https://github.com/hxn1-z",
      showGithubOnly: true, // only show GitHub link
      featured: true,
    },
    {
      id: 2,
      title: "Arduino Mini Elevator",
      description:
        "A small Arduino project that uses simple control logic and hardware wiring. I found it to be good practice for clean wiring, debugging, and building something physical that actually works.",
      fullDescription: `
        A miniature elevator system built with Arduino, demonstrating fundamental electronics and programming concepts.
        
        Technical Details:
        - Uses a stepper motor to accurately stop at the right floor
        - Connected to a 3D printed shaft
        - Button selects floors
        - LED Lights detect which floor its on
        
        This project strengthened my understanding of hardware-software integration and debugging physical systems (and patience from some broken parts ;c).
      `,
      image: "/assets/projects/elevator.jpg",
      media: [],
      tags: ["Arduino", "C++", "Hardware"],
      liveUrl: "",
      githubUrl: "",
      showGithubOnly: false,
      featured: true,
    },
    {
      id: 3,
      title: "ESP32 Wifi Mini Vending Machine",
      description:
        "A fully functional vending machine using an esp32 + keypad + i2c lcd + 3 servo motors. Built as my elective project for my computer engineering course.",
      fullDescription: `
       Easy to use cardboard vending machine that dispenses jolly ranchers.
        
        How it works:
        - User connects to wifi network (peer to peer) (the website ip is displayed on the i2c lcd)
        - After connecting, the user has to register with an account and log in
        - Only after successfuly logging in is the pinpad activated
        - The user uses the pinpad to dispense the product they desire
        
        Small vending machine created in 2 weeks.
      `,
      image: "/assets/projects/christmas.jpg",
      media: [],
      tags: ["Arduino", "Sensors", "Prototyping"],
      liveUrl: "",
      githubUrl: "",
      showGithubOnly: false,
      featured: false,
    },
    {
      id: 4,
      title: "Portfolio Website",
      description:
        "A clean portfolio site to present projects, leadership, and progress. Built for speed, simplicity, and good visuals.",
      fullDescription: `
        A modern, responsive portfolio website built with React and Vite.
        
        Highlights:
        - Smooth animations with Framer Motion
        - Interactive particle effects
        - Fully responsive design
        - Dark theme with glassmorphism effects
        
        This portfolio showcases my work while also being a project in itself.
      `,
      image: "/assets/projects/portfolio.jpg",
      media: [],
      tags: ["React", "Tailwind CSS"],
      liveUrl: "",
      githubUrl: "https://github.com/hxn1-z",
      showGithubOnly: true, // only show GitHub link
      featured: false,
    },
  ],
};

export const achievements = {
  title: "Achievements",
  items: [
    {
      id: 1,
      title: "Cisco IT Essentials 8 (Certified)",
      organization: "Cisco",
      description: "Earned Cisco IT Essentials 8 certification.",
      icon: "certificate",
    },
    {
      id: 2,
      title: "Microsoft Office Specialist Certification (MOS)",
      organization: "Microsoft",
      description: "Certified as a Microsoft Office Specialist (MOS).",
      icon: "certificate",
    },
    {
      id: 3,
      title: "Track Racing Certification",
      organization: "Cycling (Track)",
      description: "Completed track racing certification and continued structured training.",
      icon: "certificate",
    },
    {
      id: 4,
      title: "Business Lead, FRC 1334 Robotics",
      organization: "FIRST Robotics Competition",
      description: "Sponsorship/outreach leadership, team strategy, and presentations.",
      icon: "certificate",
    },
  ],
};

export const experience = {
  title: "Experience",
  items: [
    {
      id: 1,
      role: "Business Lead",
      company: "FRC 1334 Robotics",
      description:
        "Lead sponsorship/outreach, pitch writing, presentation prep, and team planning. I focus on making the team look professional and organized.",
      highlights: [
        "Built sponsor outreach and pitch materials",
        "Helped organize team branding and communication",
        "Worked with technical team to present progress clearly",
      ],
      media: [
        {
          type: "image",
          url: "/assets/experience/robotics-1.png",
          caption: "Me on the 1334 Leads Post on Instagram @1334robotics",
        },
      ],
    },
    {
      id: 2,
      role: "Founder",
      company: "Oakville Trafalgar Bike Club",
      description:
        "Started a school bike club to get more students riding and training consistently, with an actual plan and culture. @othsbikeclub on instagram.",
      highlights: [
        "Organized rides and basic structure",
        "Encouraged beginners while keeping it serious",
        "Built community around cycling at school",
      ],
      media: [
        {
          type: "image",
          url: "/assets/experience/bikeclub-1.png",
          caption: "Bike Club at the OTHS Club Fair",
        },
      ],
    },
    {
      id: 3,
      role: "Volunteer",
      company: "Community + STEM Programs",
      description:
        "Volunteered in multiple environments and learned how to be dependable, communicate clearly, and help without needing supervision.",
      highlights: [
        "Healthcare clinic support (admin + helping where needed)",
        "Food bank and community support work",
        "STEM learning support with younger students",
      ],
      media: [
        {
          type: "image",
          url: "/assets/experience/volunteer-1.png",
          caption: "Sitting inside a Halton Police van while volunteering at their PEACE leadership program",
        },
      ],
    },
  ],
};

export const contact = {
  title: "Contact Me",
  subtitle: "wanna chat?",
  description:
    "I'm open to internships, volunteering opportunities, robotics sponsorship connections, and serious project collaboration. If you'd like my resume, email me and I'll send it over.",
};

// Recommendations section - protected by access code
// To add more recommendations, just add another object to the items array
export const recommendations = {
  title: "Recommendation Letters",
  subtitle: "letters from teachers and people i've worked with",
  items: [
    {
      id: 1,
      title: "Communications Technology Teacher Recommendation",
      author: "Mr. Stark",
      role: "Teacher at OTHS",
      organization: "Oakville Trafalgar High School",
      pdfUrl: "/assets/recommendations/recommendation-1.pdf",
    },
    {
      id: 2,
      title: "NIPISSING MEDICAL CLINIC ONE",
      author: "get",
      role: "get",
      organization: "get",
      pdfUrl: "/assets/recommendations/recommendation-2.pdf",
    },
    {
      id: 3,
      title: "palmer or woods hopefully",
      author: "get",
      role: "get",
      organization: "get",
      pdfUrl: "/assets/recommendations/recommendation-3.pdf",
    },
  ],
};

export const navigation = {
  logo: "Hani Zaidi",
  links: [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Achievements", href: "#achievements" },
    { name: "Recommendations", href: "#recommendations" },
    { name: "Contact", href: "#contact" },
  ],
};

export const footer = {
  text: "made by hani",
  copyright: `© ${new Date().getFullYear()} Hani Zaidi`,
};
