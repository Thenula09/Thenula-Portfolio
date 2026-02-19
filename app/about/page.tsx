"use client";

import React from "react";
import Image from "next/image";
import ThenulaAbout from "@/components/aboutSection/Thenulabaout.jpg";
import { motion } from "framer-motion";
import { GraduationCap, Briefcase, BookOpen, Award, School, ExternalLink } from "lucide-react";
import { Cursor } from "@/components/cursor";
import { Header } from "@/components/header";
import { HeaderNavigation } from "@/components/headerNavigation";
import SolarLoader from "@/components/solarLoader";
import LeftFazerLoader from "@/components/leftFazerLoader";
import "./about.css";

const timelineData = [
  {
    id: 1,
    type: "main",
    title: "MSc in Software Engineering",
    institution: "University of Colombo",
    date: "2024 - Present",
    desc: "Advanced research in cloud computing and distributed systems.",
    icon: <GraduationCap size={22} />,
  },
  {
    id: 101,
    type: "cert",
    title: "AWS Certified Developer",
    institution: "Amazon Web Services",
    link: "https://aws.amazon.com",
    desc: "Cloud architecture and deployment.",
  },
  {
    id: 102,
    type: "cert",
    title: "Meta Front-End Professional",
    institution: "Coursera",
    link: "https://coursera.org",
    desc: "Advanced React & UI patterns.",
  },
  {
    id: 2,
    type: "main",
    title: "Senior Full-Stack Developer",
    institution: "Tech Solutions Ltd",
    date: "2022 - 2024",
    desc: "Lead developer for enterprise-level Next.js and Node.js applications.",
    icon: <Briefcase size={22} />,
  },
  {
    id: 103,
    type: "cert",
    title: "Google UX Design",
    institution: "Google",
    link: "#",
    desc: "User-centric design principles.",
  },
  {
    id: 3,
    type: "main",
    title: "BSc (Hons) in Computing",
    institution: "Informatics Institute of Technology",
    date: "2018 - 2022",
    desc: "Specialized in Software Engineering. Graduated with First Class honors.",
    icon: <School size={22} />,
  },
];

export default function AboutPage() {
  const imgRef = React.useRef<HTMLDivElement | null>(null);
  const lastScrollY = React.useRef<number>(0);
  const scrollTimeout = React.useRef<number | null>(null);
  const [tilt, setTilt] = React.useState({ rotateX: 0, rotateY: 0, translateY: 0 });

  React.useEffect(() => {
    const onScroll = () => {
      const el = imgRef.current;
      if (!el) return;
      const current = window.scrollY || window.pageYOffset;
      const delta = current - lastScrollY.current;
      lastScrollY.current = current;

      const offset = Math.max(Math.min(-delta * 0.45, 40), -40);
      setTilt((t) => ({ ...t, translateY: offset }));

      if (scrollTimeout.current) window.clearTimeout(scrollTimeout.current);
      scrollTimeout.current = window.setTimeout(() => {
        setTilt((t) => ({ ...t, translateY: 0 }));
        scrollTimeout.current = null;
      }, 260);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (scrollTimeout.current) window.clearTimeout(scrollTimeout.current);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = imgRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    
    // Mouse position relative to center of image (-1 to 1)
    const px = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const py = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);

    // rotateX: Mouse udata yaddi (py < 0) rotateX positive wenna ona (pahala balanna)
    // rotateY: Mouse dakunata yaddi (px > 0) rotateY positive wenna ona (dakuna balanna)
    const rotateY = px * 12; 
    const rotateX = -py * 12; // Inverted for natural tilt

    setTilt({ rotateX, rotateY, translateY: tilt.translateY });
  };

  const handleMouseLeave = () => setTilt({ rotateX: 0, rotateY: 0, translateY: 0 });

  return (
    <div className="about-page-container">
      <Cursor />
      <Header color="Light" />
      <HeaderNavigation />

      <section className="profile-hero-section">
        <LeftFazerLoader />
        <div className="container">
          <div className="profile-grid">
            <motion.div 
              ref={imgRef}
              className="profile-image-container"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              style={{
                transform: `perspective(1200px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) translateY(${tilt.translateY}px)`,
                transition: "transform 0.1s ease-out" // ensures smooth tracking
              }}
            >
              {/* Solar background specifically behind the profile photo */}
              <div className="photo-solar-bg1" aria-hidden="true">
                <SolarLoader className="top" />
              </div>

              <div className="image-border-decoration"></div>
              <Image 
                src={ThenulaAbout}
                alt="Thenula Hansaja" 
                className="profile-img"
                width={380}
                height={480}
                priority
              />
            </motion.div>

            <motion.div 
              className="profile-text-content"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h1 className="main-heading">About Me</h1>
              <p className="description">
                Hello! I'm a passionate developer dedicated to creating high-quality web experiences. 
                With a strong foundation in both front-end and back-end technologies.
              </p>
              <div className="stats-mini-grid">
                <div><strong>5+</strong> Projects</div>
                <div><strong>3+</strong> Years Exp.</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="experience-education-section">
        <div className="section-solar-bg">
          <SolarLoader />
        </div>
        <motion.h2 className="section-title">Experience, Education & Certifications</motion.h2>

        <div className="timeline-container">
          <div className="center-line"></div>

          {timelineData.map((item, index) => (
            <motion.div 
              key={item.id}
              className={`timeline-card-wrapper ${index % 2 === 0 ? "left" : "right"} ${item.type === 'cert' ? 'cert-wrapper' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="timeline-dot">
                {item.type === 'main' ? item.icon : <Award size={18} />}
              </div>

              {item.type === "main" ? (
                <div className="timeline-card">
                  <span className="card-date">{item.date}</span>
                  <h3 className="card-title">{item.title}</h3>
                  <h4 className="card-subtitle">{item.institution}</h4>
                  <p className="card-text">{item.desc}</p>
                </div>
              ) : (
                <a href={item.link} target="_blank" rel="noopener noreferrer" className="mini-cert-card">
                   <div className="cert-header">
                      <span className="cert-issuer">{item.institution}</span>
                      <ExternalLink size={14} />
                   </div>
                   <h3 className="cert-title">{item.title}</h3>
                   <p className="cert-desc">{item.desc}</p>
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}