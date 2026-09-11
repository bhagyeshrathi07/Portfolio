import { RESEARCH } from "@/data/profile";
import { FiExternalLink, FiGithub } from "react-icons/fi";

export default function Research() {
    if (!RESEARCH || RESEARCH.length === 0) return null;

    return (
        <section id="research" className="section">
            <h2 className="section-title">Research & Publications</h2>
            <div className="projects-grid">
                {RESEARCH.map((res, i) => (
                    <div key={i} className="project-card">
                        <div className="project-content">
                            <h3 className="project-title">{res.title}</h3>
                            {res.authors && (
                                <p className="project-desc" style={{ fontStyle: "italic", marginBottom: "0.25rem" }}>
                                    {res.authors}
                                </p>
                            )}
                            {res.venue && (
                                <p className="project-desc" style={{ fontWeight: 600, marginBottom: "0.75rem" }}>
                                    {res.venue}
                                </p>
                            )}
                            <p className="project-desc">{res.description}</p>
                            {res.highlights && res.highlights.length > 0 && (
                                <ul className="project-highlights">
                                    {res.highlights.map((h, j) => (
                                        <li key={j}>{h}</li>
                                    ))}
                                </ul>
                            )}
                            <div className="tag-list">
                                {res.tech.map((t) => (
                                    <span key={t} className="tag">{t}</span>
                                ))}
                            </div>
                        </div>
                        {(res.link || res.github) && (
                            <div className="project-links">
                                {res.link && (
                                    <a href={res.link} target="_blank" rel="noopener" className="project-link">
                                        <FiExternalLink /> Paper
                                    </a>
                                )}
                                {res.github && (
                                    <a href={res.github} target="_blank" rel="noopener" className="project-link">
                                        <FiGithub /> Code
                                    </a>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}
