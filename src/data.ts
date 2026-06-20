export interface Project {
  id: string;
  title: string;
  year: string;
  technologies: string[];
  links: {
    demo?: string;
    github?: string;
  };
  highlights: string[];
  description: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  highlights: string[];
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export const RESUME_DATA = {
  personal: {
    name: "Dipti Patil",
    title: "Full-Stack Developer",
    subtitle: "Specializing in Backend Systems & AI-Driven Applications",
    email: "diptipatil1722@gmail.com",
    phone: "+91 9834310322",
    location: "India",
    github: "https://github.com/Dipti17P",
    linkedin: "https://linkedin.com/in/dipti-patil",
    summary: "Full-stack developer specializing in backend systems and AI-driven applications using Python, Node.js, and React. Experienced in building scalable REST APIs, ML pipelines, and real-time systems. Focused on performance optimization, clean architecture, and solving real-world problems using data-driven approaches."
  },
  education: {
    institution: "SVKM's Institute of Technology, Dhule",
    degree: "B.Tech in Computer Engineering",
    period: "2023 – 2027"
  },
  experience: [
    {
      id: "exp1",
      role: "Web Development Intern",
      company: "Unique Coders Pvt. Ltd.",
      location: "Pune, India",
      period: "Jul 2024 – Aug 2024",
      highlights: [
        "Developed and maintained responsive web interfaces using HTML, CSS, JavaScript, and React, improving cross-device compatibility.",
        "Collaborated with a team of developers to implement new UI features and resolve production issues.",
        "Optimized frontend assets and rendering workflows, reducing page load time and improving responsiveness.",
        "Participated in debugging, testing, and deployment activities using Git-based workflows."
      ]
    }
  ] as Experience[],
  projects: [
    {
      id: "proj1",
      title: "AI-Powered Hunger Hotspot Detection System",
      year: "2026",
      technologies: ["Python", "Scikit-learn", "React", "Node.js", "MongoDB"],
      links: {
        demo: "https://ai-powered-hunger-hotspot-detection.vercel.app/",
        github: "https://github.com/Dipti17P"
      },
      description: "An AI-powered system designed to analyze geospatial datasets (~10K+ records) using K-Means clustering and Decision Trees to identify and categorize high-risk hunger zones for NGO intervention.",
      highlights: [
        "Built ML pipeline using K-Means and Decision Trees on geospatial datasets (~10K+ records) to identify high-risk hunger zones.",
        "Designed REST APIs with JWT authentication supporting secure data access and NGO coordination.",
        "Developed full-stack dashboard for visualization of clusters and resource allocation insights.",
        "Improved backend performance by optimizing queries and indexing, reducing response time by ~30%."
      ]
    },
    {
      id: "proj2",
      title: "SkinSense – Smart Skin Product Recommender",
      year: "2025",
      technologies: ["Django", "PostgreSQL", "Tailwind CSS"],
      links: {
        demo: "https://skinsense-wx4w.onrender.com/",
        github: "https://github.com/Dipti17P"
      },
      description: "A smart skin care product recommendation platform tailored around individual user skin profiles and custom dynamic filtering structures.",
      highlights: [
        "Built personalized recommendation system using rule-based filtering based on user skin type and preferences.",
        "Optimized SQL queries leading to a ~25% reduction in backend query response times.",
        "Implemented user authentication portals, robust dashboard systems, and custom category-based filtering.",
        "Designed responsive, adaptive user interfaces to maintain seamless visuals across all screens."
      ]
    },
    {
      id: "proj3",
      title: "MediCheck AI – Medicine Interaction System",
      year: "2026",
      technologies: ["Python", "FastAPI", "Flutter", "NLP"],
      links: {
        demo: "#",
        github: "https://github.com/Dipti17P"
      },
      description: "An analytical NLP engine powered by S-BERT embeddings that instantly cross-references medicine ingredients to detect negative drug-to-drug interactions under 200 milliseconds.",
      highlights: [
        "Developed NLP-based system using transformer embeddings (Sentence-BERT) to detect medicine interactions.",
        "Built scalable REST APIs using FastAPI with real-time processing and low-latency responses (~200ms).",
        "Developed cross-platform Flutter application with JWT authentication and real-time backend integration.",
        "Implemented reminder and alert system improving adherence tracking workflow.",
        "Ensured backend reliability through validation, error handling, and modular architecture design."
      ]
    },
    {
      id: "proj4",
      title: "Ecommerce – Scale Fullstack Storefront",
      year: "2024",
      technologies: ["React", "Node.js", "Express", "MongoDB", "Cloudinary"],
      links: {
        demo: "#",
        github: "https://github.com/Dipti17P/ecommerce-app"
      },
      description: "Full-stack e-commerce web application built with React, Node.js, Express, and MongoDB. Features user authentication, product management, shopping cart, and Cloudinary image storage.",
      highlights: [
        "Created a responsive React storefront integrated with Node.js/Express server logic and MongoDB.",
        "Implemented secure user authentication with session management and user roles.",
        "Built robust product management admin utilities and intuitive shopping cart functionality.",
        "Integrated Cloudinary cloud storage SDK for low-latency media and product image serving."
      ]
    },
    {
      id: "proj5",
      title: "Beneficiary Credit Scoring Ledger",
      year: "2024",
      technologies: ["React", "Python", "SQLite", "Tailwind CSS", "Scikit-learn"],
      links: {
        demo: "#",
        github: "https://github.com/Dipti17P/beneficiary-credit-scoring"
      },
      description: "AI-powered Beneficiary Credit Scoring and Digital Lending Prototype using React + Vite + Tailwind (Frontend) and Python + SQLite (Backend) for transparent and inclusive lending.",
      highlights: [
        "Engineered an AI-backed digital credit scoring prototype supporting non-traditional indicators.",
        "Designed a lightweight and portable database schema with Python & SQLite to manage applicant logs.",
        "Created interactive, high-fidelity visual dashboards with Recharts and Tailwind CSS in React.",
        "Secured and modularized machine learning prediction pipelines for lending transparency."
      ]
    },
    {
      id: "proj6",
      title: "EZLeave – Role-Based HR Tracker",
      year: "2025",
      technologies: ["PHP", "MySQL", "Tailwind CSS", "Bootstrap", "Apache"],
      links: {
        demo: "#",
        github: "https://github.com/Dipti17P/EZLeave"
      },
      description: "EZLeave is a web-based Leave Management System built using PHP and MySQL. It allows admins and employees to manage leave applications efficiently with role-based access.",
      highlights: [
        "Designed role-based access control systems with PHP for employee and admin administrative dashboards.",
        "Optimized transactional relational database queries in MySQL for robust history tracking.",
        "Implemented real-time notification hooks and leave entitlement counters to save HR hours.",
        "Refined clean UI widgets with modern styling and defensive forms to prevent SQL injection spikes."
      ]
    }
  ] as Project[],
  skills: [
    { category: "Languages", items: ["Python", "JavaScript", "C++", "SQL"] },
    { category: "Frontend", items: ["React.js", "Flutter", "Tailwind CSS"] },
    { category: "Backend", items: ["FastAPI", "Node.js", "Express.js", "Django", "REST APIs", "JWT"] },
    { category: "Databases", items: ["MongoDB", "PostgreSQL"] },
    { category: "Machine Learning", items: ["Scikit-learn", "Pandas", "NumPy", "NLP"] },
    { category: "Tools & DevOps", items: ["Git", "GitHub", "Linux", "Postman", "Docker", "Vercel"] }
  ] as SkillCategory[],
  achievements: [
    {
      title: "GATE 2026 Qualified",
      description: "Successfully qualified the Graduate Aptitude Test in Engineering (GATE) 2026, demonstrating strong conceptual problem-solving skills and mastery over core Computer Science and Engineering fundamentals."
    },
    {
      title: "Open Source Contributor (GSSOC)",
      description: "Contributed features and critical bug fixes to production repositories. Implemented secure user authentication and modern password-reset workflows. Actively collaborated with global maintainers via code reviews and issues."
    }
  ]
};
