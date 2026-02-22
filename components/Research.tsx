import { RESEARCH } from "@/data/profile";
import { FiExternalLink } from "react-icons/fi";

export default function Research() {
    if (!RESEARCH || RESEARCH.length === 0) return null;

    return (
        <section id="research" className="section">
            <h2 className="section-title">RESEARCH INTERESTS</h2>
            <div className="projects-grid">
                {RESEARCH.map((res, i) => (
                    <div key={i} className="project-card">
                        <div className="project-content">
                            <h3 className="project-title">{res.title}</h3>
                            <p className="project-desc">{res.description}</p>
                            <div className="tag-list">
                                {res.tech.map((t) => (
                                    <span key={t} className="tag">{t}</span>
                                ))}
                            </div>
                        </div>
                        {res.link && (
                            <div className="project-links">
                                <a href={res.link} target="_blank" rel="noopener" className="project-link">
                                    <FiExternalLink /> Paper / Link
                                </a>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}
