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
    "Ollama": SiOllama,
    "ChromaDB": FaDatabase,
    "Google ADK": SiGooglecloud,
    "Vertex AI": SiGooglecloud
};

export interface Experience {
    company: string;
    role: string;
    location: string;
    period: string;
    bullets: string[];
    tech: string[];
    links?: { label: string; url: string }[];
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
    github?: string;
    authors?: string;
    venue?: string;
    highlights?: string[];
}

// ----------------------------------------------------------------
// Profile Data
// ----------------------------------------------------------------

export const PROFILE = {
    name: "Bhagyesh Rathi",
    title: "Software Engineer · AI/ML · Researcher",
    tagline: "Bay Area, CA",
    bio: "I am a Software Developer and AI/ML Engineer with a passion for building intelligent, scalable systems. Currently pursuing my Master's in Artificial Intelligence at San Jose State University, my focus lies at the intersection of robust backend engineering and cutting-edge machine learning.\n\nAt Rakuten, I engineered high-impact microservices, implemented secure OAuth 2.0 architectures, and orchestrated GCP deployments with Kubernetes. Whether it's developing interactive RAG pipelines, optimizing distributed systems, or training predictive models, I thrive on turning complex technical challenges into seamless user experiences.\n\nMost recently, as a Forward Deployed Engineer Intern at Scalar Field (YC P25), I built a HubSpot MCP (Model Context Protocol) server that exposes CRM data and actions as tools for LLM agents, along with a RAG chatbot for GTM queries over internal data. I also contribute to GitLab's open-source monorepo, where my merged work includes a security fix hardening the import pipeline against DoS and a new REST endpoint in the Package Registry.\n\nOn the research side, I am co-first author of \"A Comparative Evaluation of Retrieval Pipelines for Large-Scale Scientific Question Answering with Open-Weight LLMs,\" in press at IEEE AIxSET 2026, and I am currently exploring agent safety.\n\nWhen I'm not writing code, you can find me exploring the latest advancements in LLMs or refining my problem-solving skills.",
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
        company: "Scalar Field (YC P25)",
        role: "Forward Deployed Engineer Intern",
        location: "Seattle, WA",
        period: "Jun 2026 — Aug 2026",
        bullets: [
            "Built a HubSpot MCP (Model Context Protocol) server exposing CRM data and actions as tools for LLM agents, enabling automated GTM workflows over the company's customer data",
            "Developed a RAG chatbot that retrieves lead information from a knowledge base to answer GTM queries, handling retrieval and structured responses over internal data",
        ],
        tech: ["Python", "MCP", "LLM Agents", "RAG", "HubSpot API"],
    },
    {
        company: "GitLab",
        role: "Open Source Contributor",
        location: "Remote",
        period: "Apr 2026 — Present",
        bullets: [
            "Contributed a security fix to the GitLab monorepo enforcing streaming JSON validation limits in the import pipeline's NdjsonReader to mitigate DoS from malicious export archives (MR !224828)",
            "Added a REST DELETE endpoint to GitLab's Package Registry with authorization policies, request specs, and API docs, aligning behavior with existing upload/download endpoints (MR !242461)",
        ],
        tech: ["Ruby on Rails", "REST APIs", "Security", "RSpec", "GitLab"],
        links: [
            { label: "MR !224828", url: "https://gitlab.com/gitlab-org/gitlab/-/merge_requests/224828" },
            { label: "MR !242461", url: "https://gitlab.com/gitlab-org/gitlab/-/merge_requests/242461" },
        ],
    },
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
        title: "Production-Grade RAG Portfolio (this site)",
        description: "Shipped a production-grade RAG chatbot serving real users on my live portfolio site, with a full ingestion pipeline and a streaming, guardrailed API",
        tech: ["TypeScript", "NextJS", "Vercel AI SDK", "LangChain", "Pinecone", "Vertex AI", "Gemini 2.5 Flash", "Vercel"],
        github: "https://github.com/bhagyeshrathi07/Portfolio",
        live: "https://www.bhagyesh.dev/chat",
        highlights: [
            "Ingestion: Parsed and chunked the CV PDF into semantic segments (PDF → recursive chunking → 768-dim embeddings → Pinecone upsert)",
            "Embedding: Embedded text chunks using a transformer model to generate dense vector representations",
            "Storage & Retrieval: Stored vectors in a Pinecone vector database with top-K retrieval, score thresholding, and metadata filtering to minimize hallucination",
            "Generation: Built a streaming API endpoint using Vercel AI SDK with Gemini 2.5 Flash for token-by-token delivery, achieving sub-second TTFT",
            "Security: Hardened the system against prompt injection through input validation, system-prompt design, and topic-scoped guardrails",
            "Testing: Authored a 27-test integration suite covering embedding quality, retrieval accuracy, pipeline correctness, and injection defense",
        ],
    },
    {
        title: "SRE Copilot: AI Incident Triage Agent for On-Call SREs",
        description: "Built a ReAct tool-use agent that triages production incidents across 5 data sources (RAG over 768 runbooks, text-to-SQL, GCP status API vulnerability DB, web search) using dual Qwen 2.5 models (32B + 3B) on a single GPU via 4-bit quantization.",
        tech: ["Python", "PyTorch", "LangChain", "ChromaDB", "Qwen 2.5", "Gradio"],
        github: "https://github.com/bhagyeshrathi07/SRE-Copilot",
        live: "https://colab.research.google.com/drive/1FS4udnPRWONulPQtHqEhcxvUe5EORvOj?usp=sharing",
        highlights: [
            "Evaluated 4 prompting techniques across 80 benchmarks, finding self-reflection improved answer grounding by 125% (0.40→0.90) and actionability by 100% (0.50→1.0) over baseline, while prompt chaining achieved perfect tool selection on the 32B model but failed on 3B — revealing minimum capability thresholds for structured data",
            "Achieved ~4% prefill speedup on the 32B model by building KV cache reuse for system prompt acceleration.",
            "Implemented defense-in-depth security (SQL injection blocking, prompt hardening) passing 3/5 red-team attacks per model; deployed via Gradio with real-time model/technique comparison",
        ],
    },
    {
        title: "Caption Lens — Visual-Semantic Alignment via Attention Mechanisms",
        description: "End-to-end encoder-decoder image captioning models with attention mechanisms and interactive visualizations.",
        tech: ["Python", "PyTorch", "ResNet-101", "LSTM", "Bahdanau Attention", "Beam Search", "Hugging Face Spaces", "Gradio", "Docker", "MS COCO 2014"],
        github: "https://github.com/bhagyeshrathi07/Caption-Lens",
        live: "https://huggingface.co/spaces/bhagyeshrathi/CaptionLens",
        highlights: [
            "Designed and trained three end-to-end encoder-decoder image captioning models (Show-and-Tell baseline, Show-Attend-and-Tell with soft attention, and Visual Sentinel adaptive attention) on MS COCO 2014, leveraging a fine-tuned ResNet-101 CNN encoder feeding a 7×7×2048 spatial feature grid into an LSTM language decoder",
            "Implemented Bahdanau soft attention with doubly stochastic regularization, producing dynamic per-word context vectors that boosted CIDEr from 1.023 → 1.040 and won all 8 evaluation metrics over the baseline; BLEU-4 of 0.329 materially exceeds the original 2015 paper (0.250)",
            "Engineered beam search decoding with a 1–10 beam-width ablation that lifted CIDEr from 1.013 (greedy) to 1.093 (beam=6), identifying optimal decoding configuration and quantifying the degradation from overly wide beams",
            "Built interpretable attention heatmap visualizations that trace each generated word back to the image region driving the prediction — turning a black-box captioner into a debuggable, explainable system",
            "Optimized training throughput by pre-extracting CNN features to HDF5, achieving full convergence in 30 epochs / ~3 hrs per model on an RTX 6000 with Adam + ReduceLROnPlateau scheduling",
            "Conducted CIDEr-vs-SPICE discrepancy analysis to expose blind spots in n-gram-only evaluation, demonstrating cases where models score well without semantic understanding",
            "Deployed as an interactive multi-model demo on Hugging Face Spaces via Docker + Gradio, allowing real-time image upload, model switching, and tunable beam width with live attention heatmaps"
        ],
    },
    {
        title: "AutoML",
        description: "FullStack AutoML platform and code generator",
        tech: ["Python", "Scikit-Learn", "Flask", "React"],
        github: "https://github.com/bhagyeshrathi07/AutoML",
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
        live: "https://colab.research.google.com/drive/1q-gyX8tH5f9_n9dh1pZP1d1nFQLu1AYH?usp=sharing",
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
        live: "https://colab.research.google.com/drive/1N38zGb4qSFGEnok99o3D9uRBoVMPlRQk?usp=sharing",
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
            "LLM Agents (ReAct)",
            "Model Context Protocol (MCP)",
            "LLM Evaluation",
        ],
    },
    {
        category: "Databases",
        icon: "🗄️",
        skills: ["MongoDB (NoSQL)", "MySQL", "PostgreSQL", "Redis (GCP MemoryStore)", "Pinecone (Vector DB)", "ChromaDB"],
    },
    {
        category: "Cloud",
        icon: "☁️",
        skills: ["GCP", "Docker", "Kubernetes", "AWS", "Vercel", "Vertex AI", "Google ADK"],
    },
    {
        category: "Tools",
        icon: "🔧",
        skills: ["Git", "GitHub", "GitLab", "Postman", "Jira", "Confluence", "Ollama", "OpenTelemetry", "Claude Code", "Cursor"],
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
        date: "2024",
        link: "https://coursera.org/share/40fa2fbac98e2a1af0c19a1d1eeb1fa9",
    },
];

// Publications and research — leave empty if none yet
export const RESEARCH: Research[] = [
    {
        title: "A Comparative Evaluation of Retrieval Pipelines for Large-Scale Scientific Question Answering with Open-Weight LLMs",
        authors: "Rathi, B.*, Chawla, E.*, Ershov, A., Andreopoulos, W. B. (* Equal contribution)",
        venue: "IEEE AIxSET 2026 (in press)",
        description: "A reproducible, config-driven framework comparing six retrieval strategies for scientific question answering over a ~460K-paper arXiv corpus, evaluated with open-weight LLMs.",
        tech: ["Python", "SPECTER2", "ChromaDB", "ColBERT (PLAID)", "Ollama", "Llama 3.1", "Qwen 2.5", "LLM-as-a-Judge"],
        github: "https://github.com/bhagyeshrathi07/rag_eval",
        highlights: [
            "Built a reproducible, config-driven pipeline comparing six retrieval strategies for scientific QA over a ~460K-paper arXiv corpus, taking a research prototype to a modular, release-ready codebase",
            "Implemented SPECTER2 domain embeddings with task-specific document/query adapters, a ChromaDB vector store, and an agentic tool-calling retriever via function-calling APIs",
            "Deployed and optimized the full stack on an NVIDIA DGX Spark (GB10, ARM64/CUDA 13), including getting ColBERT's PLAID late-interaction index compiling on a novel architecture and serving open-weight LLMs (Llama-3.1, Qwen2.5) locally via Ollama",
            "Designed an LLM-as-a-judge evaluation with an explicit answer/refusal gate and both conditional and unconditional scoring to fairly compare strategies with differing answer rates",
            "Parallelized generation and evaluation stages for a ~6× throughput improvement across ~20K queries",
        ],
    },
    {
        title: "PathSafe Agent: Does an Agent's Safety Depend on Where a Harmful Instruction Comes From? (In Progress)",
        description: "Ongoing research studying whether an LLM agent's safety behavior changes depending on the source of a harmful instruction — direct user input versus content encountered through tools, documents, or other agents.",
        tech: ["Python", "LLM Agents", "AI Safety", "Evaluation"],
    },
];

export const NAV_LINKS = [
    { label: "ABOUT", id: "about", href: "#about" },
    { label: "EXPERIENCE", id: "experience", href: "#experience" },
    { label: "RESEARCH", id: "research", href: "#research" },
    { label: "PROJECTS", id: "projects", href: "#projects" },
    { label: "SKILLS", id: "skills", href: "#skills" },
    { label: "EDUCATION", id: "education", href: "#education" },
    { label: "CONTACT", id: "contact", href: "#contact" },
];
