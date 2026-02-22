import { PROJECTS } from "@/data/profile";

export default function Projects() {
    return (
        <section id="projects" className="section">
            <h2 className="section-title">Projects</h2>
            <div className="projects-grid">
                {PROJECTS.map((project, i) => (
                    <div key={i} className="project-card">
                        <div className="project-card-header">
                            <h3 className="project-title">{project.title}</h3>
                            <div className="project-links">
                                {project.github && (
                                    <a href={project.github} target="_blank" rel="noopener" className="project-link">
                                        GitHub ↗
                                    </a>
                                )}
                                {project.live && (
                                    <a href={project.live} target="_blank" rel="noopener" className="project-link">
                                        {project.live.includes("colab") ? "Colab ↗" : "Live ↗"}
                                    </a>
                                )}
                            </div>
                        </div>
                        <p className="project-desc">{project.description}</p>
                        <ul className="project-highlights">
                            {project.highlights.map((h, j) => (
                                <li key={j}>{h}</li>
                            ))}
                        </ul>
                        <div className="tag-list">
                            {project.tech.map((t) => (
                                <span key={t} className="tag">{t}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
