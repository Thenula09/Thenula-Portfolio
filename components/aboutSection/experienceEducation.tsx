import React, { useEffect, useRef } from "react";
import gsap from "gsap";

type TimelineItem = {
  id: number;
  kind: "Experience" | "Education";
  title: string;
  org: string;
  date: string;
  desc: string;
};

const items: TimelineItem[] = [
  {
    id: 1,
    kind: "Experience",
    title: "Senior Product Designer",
    org: "Acme Co.",
    date: "2022 — Present",
    desc: "Lead product design for web & mobile — created a scalable design system, ran user research and A/B tests, and shipped features that increased user activation by ~28%.",
  },
  {
    id: 2,
    kind: "Education",
    title: "MSc — Human Computer Interaction",
    org: "University of Colombo",
    date: "2019 — 2021",
    desc: "Thesis on usable interfaces and motion-driven microinteractions; coursework included UX research, prototyping and evaluation.",
  },
  {
    id: 3,
    kind: "Experience",
    title: "Product Designer",
    org: "Beta Labs",
    date: "2017 — 2022",
    desc: "Owned end-to-end product UI: prototyping, visual design and handoff — improved conversion on core flows by 18% and reduced support tickets through better UX.",
  },
  {
    id: 4,
    kind: "Education",
    title: "BSc — Computer Science",
    org: "University of Peradeniya",
    date: "2013 — 2017",
    desc: "Software engineering major with projects in web performance and accessibility; capstone focused on progressive web apps.",
  },
  {
    id: 5,
    kind: "Experience",
    title: "Frontend Developer Intern",
    org: "Startup Z",
    date: "2016",
    desc: "Implemented interactive React components, optimized bundle size and accessibility, and added unit/integration tests to increase stability.",
  },
];

type Props = {
  kind?: "All" | "Experience" | "Education";
};

export default function ExperienceEducation({ kind = "All" }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  const filtered = kind === "All" ? items : items.filter((i) => i.kind === kind);
  const title = kind === "All" ? "Experience & Education" : kind;

  useEffect(() => {
    const cards = ref.current?.querySelectorAll<HTMLElement>(".timeline-card") ?? [];
    gsap.set(cards, { opacity: 0, y: 30, scale: 0.99 });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const idx = Array.from(cards).indexOf(el);
            gsap.to(el, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.7,
              ease: "power3.out",
              delay: idx * 0.06,
            });
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.12 },
    );

    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, [kind]);

  if (filtered.length === 0) return null;

  return (
    <section className="w-full mt-6 md:mt-12">
      <h3 className="mb-6 text-2xl md:text-3xl font-semibold text-colorDark">{title}</h3>

      <div ref={ref} className="relative max-w-maxWidth mx-auto">
        {/* center line */}
        <div className="hidden md:block absolute left-1/2 top-0 h-full w-px bg-colorSecondary/20 -translate-x-1/2" />

        <div className="space-y-8">
          {filtered.map((it, idx) => (
            <div key={it.id} className="md:grid md:grid-cols-12 items-center">
              <div
                className={
                  idx % 2 === 0
                    ? "md:col-start-1 md:col-end-7 md:pr-6 flex justify-end"
                    : "md:col-start-7 md:col-end-13 md:pl-6 flex justify-start"
                }
              >
                <article className="timeline-card w-full md:w-[520px] relative z-10 transform-gpu rounded-3xl bg-white/60 border border-gray-100 p-6 shadow-[0_10px_30px_rgba(0,0,0,0.08)] hover:-translate-y-2 transition-transform duration-300">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-colorSecondaryDark">{it.kind}</p>
                      <h4 className="mt-2 text-lg font-semibold text-colorDark">{it.title}</h4>
                      <p className="text-sm text-colorSecondaryLight">{it.org} • {it.date}</p>
                    </div>

                    <div className="flex-shrink-0 h-12 w-12 rounded-xl bg-colorSecondary/10 flex items-center justify-center text-colorDark font-semibold shadow-inner">
                      {idx + 1}
                    </div>
                  </div>

                  <p className="mt-4 text-sm text-colorSecondaryDark leading-relaxed">{it.desc}</p>
                </article>
              </div>

              {/* center dot */}
              <div className="md:col-start-6 md:col-end-8 flex justify-center hidden md:flex">
                <span className={`timeline-dot inline-block h-4 w-4 rounded-full bg-colorDark border-4 border-white ${idx % 2 === 0 ? 'translate-x-2' : '-translate-x-2'}`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
