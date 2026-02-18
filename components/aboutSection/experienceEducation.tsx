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
    title: "Senior Full‑stack Developer",
    org: "Acme Labs",
    date: "2022 — Present",
    desc: "Lead development of customer-facing web applications using Next.js and Node — ownership of performance, architecture and team mentoring.",
  },
  {
    id: 2,
    kind: "Experience",
    title: "Mobile Application Developer",
    org: "AppWorks",
    date: "2019 — 2022",
    desc: "Built cross-platform mobile apps and polished UX flows; shipped features used by tens of thousands of users.",
  },
  {
    id: 3,
    kind: "Experience",
    title: "Frontend Developer",
    org: "Startup Z",
    date: "2017 — 2019",
    desc: "Implemented responsive, accessible React interfaces and reduced initial load time by improving bundle splits.",
  },
  {
    id: 4,
    kind: "Experience",
    title: "Frontend Developer Intern",
    org: "Beta Labs",
    date: "2016",
    desc: "Contributed interactive components, tests and performance improvements during an early-stage internship.",
  },

  {
    id: 5,
    kind: "Education",
    title: "MSc — Human Computer Interaction",
    org: "University of Colombo",
    date: "2019 — 2021",
    desc: "Thesis on usable interfaces and motion-driven microinteractions; coursework included UX research and prototyping.",
  },
  {
    id: 6,
    kind: "Education",
    title: "BSc — Computer Science",
    org: "University of Peradeniya",
    date: "2013 — 2017",
    desc: "Software engineering major; capstone focused on progressive web apps and accessibility.",
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
    const mover = ref.current?.querySelector<HTMLElement>(".moving-dot") ?? null;

    gsap.set(cards, { opacity: 0, y: 30, scale: 0.99 });
    if (mover) gsap.set(mover, { opacity: 0, top: 0 });

    const setMoverToIndex = (index: number) => {
      if (!ref.current || !mover) return;
      const card = cards[index];
      if (!card) return;
      const containerRect = ref.current.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();
      const y = cardRect.top - containerRect.top + cardRect.height / 2 - mover.offsetHeight / 2;
      gsap.to(mover, { top: `${y}px`, opacity: 1, duration: 0.45, ease: "power3.out" });
    };

    // position on first render
    if (cards.length > 0) setMoverToIndex(0);

    let currentIndex = 0;
    let ticking = false;

    // reveal animation (run once per card) — keep observing so we still get onEnter events
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          const idx = Array.from(cards).indexOf(el);

          if (entry.isIntersecting) {
            gsap.to(el, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.7,
              ease: "power3.out",
              delay: idx * 0.06,
            });
          }

          // whenever intersection state changes, pick the card closest to the container center
          const pickClosest = () => {
            if (!ref.current) return;
            const containerRect = ref.current.getBoundingClientRect();
            const containerCenter = containerRect.top + containerRect.height / 2;
            let closestIdx = 0;
            let closestDist = Infinity;
            cards.forEach((card, i) => {
              const r = card.getBoundingClientRect();
              const cardCenter = r.top + r.height / 2;
              const dist = Math.abs(cardCenter - containerCenter);
              if (dist < closestDist) {
                closestDist = dist;
                closestIdx = i;
              }
            });
            if (closestIdx !== currentIndex) {
              currentIndex = closestIdx;
              setMoverToIndex(closestIdx);
            }
          };

          pickClosest();
        });
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    cards.forEach((c) => io.observe(c));

    // also update on scroll for smooth follow when user scrolls past cards
    const onScroll = () => {
      if (ticking || !ref.current) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        const containerRect = ref.current!.getBoundingClientRect();
        const containerCenter = containerRect.top + containerRect.height / 2;
        let closestIdx = 0;
        let closestDist = Infinity;
        cards.forEach((card, i) => {
          const r = card.getBoundingClientRect();
          const cardCenter = r.top + r.height / 2;
          const dist = Math.abs(cardCenter - containerCenter);
          if (dist < closestDist) {
            closestDist = dist;
            closestIdx = i;
          }
        });
        if (closestIdx !== currentIndex) {
          currentIndex = closestIdx;
          setMoverToIndex(closestIdx);
        }
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [kind]);

  if (filtered.length === 0) return null;

  return (
    <section className="w-full mt-[80px] md:mt-[80px] py-24 md:py-48">
      <h3 className="mb-6 text-3xl md:text-5xl font-semibold text-colorDark text-center md:text-center">{title}</h3>

      <div ref={ref} className="relative max-w-[7080px] mx-auto px-6 md:px-12 overflow-visible">
        {/* center line (now black) */}
        <div className="hidden md:block absolute left-1/2 top-0 h-full w-[2px] bg-colorDark -translate-x-1/2 z-0" />

        {/* moving dot (single) — follows the currently visible card */}
        <div className="moving-dot absolute left-1/2 -translate-x-1/2 top-0 z-30 pointer-events-none">
          <div className="h-6 w-6 md:h-12 md:w-12 rounded-full bg-colorPrimary border-4 border-white shadow-lg opacity-0" />
        </div>

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
                <article className="timeline-card w-full md:max-w-[720px] relative z-10 transform-gpu rounded-3xl p-6 md:p-8 hover:-translate-y-2 transition-transform duration-300">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm md:text-base uppercase tracking-wide text-colorSecondaryDark">{it.kind}</p>
                      <h4 className="mt-2 text-base md:text-2xl font-semibold text-colorDark">{it.title}</h4>
                      <p className="text-sm md:text-base text-colorSecondaryLight">{it.org} • {it.date}</p>
                    </div>

                    <div className="flex-shrink-0 h-16 w-16 md:h-20 md:w-20 rounded-2xl bg-colorSecondary/10 flex items-center justify-center text-colorDark text-base md:text-2xl font-bold shadow-inner">
                      {idx + 1}
                    </div>
                  </div>

                  <p className="mt-4 text-sm md:text-base text-colorSecondaryDark leading-relaxed">{it.desc}</p>
                </article>
              </div>

              {/* spacer for center column (dots removed) */}
              <div className={`md:col-start-6 md:col-end-8 flex ${it.id === 1 ? "items-end" : "items-center"} justify-center hidden md:flex`} aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
