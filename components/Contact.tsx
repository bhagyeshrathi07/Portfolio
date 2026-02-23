import { PROFILE } from "@/data/profile";

export default function Contact() {
    const email = `${PROFILE.contact.emailUser}@${PROFILE.contact.emailDomain}`;

    return (
        <section id="contact" className="section">
            <h2 className="section-title">Get in Touch</h2>
            <div className="contact-content">
                <p className="contact-text">
                    I&apos;m always open to discussing new opportunities, collaborations, or interesting projects.
                </p>

                <div className="contact-links-minimal">
                    <a href={`mailto:${email}`} className="contact-link-minimal">
                        <span className="contact-label">Email</span>
                        <span className="contact-value">{email}</span>
                    </a>

                    <a href={PROFILE.github} target="_blank" rel="noopener" className="contact-link-minimal">
                        <span className="contact-label">GitHub</span>
                        <span className="contact-value">github.com/bhagyeshrathi07</span>
                    </a>

                    <a href={PROFILE.linkedin} target="_blank" rel="noopener" className="contact-link-minimal">
                        <span className="contact-label">LinkedIn</span>
                        <span className="contact-value">linkedin.com/in/bhagyeshrathi</span>
                    </a>
                </div>
            </div>
            <footer className="footer">
                <p>© {new Date().getFullYear()} {PROFILE.name}. All rights reserved.</p>
            </footer>
        </section>
    );
}
