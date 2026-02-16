import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { skills as initialSkills, tools as initialTools } from "@/data/data";
import SkillCard from "./skillCard";

type Skill = { name: string; level?: number };

export default function SkillsSection() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [skills, setSkills] = useState<Skill[]>(initialSkills);
  const [tools, setTools] = useState<string[]>(initialTools);

  // form state
  const [newSkillName, setNewSkillName] = useState("");
  const [newSkillLevel, setNewSkillLevel] = useState<number | "">("");
  const [newToolName, setNewToolName] = useState("");

  useEffect(() => {
    const chips = ref.current?.querySelectorAll<HTMLElement>(".skill-chip, .tool-chip") ?? [];
    gsap.set(chips, { opacity: 0, y: 12, scale: 0.99 });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const idx = Array.from(chips).indexOf(el);
            gsap.to(el, { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power3.out", delay: idx * 0.04 });
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.08 },
    );

    chips.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, [skills, tools]);

  const addSkill = () => {
    const name = newSkillName.trim();
    const level = typeof newSkillLevel === "number" && newSkillLevel > 0 ? newSkillLevel : undefined;
    if (!name) return;
    const next = [...skills, { name, level }];
    setSkills(next);
    setNewSkillName("");
    setNewSkillLevel("");

    // animate the newly added chip
    requestAnimationFrame(() => {
      const chips = ref.current?.querySelectorAll<HTMLElement>(".skill-chip") ?? [];
      const el = chips[chips.length - 1];
      if (el) gsap.fromTo(el, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" });
    });
  };

  const addTool = () => {
    const name = newToolName.trim();
    if (!name) return;
    const next = [...tools, name];
    setTools(next);
    setNewToolName("");

    requestAnimationFrame(() => {
      const chips = ref.current?.querySelectorAll<HTMLElement>(".tool-chip") ?? [];
      const el = chips[chips.length - 1];
      if (el) gsap.fromTo(el, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" });
    });
  };

  return (
    <section className="w-full mt-12 md:mt-16">
      <h3 className="mb-6 text-2xl md:text-3xl font-semibold text-colorDark">Skills & Tools</h3>

      {/* skill cards row (visual) */}
      <div className="skill-cards mb-6">
        {[
          { label: "React", r: -18, icon: (
              <svg viewBox="0 0 256 256" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><g fill="#fff"><circle cx="128" cy="128" r="16"/><path d="M128 16c-17.7 0-32 2.6-32 8.2v39.6c0 5.7 14.3 8.2 32 8.2s32-2.6 32-8.2V24.2C160 18.6 145.7 16 128 16z" opacity=".25"/></g></svg>
            ) },
          { label: "Next.js", r: -10, icon: (
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="2" width="20" height="20" rx="3" fill="#fff" opacity=".08"/><text x="6" y="17" fill="#fff" fontSize="10" fontWeight="700">NX</text></svg>
            ) },
          { label: "TypeScript", r: -4, icon: (
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="4" width="16" height="16" rx="2" fill="#fff" opacity=".12"/><text x="7" y="17" fill="#fff" fontSize="10" fontWeight="700">TS</text></svg>
            ) },
          { label: "Tailwind", r: 0, icon: (
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 15c3 0 5-2 8-2s5 2 8 2" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" opacity=".9"/></svg>
            ) },
          { label: "GSAP", r: 6, icon: (
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="8" stroke="#fff" strokeWidth="1.6"/></svg>
            ) },
          { label: "Three.js", r: 12, icon: (
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="6" width="12" height="12" stroke="#fff" strokeWidth="1.6"/></svg>
            ) },
          { label: "Figma", r: 18, icon: (
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="6" cy="6" r="3" fill="#fff"/><rect x="9" y="3" width="6" height="6" rx="3" fill="#fff"/><rect x="9" y="10.5" width="6" height="6" rx="3" fill="#fff"/></svg>
            ) },
          { label: "Node.js", r: 20, icon: (
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 12c3-2 6-2 9 0s6 2 9 0" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
            ) },
          { label: "Git", r: 10, icon: (
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 12l6-6 9 9-3 3-9-9" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
            ) },
          { label: "Docker", r: -12, icon: (
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="7" width="18" height="10" rx="2" stroke="#fff" strokeWidth="1.6"/></svg>
            ) },
        ].map((c, i) => (
          <SkillCard key={c.label} label={c.label} r={c.r}>
            {c.icon}
          </SkillCard>
        ))}
      </div>

      <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Skills (with level bars) */}
        <div>
          <p className="mb-4 text-sm text-colorSecondaryLight">Core skills, libraries and technologies I use regularly.</p>

          <div className="space-y-4">
            {skills.map((s) => (
              <div key={`${s.name}-${s.level || 0}`} className="skill-chip flex flex-col gap-2">
                <div className="flex items-center justify-between text-sm text-colorDark font-medium">
                  <span>{s.name}</span>
                  {typeof s.level === "number" && <span className="text-xs text-colorSecondaryLight">{s.level}%</span>}
                </div>

                {typeof s.level === "number" && (
                  <div className="w-full h-2 rounded-full bg-gray-200/10 border border-border overflow-hidden">
                    <div className="h-full bg-colorPrimary" style={{ width: `${s.level}%`, transition: "width 800ms cubic-bezier(.2,.9,.2,1)" }} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Tools */}
        <div>
          <p className="mb-4 text-sm text-colorSecondaryLight">Tools & platforms I work with.</p>

          <div className="flex flex-wrap gap-3">
            {tools.map((t) => (
              <div key={t} className="tool-chip inline-flex items-center gap-2 rounded-full bg-white/6 border border-border px-3 py-2 text-sm text-colorSecondaryLight">
                <span className="text-sm font-medium text-colorLight">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Subsection: add skill / tool */}
      <div className="mt-6 border-t border-border pt-6">
        <h4 className="mb-3 text-lg font-semibold text-colorDark">Add a skill or tool</h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-colorSecondaryLight">Skill name</label>
            <input value={newSkillName} onChange={(e) => setNewSkillName(e.target.value)} className="mt-2 w-full rounded-md bg-card/30 border border-border px-3 py-2 text-sm text-colorLight" placeholder="e.g. Prisma" />

            <label className="text-sm text-colorSecondaryLight mt-3 block">Level (%)</label>
            <input value={String(newSkillLevel)} onChange={(e) => setNewSkillLevel(e.target.value === "" ? "" : Math.max(0, Math.min(100, Number(e.target.value))))} type="number" min={0} max={100} className="mt-2 w-full rounded-md bg-card/30 border border-border px-3 py-2 text-sm text-colorLight" placeholder="e.g. 75" />

            <div className="mt-3">
              <button onClick={addSkill} className="inline-flex items-center gap-2 rounded-md bg-colorPrimary px-4 py-2 text-sm font-semibold text-colorDark">Add skill</button>
            </div>
          </div>

          <div>
            <label className="text-sm text-colorSecondaryLight">Tool / Platform name</label>
            <input value={newToolName} onChange={(e) => setNewToolName(e.target.value)} className="mt-2 w-full rounded-md bg-card/30 border border-border px-3 py-2 text-sm text-colorLight" placeholder="e.g. Docker" />

            <div className="mt-6">
              <button onClick={addTool} className="inline-flex items-center gap-2 rounded-md bg-colorPrimary px-4 py-2 text-sm font-semibold text-colorDark">Add tool</button>
            </div>
          </div>
        </div>

        <p className="mt-4 text-xs text-colorSecondaryLight">Note: additions are client-side only and will not persist to the codebase automatically.</p>
      </div>
    </section>
  );
}
