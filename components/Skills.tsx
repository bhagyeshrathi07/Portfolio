import { SKILLS, SKILL_ICONS } from "@/data/profile";

export default function Skills() {
    // Extract a flat list of all skills across all categories to fuel the conveyor
    const allSkills = SKILLS.flatMap(cat => cat.skills);

    // Split into two rows for the conveyor belts
    const half = Math.ceil(allSkills.length / 2);
    const row1 = allSkills.slice(0, half);
    const row2 = allSkills.slice(half);

    // Render a single skill item dynamically using the icon map from profile.ts
    const renderSkill = (skill: string, index: number) => {
        const IconComponent = SKILL_ICONS[skill];
        return (
            <div key={`${skill}-${index}`} className="skill-belt-item">
                {IconComponent && <span className="skill-belt-icon"><IconComponent /></span>}
                <span>{skill}</span>
            </div>
        );
    };

    return (
        <section id="skills" className="section" style={{ overflow: "hidden" }}>
            <h2 className="section-title" style={{ paddingLeft: 'var(--layout-padding)' }}>Skills & Technologies</h2>

            <div className="skills-conveyor">
                {/* Top Row - Scrolls Left */}
                <div className="skills-track left">
                    {/* Triplicate the array to ensure the screen is always filled for infinite loop */}
                    {[...row1, ...row1, ...row1, ...row1].map(renderSkill)}
                </div>

                {/* Bottom Row - Scrolls Right */}
                <div className="skills-track right">
                    {[...row2, ...row2, ...row2, ...row2].map(renderSkill)}
                </div>
            </div>
        </section>
    );
}
