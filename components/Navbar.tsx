"use client";

import { useState, useEffect } from "react";
import { NAV_LINKS, PROFILE } from "@/data/profile";

export default function Navbar() {
    const [active, setActive] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Background blur if not at very top
            setScrolled(currentScrollY > 50);

            // Hide if scrolling down, show if scrolling up
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setHidden(true);
            } else {
                setHidden(false);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActive(`#${entry.target.id}`);
                    }
                });
            },
            { rootMargin: "-50% 0px -50% 0px" }
        );

        NAV_LINKS.forEach(({ href }) => {
            const el = document.querySelector(href);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    const handleClick = (href: string) => {
        setMenuOpen(false);
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div
            className="nav-hover-zone"
            onMouseEnter={() => setHidden(false)}
        >
            <nav className={`navbar ${scrolled ? "navbar-scrolled" : ""} ${hidden ? "navbar-hidden" : ""}`}>
                <div className="nav-inner">
                    {/* Monogram removed per user request */}

                    <div className="flex items-center gap-4">
                        <button
                            className="nav-toggle"
                            onClick={() => setMenuOpen(!menuOpen)}
                            aria-label="Toggle menu"
                        >
                            <span className={`hamburger ${menuOpen ? "open" : ""}`} />
                        </button>
                    </div>

                    {/* Links top-right */}
                    <ul className={`nav-links ${menuOpen ? "nav-links-open" : ""}`}>
                        {NAV_LINKS.map(({ label, href }) => (
                            <li key={href}>
                                <a
                                    className={`nav-link ${active === href ? "nav-link-active" : ""}`}
                                    onClick={() => handleClick(href)}
                                >
                                    {label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>
        </div>
    );
}
