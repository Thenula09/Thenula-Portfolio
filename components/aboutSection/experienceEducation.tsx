import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Link from "next/link";

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

// Display only first 3 items, hide the 4th item (Diploma in Information Technology)
const displayItems = items.slice(0, 3);
const hasMoreItems = items.length > displayItems.length;

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

  const originalTitle = "Education & Career";
  const [displayTitle, setDisplayTitle] = React.useState(originalTitle);
  const [hasMoved, setHasMoved] = React.useState(false);

  // scrambling function: replace letters then restore; speed can be varied
  const scrambleTitle = (speed = 40, rounds = 8) => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let iterations = 0;
    const interval = setInterval(() => {
      setDisplayTitle(
        originalTitle
          .split("")
          .map((c, i) => {
            if (c === " ") return " ";
            return Math.random() < 0.5
              ? letters[Math.floor(Math.random() * letters.length)]
              : originalTitle[i];
          })
          .join("")
      );
      iterations++;
      if (iterations > rounds) {
        clearInterval(interval);
        setDisplayTitle(originalTitle);
      }
    }, speed);
  };

  // trigger a slow scramble on first mouse movement anywhere
  React.useEffect(() => {
    if (hasMoved) return;
    const handler = () => {
      scrambleTitle(80, 12); // slower, more rounds
      setHasMoved(true);
      window.removeEventListener("mousemove", handler);
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [hasMoved]);

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
          <motion.h2
            ref={titleRef}
            className="text-4xl md:text-7xl font-bold tracking-tight cursor-pointer"
            onMouseEnter={() => scrambleTitle()}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            {displayTitle.split("&").map((part, idx) => (
              <React.Fragment key={idx}>
                {part}
                {idx === 0 && <span className="font-light text-gray-400">&</span>}
              </React.Fragment>
            ))}
          </motion.h2>
          <div className="heading-line h-[1px] w-24 bg-yellow-500/50 mt-8"></div>
        </div>

        <div ref={triggerRef} className="relative">
          <div className="absolute left-0 md:left-1/2 -translate-x-1/2 top-0 w-[1px] h-full bg-white/5" />
          <div className="line-progress absolute left-0 md:left-1/2 -translate-x-1/2 top-0 w-[1px] bg-yellow-400 shadow-[0_0_15px_#facc15]" />

          <div className="space-y-44">
            {displayItems.map((item, idx) => {
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

          {/* See More Button */}
          {hasMoreItems && (
            <div className="flex justify-center mt-16">
              <Link href="/about#timeline" className="discover-btn inline-block">
                <button
                  className="discover-btn__btn flex items-center gap-3 rounded-full px-6 py-3 text-white font-bold"
                  aria-label="See more education and career details"
                >
                  <span className="text text-[1.05rem] leading-none">See More</span>
                  <span className="svg inline-flex items-center" aria-hidden>
                    <svg xmlns="http://www.w3.org/2000/svg" width={50} height={20} viewBox="0 0 38 15" fill="none">
                      <path fill="white" d="M10 7.519l-.939-.344h0l.939.344zm14.386-1.205l-.981-.192.981.192zm1.276 5.509l.537.843.148-.094.107-.139-.792-.611zm4.819-4.304l-.385-.923h0l.385.923zm7.227.707a1 1 0 0 0 0-1.414L31.343.448a1 1 0 0 0-1.414 0 1 1 0 0 0 0 1.414l5.657 5.657-5.657 5.657a1 1 0 0 0 1.414 1.414l6.364-6.364zM1 7.519l.554.833.029-.019.094-.061.361-.23 1.277-.77c1.054-.609 2.397-1.32 3.629-1.787.617-.234 1.17-.392 1.623-.455.477-.066.707-.008.788.034.025.013.031.021.039.034a.56.56 0 0 1 .058.235c.029.327-.047.906-.39 1.842l1.878.689c.383-1.044.571-1.949.505-2.705-.072-.815-.45-1.493-1.16-1.865-.627-.329-1.358-.332-1.993-.244-.659.092-1.367.305-2.056.566-1.381.523-2.833 1.297-3.921 1.925l-1.341.808-.385.245-.104.068-.028.018c-.011.007-.011.007.543.84zm8.061-.344c-.198.54-.328 1.038-.36 1.484-.032.441.024.94.325 1.364.319.45.786.64 1.21.697.403.054.824-.001 1.21-.09.775-.179 1.694-.566 2.633-1.014l3.023-1.554c2.115-1.122 4.107-2.168 5.476-2.524.329-.086.573-.117.742-.115s.195.038.161.014c-.15-.105.085-.139-.076.685l1.963.384c.192-.98.152-2.083-.74-2.707-.405-.283-.868-.37-1.28-.376s-.849.069-1.274.179c-1.65.43-3.888 1.621-5.909 2.693l-2.948 1.517c-.92.439-1.673.743-2.221.87-.276.064-.429.065-.492.057-.043-.006.066.003.155.127.07.099.024.131.038-.063.014-.187.078-.49.243-.94l-1.878-.689zm14.343-1.053c-.361 1.844-.474 3.185-.413 4.161.059.95.294 1.72.811 2.215.567.544 1.242.546 1.664.459a2.34 2.34 0 0 0 .502-.167l.15-.076.049-.028.018-.011c.013-.008.013-.008-.524-.852l-.536-.844.019-.012c-.038.018-.064.027-.084.032-.037.008.053-.013.125.056.021.02-.151-.135-.198-.895-.046-.734.034-1.887.38-3.652l-1.963-.384zm2.257 5.701l.791.611.024-.031.08-.101.311-.377 1.093-1.213c.922-.954 2.005-1.894 2.904-2.27l-.771-1.846c-1.31.547-2.637 1.758-3.572 2.725l-1.184 1.314-.341.414-.093.117-.025.032c-.01.013-.01.013.781.624zm5.204-3.381c.989-.413 1.791-.42 2.697-.307.871.108 2.083.385 3.437.385v-2c-1.197 0-2.041-.226-3.19-.369-1.114-.139-2.297-.146-3.715.447l.771 1.846z" />
                    </svg>
                  </span>
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}