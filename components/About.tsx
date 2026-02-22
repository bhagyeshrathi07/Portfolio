import { PROFILE } from "@/data/profile";

export default function About() {
    return (
        <section id="about" className="section">
            <h2 className="section-title">About Me</h2>
            <div className="about-text" style={{ maxWidth: '100%' }}>
                {PROFILE.bio.split('\n\n').map((paragraph, index) => (
                    <p key={index} style={{ marginBottom: '1.5rem' }}>{paragraph}</p>
                ))}
            </div>
        </section>
    );
}
