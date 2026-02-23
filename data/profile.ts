/* ================================================================
   Portfolio Data — All content lives here
   Update this file to change what appears on the site
   ================================================================ */

// ----------------------------------------------------------------
// Types
// ----------------------------------------------------------------

import {
    SiPython, SiCplusplus, SiTypescript, SiJavascript, SiSpringboot, SiFlask,
    SiTensorflow, SiPandas, SiNumpy, SiNextdotjs, SiMongodb, SiMysql, SiPostgresql,
    SiRedis, SiGooglecloud, SiDocker, SiKubernetes, SiAmazonwebservices, SiVercel,
    SiGit, SiPostman, SiSonarqube, SiGitlab, SiJira, SiOpentelemetry, SiSpring, SiGithub, SiConfluence, SiKotlin, SiScikitlearn, SiPytorch, SiLangchain, SiOllama, SiHuggingface, SiReact
} from "react-icons/si";
import { VscTerminalBash } from "react-icons/vsc";
import { FaJava, FaDatabase } from "react-icons/fa";
import React from "react";

// Add any new icons to this map!
export const SKILL_ICONS: Record<string, React.ElementType> = {
    "Java": FaJava,
    "Python": SiPython,
    "C++": SiCplusplus,
    "TypeScript": SiTypescript,
    "JavaScript": SiJavascript,
    "Kotlin": SiKotlin,
    "SQL": FaDatabase,
    "Bash": VscTerminalBash,
    "Spring": SiSpring,
    "Spring Boot": SiSpringboot,
    "Flask": SiFlask,
    "Scikit-Learn": SiScikitlearn,
    "TensorFlow": SiTensorflow,
    "PyTorch": SiPytorch,
    "Pandas": SiPandas,
    "NumPy": SiNumpy,
    "NextJS": SiNextdotjs,
    "React": SiReact,
    "LangChain": SiLangchain,
    "Hugging Face": SiHuggingface,
    "MongoDB (NoSQL)": SiMongodb,
    "MySQL": SiMysql,
    "PostgreSQL": SiPostgresql,
    "Redis (GCP MemoryStore)": SiRedis,
    "Pinecone": FaDatabase,
    "Pinecone (Vector DB)": FaDatabase,
    "GCP": SiGooglecloud,
    "Docker": SiDocker,
    "Kubernetes": SiKubernetes,
    "AWS": SiAmazonwebservices,
    "Vercel": SiVercel,
    "Git": SiGit,
    "GitHub": SiGithub,
    "GitLab": SiGitlab,
    "Postman": SiPostman,
    "SonarQube": SiSonarqube,
    "GitLab CI/CD": SiGitlab,
    "Jira": SiJira,
    "Confluence": SiConfluence,
    "OpenTelemetry": SiOpentelemetry,
    "Ollama": SiOllama
};

export interface Experience {
    company: string;
    role: string;
    location: string;
    period: string;
    bullets: string[];
    tech: string[];
}

export interface Project {
    title: string;
    description: string;
    tech: string[];
    github?: string;
    live?: string;
    highlights: string[];
}

export interface SkillCategory {
    category: string;
    icon: string;
    skills: string[];
}

export interface Education {
    degree: string;
    school: string;
    location: string;
    period: string;
    gpa?: string;
    honors?: string;
    coursework: string[];
}

export interface Certification {
    name: string;
    issuer: string;
    date: string;
    link?: string;
}

export interface Research {
    title: string;
    description: string;
    tech: string[];
    link?: string;
}

// ----------------------------------------------------------------
// Profile Data
// ----------------------------------------------------------------

export const PROFILE = {
    name: "Bhagyesh Rathi",
    title: "Software Engineer · AI/ML",
    tagline: "Bay Area, CA",
    bio: "I am a Software Developer and AI/ML Engineer with a passion for building intelligent, scalable systems. Currently pursuing my Master's in Artificial Intelligence at San Jose State University, my focus lies at the intersection of robust backend engineering and cutting-edge machine learning.\n\nAt Rakuten, I engineered high-impact microservices, implemented secure OAuth 2.0 architectures, and orchestrated GCP deployments with Kubernetes. Whether it's developing interactive RAG pipelines, optimizing distributed systems, or training predictive models, I thrive on turning complex technical challenges into seamless user experiences.\n\nWhen I'm not writing code, you can find me exploring the latest advancements in LLMs or refining my problem-solving skills.",
    // Obfuscated email to prevent scraping
    contact: {
        emailUser: "bhageyesh2161",
        emailDomain: "gmail.com",
    },
    github: "https://github.com/bhagyeshrathi07",
    linkedin: "https://www.linkedin.com/in/bhagyeshrathi07/",
    resumeUrl: "/Bhagyesh_Resume.pdf",
};

export const EXPERIENCE: Experience[] = [
    {
        company: "Rakuten",
        role: "Software Engineer Intern",
        location: "San Mateo, CA",
        period: "May 2023 — Aug 2023",
        bullets: [
            "Engineered Kotlin microservices for Social Authentication (Google, Apple, Facebook), driving a 40% adoption rate and a 37% increase in conversion rate.",
            "Developed robust REST APIs utilizing OpenID Connect and OAuth 2.0 to implement secure token-based authentication and authorization flows",
            "Architected scalable infrastructure on Google Cloud Platform (GCP), orchestrating Docker containers with Kubernetes via automated GitLab CI/CD pipelines",
            "Established comprehensive system observability by integrating OpenTelemetry with GCP Cloud Trace and structured Log4j logging for real-time performance insights",
        ],
        tech: ["Kotlin", "Spring Boot", "GCP", "Docker", "Kubernetes", "OAuth2.0", "CI/CD"],
    },
    {
        company: "Rakuten",
        role: "Software Engineer Co-op",
        location: "San Mateo, CA",
        period: "Aug 2023 — Dec 2023",
        bullets: [
            "Architected and deployed a core internal SDK that abstracted complex service-to-service communications, successfully published to Artifactory via GitLab CI/CD",
            "Engineered secure event listeners using Kotlin to intercept and process critical compliance signals (consent revocation, account deletion) from OAuth providers",
            "Implemented robust security protocols by validating and decoding JSON Web Tokens (JWT) to securely authenticate inter-service requests",
        ],
        tech: ["Kotlin", "JWT", "GitLab CI/CD", "JaCoCo", "SonarQube"],
    },
];

export const PROJECTS: Project[] = [
    {
        title: "RAG Based Interactive Resume",
        description: "Implemented a production-grade RAG deployment on a user-facing portfolio site",
        tech: ["Python", "Typescript", "NextJS", "Vercel", "Pinecone", "Vertex AI"],
        github: "https://github.com/bhagyeshrathi07/Portfolio",
        highlights: [
            "Ingestion: Parsed and chunked resume PDF into semantic segments",
            "Embedding: Embedded text chunks using a transformer model to generate dense vector representations",
            "Storage & Retrieval: Stored vectors in a Pinecone vector database and implemented retrieval to compare user queries against stored vectors",
            "Generation: Passed retrieved context + query to Vertex AI (Gemini) LLM to generate accurate, context-aware responses",
        ],
    },
    {
        title: "AutoML",
        description: "FullStack AutoML platform and code generator",
        tech: ["Python", "Scikit-Learn", "Flask", "React"],
        github: "https://github.com/bhagyeshrathi07",
        highlights: [
            "Engineered an AutoML system using Scikit-Learn & Flask that automates preprocessing, task detection, and parallel model training/evaluation",
            "Designed a responsive React frontend with real-time interactive ROC/Scatter plots and confusion matrix for visualizations of top model",
            "Reduced training latency by 40% implementing Stratified Sampling and dynamic model switching to handle large datasets efficiently",
            "Developed a context manager to profile real-time CPU/RAM usage & a leaderboard to sort models by accuracy, time, or resource efficiency",
            "Built a transpiler engine to enable one-click downloads for both serialized models (.pkl) and their reproduction code",
        ],
    },
    {
        title: "Bank Churn Data Analysis and Prediction using ML",
        description: "Data analysis and prediction using ML",
        tech: ["Python", "Scikit-Learn", "Pandas", "Seaborn", "Matplotlib"],
        live: "https://colab.research.google.com",
        highlights: [
            "Analyzed data of 10,000 account holders at a Multinational Bank by doing exploratory data analysis with Pandas",
            "Constructed a streamlined pipeline for training 5 machine learning models to predict customer churn using Scikit-Learn",
            "Implemented XGBoost, Random Forest, KNN, SVM, and Naive Bayes models and compared them",
            "Utilized N-fold cross-validation, F1-score, confusion matrix to evaluate the performance of each model",
        ],
    },
    {
        title: "Skin Cancer Detection using CNN",
        description: "CNN-based image classification for skin cancer detection",
        tech: ["Python", "TensorFlow", "Scikit-Learn", "Pandas", "Seaborn"],
        live: "https://colab.research.google.com",
        highlights: [
            "Developed a CNN using Scikit-Learn to classify skin lesion images into 7 cancer categories, achieving 80% accuracy",
            "Preprocessed data with resizing, normalization, one-hot encoding, and oversampling to address class imbalance",
            "Optimized model performance using the Adam optimizer, learning rate annealing, and hyperparameter tuning",
        ],
    },
];

export const SKILLS: SkillCategory[] = [
    {
        category: "Languages",
        icon: "💻",
        skills: ["Java", "Python", "JavaScript", "Kotlin", "SQL"],
    },
    {
        category: "Frameworks",
        icon: "🧠",
        skills: ["React", "NextJS", "Spring", "Spring Boot", "Flask", "Scikit-Learn", "TensorFlow", "PyTorch", "Pandas", "NumPy", "Seaborn", "LangChain", "Hugging Face"],
    },
    {
        category: "Skills & Technologies",
        icon: "🌐",
        skills: [
            "REST APIs",
            "Distributed Systems",
            "Microservices",
            "CI/CD",
            "Agile",
            "Unit/Integration Testing",
            "Monitoring & Alerting",
            "Retrieval-Augmented Generation (RAG)",
        ],
    },
    {
        category: "Databases",
        icon: "🗄️",
        skills: ["MongoDB (NoSQL)", "MySQL", "PostgreSQL", "Redis (GCP MemoryStore)", "Pinecone (Vector DB)"],
    },
    {
        category: "Cloud",
        icon: "☁️",
        skills: ["GCP", "Docker", "Kubernetes", "AWS", "Vercel", "Vertex AI"],
    },
    {
        category: "Tools",
        icon: "🔧",
        skills: ["Git", "GitHub", "GitLab", "Postman", "Jira", "Confluence", "Ollama"],
    },
];

export const EDUCATION: Education[] = [
    {
        degree: "Masters of Science in Artificial Intelligence",
        school: "San Jose State University",
        location: "San Jose, CA",
        period: "Expected: May 2027",
        gpa: "3.9",
        coursework: [
            "Machine Learning",
            "Deep Learning",
            "AI Threat Intelligence",
            "Natural Language Processing (NLP)",
            "AI and Data Engineering",
        ],
    },
    {
        degree: "Bachelors of Science in Computer Science",
        school: "San Jose State University",
        location: "San Jose, CA",
        period: "August 2020 — May 2024",
        honors: "Magna Cum Laude",
        coursework: [
            "Java OOP",
            "Data Structures and Algorithms",
            "Software Engineering",
            "Relational Databases",
            "Data Visualization",
        ],
    },
];

// Certifications from resume
export const CERTIFICATIONS: Certification[] = [
    {
        name: "Machine Learning Specialization",
        issuer: "Stanford",
        date: "2024"
    },
];

// Add research items here — leave empty if none yet
export const RESEARCH: Research[] = [
    // Example:
    {
        title: "Geometric Consistency: Latent Space Pruning for Chain-of-Thought Reasoning (In Progress)",
        description: "This paper proposes and evaluates a novel unsupervised method, Geometric Consistency, designed to enhance reasoning reliability by filtering outliers within the latent vector space.",
        tech: ["Python", "Sentence-Transformers"],
        link: "https://docs.google.com/document/d/1dWqgCIBGd9T699C3LidrXEcy9239KbLinzEOGbtvs8M/edit?usp=sharing"
    },
    {
        title: "AutoML (In Progress)",
        description: "Automated Machine Learning",
        tech: ["Python", "Scikit-Learn", "Flask", "React"],
        link: "https://..."
    }
];

export const NAV_LINKS = [
    { label: "ABOUT", id: "about", href: "#about" },
    { label: "EXPERIENCE", id: "experience", href: "#experience" },
    { label: "RESEARCH INTERESTS", id: "research", href: "#research" },
    { label: "PROJECTS", id: "projects", href: "#projects" },
    { label: "SKILLS", id: "skills", href: "#skills" },
    { label: "EDUCATION", id: "education", href: "#education" },
    { label: "CONTACT", id: "contact", href: "#contact" },
];
