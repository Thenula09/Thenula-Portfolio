import React from "react";

export default function SolarLoader({ className = "" }: { className?: string }) {
  return (
    <div className={`solar ${className}`} aria-hidden="true">
      <i className="mercury" />
      <i className="venus" />
      <i className="earth" />
      <i className="mars" />
      <i className="belt" />
      <i className="jupiter" />
      <i className="saturn" />
      <i className="uranus" />
      <i className="neptune" />
    </div>
  );
}
