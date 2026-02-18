import React from "react";
import gsap from "gsap";

type Props = {
  label: string;
  r?: number; // rotation degrees
  children?: React.ReactNode; // svg/icon
  onToggle?: (expanded: boolean) => void;
};

export default function SkillCard({ label, r = -15, children, onToggle }: Props) {
  const style = { ['--r' as any]: `${r}` } as React.CSSProperties;
  const wrapperRef = React.useRef<HTMLDivElement | null>(null);
  const detailsRef = React.useRef<HTMLDivElement | null>(null);
  const [expanded, setExpanded] = React.useState(false);

  React.useEffect(() => {
    // ensure details start collapsed
    if (detailsRef.current) detailsRef.current.style.height = '0px';
  }, []);

  const toggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    const details = detailsRef.current;
    if (!details || !wrapperRef.current) {
      setExpanded((s) => !s);
      return;
    }

    if (!expanded) {
      // expand: animate height to its scrollHeight, then set to auto
      const targetH = details.scrollHeight;
      gsap.killTweensOf(details);
      gsap.fromTo(
        details,
        { height: 0, opacity: 0 },
        {
          height: targetH,
          opacity: 1,
          duration: 0.32,
          ease: 'power3.out',
          onComplete() {
            details.style.height = 'auto';
          },
        },
      );
    } else {
      // collapse: animate height from current (auto) to 0
      const currentH = details.clientHeight;
      gsap.killTweensOf(details);
      gsap.fromTo(
        details,
        { height: currentH, opacity: 1 },
        {
          height: 0,
          opacity: 0,
          duration: 0.25,
          ease: 'power3.in',
        },
      );
    }

    // subtle card pop while toggling (improves perceived smoothness)
    gsap.to(wrapperRef.current, { boxShadow: expanded ? '0 8px 10px rgba(0,0,0,0.12)' : '0 18px 30px rgba(0,0,0,0.18)', duration: 0.28, ease: 'power2.out' });

    const newState = !expanded;
    setExpanded(newState);
    if (typeof onToggle === 'function') onToggle(newState);
  };

  return (
    <div
      ref={wrapperRef}
      onClick={toggle}
      role="button"
      aria-expanded={expanded}
      className={`skill-card glass relative flex flex-col items-center justify-center rounded-xl px-3 py-2 text-center text-colorLight ${expanded ? 'expanded' : ''}`}
      style={style}
    >
      <div className="icon mb-1 text-2xl text-colorLight">{children}</div>
      <div className="label text-sm font-semibold">{label}</div>

      {/* expandable details (hidden by default) */}
      <div ref={detailsRef} className="skill-details w-full overflow-hidden text-left mt-3 px-2">
        <div className="skill-details-inner text-sm text-colorSecondaryLight">
          <div className="mb-2">Proficiency: <strong>Intermediate — Advanced</strong></div>
          <div className="h-2 bg-[rgba(255,255,255,0.06)] rounded-full overflow-hidden">
            <div className="bg-colorPrimary h-full rounded-full" style={{ width: '72%' }}></div>
          </div>
          <div className="mt-2 text-xs text-colorSecondaryLight">Click again to collapse.</div>
        </div>
      </div>
    </div>
  );
}
