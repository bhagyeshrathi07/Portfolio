"use client";

import { useState } from "react";
import { PROFILE } from "@/data/profile";
import { FiChevronDown } from "react-icons/fi";

export default function Hero() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <section className="hero">
            <div className="hero-content">
                <p className="hero-label">{PROFILE.name}</p>
                <h1 className="hero-headline">
                    <span className="hero-line hero-line-light">SOFTWARE</span>
                    <span className="hero-line hero-line-accent">DEVELOPER</span>
                    <span className="hero-line hero-line-light">&amp; AI/ML</span>
                    <span className="hero-line hero-line-accent">ENGINEER</span>
                </h1>
                <div className="hero-bottom">
                    <div className="hero-dropdown">
                        <button
                            className={`hero-dropdown-toggle ${isOpen ? 'open' : ''}`}
                            onClick={() => setIsOpen(!isOpen)}
                            aria-label="Toggle Links"
                        >
                            <FiChevronDown />
                        </button>

                        <div className={`hero-dropdown-menu ${isOpen ? 'open' : ''}`}>
                            <a href={PROFILE.resumeUrl} target="_blank" rel="noopener" className="btn btn-primary">
                                Resume
                            </a>
                            <a href={PROFILE.github} target="_blank" rel="noopener" className="btn btn-ghost">
                                GitHub
                            </a>
                            <a href={PROFILE.linkedin} target="_blank" rel="noopener" className="btn btn-ghost">
                                LinkedIn
                            </a>
                            <a href="/chat" className="btn btn-ghost">
                                Chat with Resume
                            </a>
                        </div>
                    </div>

                    <div className="hero-location">
                        <span className="hero-dot" />
                        {PROFILE.tagline}
                    </div>
                </div>
            </div>
        </section>
    );
}
