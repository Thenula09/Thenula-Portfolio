import React from "react";

export default function SkillBgCard() {
  return (
    <div className="skill-bg-card" aria-hidden>
      <div className="outer">
        <div className="dot" />
        <div className="card">
          <div className="ray" />
          {/* number + label removed as requested */}
          <div className="line topl" />
          <div className="line leftl" />
          <div className="line bottoml" />
          <div className="line rightl" />
        </div>
      </div>
    </div>
  );
}
