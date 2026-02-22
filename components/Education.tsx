import { EDUCATION } from "@/data/profile";

export default function Education() {
    return (
        <section id="education" className="section">
            <h2 className="section-title">Education</h2>
            <div className="education-grid">
                {EDUCATION.map((edu, i) => (
                    <div key={i} className="edu-card">
                        <div className="edu-header">
                            <h3 className="edu-degree">{edu.degree}</h3>
                            <span className="edu-period">{edu.period}</span>
                        </div>
                        <p className="edu-school">
                            {edu.school} · {edu.location}
                        </p>
                        {(edu.gpa || edu.honors) && (
                            <div className="edu-meta">
                                {edu.gpa && <span className="edu-gpa">GPA: {edu.gpa}</span>}
                                {edu.honors && <span className="edu-honors">{edu.honors}</span>}
                            </div>
                        )}
                        <div className="edu-coursework">
                            <p className="edu-coursework-label">Relevant Coursework:</p>
                            <div className="tag-list">
                                {edu.coursework.map((c) => (
                                    <span key={c} className="tag">{c}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
