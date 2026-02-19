import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type TimelineItem = {
  id: number;
  title: string;
  institution: string;
  date: string;
  desc: string;
  image: string; 
  subjects?: string[];
};

const items: TimelineItem[] = [
  {
    id: 5,
    title: "BSc (Hons) Computer Science with Software Engineering",
    institution: "Coventry University",
    date: "2026 - 2028 - Present",
    desc: "Undergraduate program focusing on software development and systems engineering.",
    image: "/assets/coventry.jpeg",
  },
  {
    id: 2,
    title: "Higher National Diploma in Software Engineering (HND)",
    institution: "NIBM",
    date: "2022 - 2024",
    desc: "Completed Diploma & Higher National Diploma (HND) in Software Engineering.",
    image: "/assets/nibm.png",
  },
  {
    id: 3,
    title: "Advanced Level (Completed)",
    institution: "St. Thomas' College, Matara",
    date: "2022",
    desc: "Foundation of academic and extracurricular excellence in Science stream.",
    subjects: ["Chemistry", "Physics", "Mathematics"],
    image: "/assets/stc.jpeg",
  },
  {
    id: 4,
    title: "Diploma in Information Technology (DITEC)",
    institution: "Pearson",
    date: "May 2021",
    desc: "DITEC (Pearson) — practical IT skills and professional certification.",
    image: "/assets/2021.png",
  },
];

const degreeKeywords = ["BSc", "Diploma", "HND", "Advanced Level", "Higher National Diploma", "DITEC"];
function highlightDegreeWords(text: string): React.ReactNode {
  const escaped = degreeKeywords.map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|");
  const parts = text.split(new RegExp(`(${escaped})`, "gi"));
  return parts.map((part, i) => (new RegExp(`^(${escaped})$`, "i").test(part) ? <strong key={i} className="font-extrabold">{part}</strong> : part));
}

export default function EducationCareer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subTitleRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      });

      tl.from(subTitleRef.current, { y: 20, opacity: 0, duration: 0.6, ease: "power2.out" })
        .from(titleRef.current, { y: 40, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.3")
        .from(".heading-line", { width: 0, duration: 0.8, ease: "power2.inOut" }, "-=0.4");

      gsap.fromTo(
        ".line-progress",
        { height: 0 },
        {
          height: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top 30%",
            end: "bottom 80%",
            scrub: true,
          },
        }
      );

      gsap.utils.toArray<HTMLElement>(".timeline-row").forEach((row) => {
        gsap.from(row, {
          opacity: 0,
          y: 50,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: row,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    /* Section eka w-full karala background eka damma */
    <section ref={containerRef} className="w-full py-32 bg-[#050505] text-white overflow-hidden">
      
      {/* max-width eka wadi kala saha screen full width ekata yana widiyata haduwa */}
      <div className="w-full max-w-[1920px] mx-auto px-6 md:px-16 lg:px-32">
        
        <div className="flex flex-col items-center mb-36 text-center">
          <span ref={subTitleRef} className="text-yellow-400 text-xs font-bold tracking-[0.5em] uppercase mb-4 block">
            My Journey
          </span>
          <h2 ref={titleRef} className="text-4xl md:text-7xl font-bold tracking-tight">
            Education <span className="font-light text-gray-400">&</span> Career
          </h2>
          <div className="heading-line h-[1px] w-24 bg-yellow-500/50 mt-8"></div>
        </div>

        <div ref={triggerRef} className="relative">
          <div className="absolute left-0 md:left-1/2 -translate-x-1/2 top-0 w-[1px] h-full bg-white/5" />
          <div className="line-progress absolute left-0 md:left-1/2 -translate-x-1/2 top-0 w-[1px] bg-yellow-400 shadow-[0_0_15px_#facc15]" />

          <div className="space-y-44">
            {items.map((item, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div key={item.id} className={`timeline-row flex flex-col md:flex-row items-center w-full relative ${isEven ? "md:flex-row-reverse" : ""}`}>
                  <div className="absolute left-0 md:left-1/2 -translate-x-1/2 top-0 z-10 hidden md:block">
                    <div className="w-2.5 h-2.5 bg-yellow-400 rounded-full border-[3px] border-black ring-1 ring-yellow-400/30" />
                  </div>

                  <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${isEven ? "md:pr-20 lg:pr-32 text-left md:text-right" : "md:pl-20 lg:pl-32 text-left"}`}>
                    <span className="text-gray-500 text-[10px] font-bold tracking-[0.3em] uppercase block mb-4">{item.date}</span>
                    <h3 className="text-3xl md:text-5xl font-bold text-white mb-2 leading-tight">{highlightDegreeWords(item.title)}</h3>
                    <p className="text-yellow-400/90 text-lg font-medium mb-6 italic">{item.institution}</p>
                    <p className="text-gray-400 text-base leading-relaxed max-w-xl ml-0 md:ml-auto md:mr-0 mb-8 font-light">{item.desc}</p>

                    <div className={`flex flex-col gap-6 ${isEven ? "md:items-end" : "items-start"}`}>
                      <div className="group relative w-20 h-20 md:w-24 md:h-24 bg-white/[0.03] p-4 rounded-2xl border border-white/10 overflow-hidden hover:border-yellow-400/40 transition-all duration-500 hover:scale-105 shadow-xl">
                        <img src={item.image} alt="logo" className="w-full h-full object-contain" />
                      </div>

                      {item.subjects && (
                        <div className={`flex flex-wrap gap-2 ${isEven ? "md:justify-end" : "justify-start"}`}>
                          {item.subjects.map((sub) => (
                            <span key={sub} className="text-[10px] bg-white/5 text-gray-300 px-3 py-1 rounded border border-white/5 uppercase tracking-wider">{sub}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="hidden md:block md:w-1/2" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}