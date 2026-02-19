import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { skills as initialSkills, tools as initialTools } from "@/data/data";
import SkillCard from "./skillCard";

type Skill = { name: string; level?: number };

export default function SkillsSection() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [skills, setSkills] = useState<Skill[]>(initialSkills);
  const [tools, setTools] = useState<string[]>(initialTools);
  const [expandedSet, setExpandedSet] = useState<Record<string, boolean>>({});

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

  // toggle body class when any skill card is expanded (used to push Projects down)
  useEffect(() => {
    const anyExpanded = Object.values(expandedSet).some(Boolean);
    document.body.classList.toggle('skill-expanded', anyExpanded);
    return () => {
      // cleanup when component unmounts
      document.body.classList.remove('skill-expanded');
    };
  }, [expandedSet]);

  const handleCardToggle = (label: string, isExpanded: boolean) => {
    setExpandedSet((prev) => ({ ...prev, [label]: isExpanded }));
  };

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
    <section className="w-full mt-12 md:mt-16 relative overflow-hidden">

      {/* Sections (4) — each section contains 10 cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
        {[
          {
            title: "Frontend Development",
            items: [
              "React",
              "Next.js",
              "TypeScript",
              "JavaScript",
              "HTML5",
            ],
          },
          {
            title: "Backend Development",
            items: [
              "Node.js",
              "Express",
              "REST APIs",
              "TypeScript (server)",
              "Authentication",
              "Prisma / ORM",
            ],
          },
          {
            title: "Databases",
            items: [
              "PostgreSQL",
              "MySQL",
              "MongoDB",
              "Redis",
              "SQLite",
              "Firebase",
              "Supabase",
              "Prisma",
              "CockroachDB",
              "DynamoDB",
            ],
          },
          {
            title: "Version Control & DevOps",
            items: [
              "Git",
              "GitHub",
              "CI / CD",
              "Docker",
              "Docker Compose",
              "Kubernetes",
              "Vercel",
              "Netlify",
              "GitHub Actions",
              "Monitoring",
            ],
          },
        ].map((section) => (
          <div key={section.title}>
            <h4 className="mb-4 text-lg font-semibold text-colorLight">{section.title}</h4>
            <div className="skill-cards mb-6">
              {section.items.map((label) => (
                <SkillCard key={label} label={label} r={-8} onToggle={(isExpanded) => handleCardToggle(label, isExpanded)} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Subsection: add skill / tool */}
     
    </section>
  );
}
