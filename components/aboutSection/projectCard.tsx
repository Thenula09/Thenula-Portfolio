import React from "react";

type ProjectCardProps = {
  imgSrc: string;
  index?: number;
  title?: string;
  category?: string;
  footer?: string;
  width?: string | number; // e.g. '190px' or 190
  height?: string | number; // e.g. '254px' or 254
};

export default function ProjectCard({
  imgSrc,
  index = 0,
  title = "Project Title",
  category = "Project",
  footer = "—",
  width = "190px",
  height = "254px",
}: ProjectCardProps) {
  const style: React.CSSProperties = {
    width: typeof width === "number" ? `${width}px` : width,
    height: typeof height === "number" ? `${height}px` : height,
  };

  return (
    <div className="project-card" style={style}>
      <div className="content">
        {/* VISIBLE SIDE: image */}
        <div className="back">
          <div className="img">
            <img src={imgSrc} alt={title} className="absolute inset-0 w-full h-full object-cover" />
            <div className="circle" />
            <div className="circle" id="right" />
            <div className="circle" id="bottom" />
          </div>

          {/* number badge on image (visible side) */}
          <div className="project-number absolute left-4 top-4 z-20 rounded-full bg-colorDark text-colorLight w-8 h-8 md:w-10 md:h-10 flex items-center justify-center font-semibold text-sm md:text-base">
            {index}
          </div>
        </div>

        {/* FLIPPED SIDE: about / description */}
        <div className="front">
          <div className="front-content">
            <small className="badge">{category}</small>
            <div className="description">
              <div className="title">
                <p className="title-text">
                  <strong>{title}</strong>
                </p>
              </div>
              <p className="card-footer">{footer}</p>
            </div>

            <div className="mt-4">
              <span className="back-cta px-3 py-2 rounded-md bg-colorPrimary text-colorDark text-sm font-semibold">Open</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
