import { EXPERIENCE } from "@/data/profile";

export default function Experience() {
    return (
        <section id="experience" className="section">
            <h2 className="section-title">Experience</h2>
            <div className="timeline">
                {EXPERIENCE.map((exp, i) => (
                    <div key={i} className="timeline-item">
                        <div className="timeline-dot" />
                        <div className="timeline-content">
                            <div className="timeline-header">
                                <div>
                                    <h3 className="timeline-role">{exp.role}</h3>
                                    <p className="timeline-company">
                                        {exp.company} · {exp.location}
                                    </p>
                                </div>
                                <span className="timeline-period">{exp.period}</span>
                            </div>
                            <ul className="timeline-bullets">
                                {exp.bullets.map((b, j) => (
                                    <li key={j}>{b}</li>
                                ))}
                            </ul>
                            <div className="tag-list">
                                {exp.tech.map((t) => (
                                    <span key={t} className="tag">{t}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
