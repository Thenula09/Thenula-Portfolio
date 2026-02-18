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

    console.log("Found titles:", titles.length);
    console.log("Titles:", titles);

    if (titles.length === 0) return;

    // Hide all titles initially
    gsap.set(titles, { opacity: 0 });
    
    // Show first title
    gsap.set(titles[0], { opacity: 1 });

    console.log("First title set to visible");

    let currentIndex = 0;

    const showNextTitle = () => {
      console.log("Switching from title:", currentIndex);
      // Hide current title
      gsap.to(titles[currentIndex], { 
        opacity: 0, 
        duration: 1.0,
        onComplete: () => {
          // Show next title
          currentIndex = (currentIndex + 1) % titles.length;
          console.log("Showing next title:", currentIndex, titles[currentIndex]?.textContent);
          gsap.fromTo(titles[currentIndex], 
            { opacity: 0 },
            { opacity: 1, duration: 1.0 }
          );
        }
      });
    };

    // Start animation cycle immediately
    console.log("Starting animation cycle immediately");
    // set to 4000ms so each title is fully visible for 2s (interval = visible time + fadeOut + fadeIn)
    const interval = setInterval(showNextTitle, 4000);
      
    return () => {
      clearInterval(interval);
      if (titlesTl.current) titlesTl.current.kill();
    };
  }, []);

  return (
    <main ref={containerRef as any} className="section1__wrapper relative max-w-maxWidth grow ">
      <div className="myImage"></div>
      <HeroButton />
      <h2 className="left mask pointer-events-none z-20 pt-20">
        <span className="hero-arrow" aria-hidden="true" />
        <div className="free anime sr-only">Hero titles</div>

        <div className="animation__wrapper anime" style={{ height: '100px', position: 'relative', zIndex: 50 }}>
          {[
            "  ",
            "Full‑stack developer",
            "Mobile application developer",
            "Web developer",
            "AI / ML engineer",
            "Project planner & designer",
          ].map((title, i) => (
            <span key={i} className={`animate__this animate__this${i + 1} left-0`} style={{ 
              display: 'block', 
              position: 'absolute', 
              top: '20px',
              left: '0',
              color: '#ffffff',
              fontSize: 'clamp(25px, 3.5vw, 50px)',
              fontWeight: 'bold',
              zIndex: 60,
              opacity: i === 0 ? 1 : 0
            }}>
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
