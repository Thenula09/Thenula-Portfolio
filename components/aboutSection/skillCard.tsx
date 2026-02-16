import React from "react";

type Props = {
  label: string;
  r?: number; // rotation degrees
  children?: React.ReactNode; // svg/icon
};

export default function SkillCard({ label, r = -15, children }: Props) {
  const style = { ['--r' as any]: `${r}` } as React.CSSProperties;
  return (
    <div className="skill-card glass relative flex flex-col items-center justify-center rounded-xl px-6 py-6 text-center text-colorLight" style={style}>
      <div className="icon mb-3 text-3xl text-colorLight">{children}</div>
      <div className="label text-sm font-semibold">{label}</div>
    </div>
  );
}
