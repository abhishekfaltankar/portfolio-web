/**
 * Central Profile Configuration
 * Source of truth for personal data, career status, and links.
 * Easily editable by Abhishek without touching component JSX.
 */

export const profile = {
  name: "Abhishek Faltankar",
  monogram: "AF",
  title: "Software Developer & AI/DS Student",
  statusLine: "Exploring software engineering & applied AI • Class of 2027",
  
  availability: {
    badge: "Available for Placements & Internships",
    target: "Summer & Fall Software Engineering Internships",
    active: true,
  },

  currentFocus: "Evaluating multimodal deepfake detection pipelines and engineering high-throughput telemetry systems.",

  bio: {
    short: "I'm an AI & Data Science student at university (graduating 2027) with a hands-on focus on software engineering, computer vision, and machine learning systems.",
    paragraphs: [
      "I am pursuing my B.Tech in Artificial Intelligence and Data Science with an expected graduation in 2027. My primary interest lies in the intersection of robust software development and practical machine learning — taking algorithms off whiteboards and turning them into reliable, tested applications.",
      "Rather than collecting superficial credentials, I prefer learning by building end-to-end systems from scratch: whether that means training convolutional neural networks with class-imbalanced sampling to detect video manipulation, architecting predictive maintenance APIs with strict physical constraint checks, or crafting accessible web frontends.",
      "I am currently preparing for software development placements and internships where I can contribute clean code, learn from experienced engineering teams, and solve concrete problems."
    ],
  },

  education: {
    institution: "B.Tech in Artificial Intelligence & Data Science",
    timeline: "2023 — 2027 (Expected)",
    degree: "B.Tech in Artificial Intelligence & Data Science",
    major: "Artificial Intelligence & Data Science",
    coreTopics: [
      "Data Structures & Algorithms",
      "Object-Oriented Programming",
      "Database Management Systems (PostgreSQL, SQL)",
      "Machine Learning & Deep Learning",
      "Computer Vision & Pattern Recognition",
      "Computer Networks & Operating Systems",
    ],
  },

  social: {
    github: "https://github.com/abhishekfaltankar",
    // Configurable: Abhishek can update with his real LinkedIn handle
    linkedin: "https://www.linkedin.com/in/abhishekfaltankar",
    // Configurable: Will use VITE_CONTACT_EMAIL if provided in .env
    email: import.meta.env.VITE_CONTACT_EMAIL || "abhishekfaltankar21@gmail.com",
    isEmailPlaceholder: !import.meta.env.VITE_CONTACT_EMAIL,
  },

  resume: {
    path: "/resume/abhishek-faltankar-resume.pdf",
    filename: "Abhishek_Faltankar_Resume.pdf",
    lastUpdated: "October 2026",
    // If the PDF file has not yet been placed in public/resume/, the UI provides an honest prompt
  },

  contactService: {
    // Optional external form provider (e.g. Formspree)
    // Setup in .env as VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/xyz
    endpoint: import.meta.env.VITE_FORMSPREE_ENDPOINT || "",
  },
};
