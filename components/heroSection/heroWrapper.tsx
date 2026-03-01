import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { HeroButton } from "./heroButton";
import { HeroMarquee } from "./heroMarquee";

export function HeroWrapper({}) {
  const [currentTitleIndex, setCurrentTitleIndex] = React.useState(0);
  const [isHovering, setIsHovering] = React.useState(false);
  const titleRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLElement | null>(null);

  const titles = [
    "Mobile application developer",
    "Web developer", 
    "Full‑stack developer",
    "AI / ML engineer",
    "Project planner & designer",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitleIndex((prev) => (prev + 1) % titles.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [titles.length]);

  // Smooth fade animation when title changes
  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
    }
  }, [currentTitleIndex]);

  // Mouse move animation for title
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!titleRef.current) return;
    
    const rect = titleRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const rectWidth = rect.width;
    
    // Calculate position based on mouse movement
    const moveX = (x / rectWidth - 0.5) * 20; // Move up to 20px left/right
    
    gsap.to(titleRef.current, {
      x: moveX,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => {
    setIsHovering(false);
    // Reset position
    if (titleRef.current) {
      gsap.to(titleRef.current, {
        x: 0,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  return (
    <main ref={containerRef as any} className="section1__wrapper relative max-w-maxWidth grow ">
      <div className="myImage"></div>
      <HeroButton />
      <h2 className="left mask z-20 pt-20" onMouseMove={handleMouseMove} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <span className="hero-arrow" aria-hidden="true" />
        <div className="free anime sr-only">Hero titles</div>

        <div className="animation__wrapper anime" style={{ height: '100px', position: 'relative', zIndex: 50 }}>
          <span 
            ref={titleRef}
            className="animate__this animate__this1 left-0" 
            style={{ 
              display: 'block', 
              position: 'absolute', 
              top: '40px',
              left: '0',
              color: '#ffffff',
              fontSize: 'clamp(20px, 2.8vw, 40px)',
              fontWeight: 'bold',
              zIndex: 60,
              opacity: 1
            }}
          >
            {titles[currentTitleIndex]}
            <span className="yellow__it">.</span>
            <br />
          </span>
        </div>
      </h2>
      <HeroMarquee />
    </main>
  );
}
