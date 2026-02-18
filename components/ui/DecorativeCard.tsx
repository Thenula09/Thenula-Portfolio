import React from "react";

type Props = {
  className?: string;
};

export default function DecorativeCard({ className = "" }: Props) {
  return (
    <div className={`decorative-card ${className}`} aria-hidden>
      <div className="outer">
        {/* main accent dot + 5 decorative moving dots */}
        <div className="dot dot--main" />
        <div className="dot dot--1" />
        <div className="dot dot--2" />
        <div className="dot dot--3" />
        <div className="dot dot--4" />
        <div className="dot dot--5" />

        <div className="card">
          <div className="ray" />
          {/* intentionally no numeric text / "750k Views" */}
          <div className="line topl" />
          <div className="line leftl" />
          <div className="line bottoml" />
          <div className="line rightl" />
        </div>
      </div>
    </div>
  );
}
