import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { skills as initialSkills, tools as initialTools } from "@/data/data";
import SkillBgCard from "./skillBgCard"; // decorative background card

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
    // whenever a card is clicked, remove it entirely (expansion state becomes irrelevant)
    setSkills((prev) => prev.filter((s) => s.name !== label));
    setExpandedSet((prev) => {
      const copy = { ...prev };
      delete copy[label];
      return copy;
    });
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
            items: [],
          },
          {
            title: "Backend Development",
            items: [],
          },
          {
            title: "Databases",
            items: [],
          },
          {
            title: "Version Control & DevOps",
            items: [],
          },
        ].map((section) => (
          <div key={section.title} className="relative">
            <h4 className="mb-4 text-lg font-semibold text-colorLight">{section.title}</h4>
            <SkillBgCard />
            <div className="skill-cards mb-6 relative z-10">
              {section.items.map((label) => (
                <div key={label} className="skill-chip p-2 bg-white/[0.05] rounded cursor-default">
                  {label}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Subsection: add skill / tool */}
     
    </section>
  );
}
