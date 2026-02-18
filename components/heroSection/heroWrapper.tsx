import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { HeroButton } from "./heroButton";
import { HeroMarquee } from "./heroMarquee";

export function HeroWrapper({}) {
  const titlesTl = useRef<gsap.core.Timeline | null>(null);
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;
    const titles = Array.from(root.querySelectorAll<HTMLElement>(".animation__wrapper .animate__this"));

    if (titles.length <= 1) {
      if (titles[0]) gsap.set(titles[0], { y: "0%", opacity: 1 });
      titlesTl.current = gsap.timeline({ repeat: -1 });
      return;
    }

    gsap.set(titles, { y: "140%", opacity: 0 });
    gsap.set(titles[0], { y: "0%", opacity: 1 });

    const tl = gsap.timeline({ repeat: -1 });
    const ease = "power3.inOut";

    // show each title for 2s, transition duration 0.6s
    const HOLD = 2; // visible time per title (seconds)
    const TRANS = 0.6; // transition duration

    titles.forEach((el, i) => {
      const next = titles[(i + 1) % titles.length];

      // current item moves up and fades out after a HOLD
      tl.to(el, { y: "-140%", opacity: 0, duration: TRANS, delay: HOLD, ease });

      // next item comes from below, overlap the transition
      tl.fromTo(next, { y: "140%", opacity: 0 }, { y: "0%", opacity: 1, duration: TRANS, ease }, `-=${TRANS}`);
    });

    titlesTl.current = tl;

    return () => { titlesTl.current?.kill(); };
  }, []);

  return (
    <main ref={containerRef as any} className="section1__wrapper relative max-w-maxWidth grow ">
      <div className="myImage"></div>
      <HeroButton />
      <h2 className="left mask pointer-events-none z-20 pt-20">
        <span className="hero-arrow" aria-hidden="true" />
        <div className="free anime sr-only">Hero titles</div>

        <div className="animation__wrapper anime">
          {[
            "Full‑stack developer",
            "Mobile application developer",
            "Web developer",
            "AI / ML engineer",
            "Project planner & designer",
          ].map((title, i) => (
            <span key={i} className={`animate__this animate__this${i + 1} left-0`}>
              {title}
              <span className="yellow__it">.</span>
              <br />
            </span>
          ))}
        </div>
      </h2>
      <HeroMarquee />
    </main>
  );
}
