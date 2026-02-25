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
import { Footer } from "@/components/contactSection/footer";
import "./about.css";

const timelineData = [
  {
    id: 98,
    type: "cert",
    title: "DevOps Pre-Requisite Course",
    institution: "KodeKloud (Certifications)",
    link: "#",
    date: "2024",
    desc: "DevOps Pre-Requisite Course — KodeKloud (completed).",
    image: "/assets/KodeKloud.png",
  },
  {
    id: 99,
    type: "cert",
    title: "AI‑Powered DevOps (Crash Course)",
    institution: "KodeKloud (Certifications)",
    link: "#",
    date: "2025",
    desc: "Crash Course — AI‑Powered DevOps (completed).",
    image: "/assets/KodeKloud.png",
  },
  {
    id: 5,
    type: "main",
    title: "BSc (Hons) Computer Science with Software",
    institution: "Coventry University",
    date: "2026-2028 - Present (3rd year)",
    desc: "Undergraduate program focusing on software development and systems.",
    image: "/assets/coventry.jpeg",
  },
  {
    id: 100,
    type: "cert",
    title: "Stock Market Basics",
    institution: "Udemy (Certifications)",
    link: "#",
    date: "May 2025 (Completed)",
    desc: "Financial Analysis · Stock Market (completed May 2025)",
    image: "/assets/udemy.png",
  },
  {
    id: 104,
    type: "cert",
    title: "Getting Started with C# (Microsoft Learn)",
    institution: "Microsoft Learn Student Ambassadors",
    link: "#",
    date: "2024",
    desc: "Program: Microsoft Learn Student Ambassadors — Host: Dineth Janitha.",
    image: "/assets/microsoft.jpeg",
  },
  {
    id: 105,
    type: "cert",
    title: "Pine Script Course (Completed)",
    institution: "Trading Hub ",
    link: "#",
    date: "2025",
    desc: "Successfully completed the Pine Script Course — Trading Hub (2025).",
    image: "/assets/pine.png",
  },
  {
    id: 101,
    type: "cert",
    title: "Postman API Fundamentals — Student Expert (Completed)",
    institution: "Postman (Certifications)",
    link: "#",
    date: "2025 (completed)",
    desc: "Postman API Fundamentals — Student Expert certificate 2025.",
    image: "/assets/postman.jpeg",
  },
  {
    id: 102,
    type: "cert",
    title: "Web Design for Beginners (Completed)",
    institution: "University of Moratuwa (CODL) (Certifications)",
    link: "#",
    date: "2025",
    desc: "Introductory web design course —Sep 2025",
    image: "/assets/moratuwa.jpeg",
  },
  {
    id: 2,
    type: "main",
    title: "Higher National Diploma in Software Engineering(HND (Completed)",
    institution: "National Institute of Business Management (NIBM)",
    date: "2022 - 2024",
    desc: "Also completed Diploma & Higher National Diploma (HND) in Software Engineering at the National Institute of Business Management (NIBM) — 2023–2025 (completed).",
    icon: <Briefcase size={22} />,
    image: "/assets/nibm.png",
  },
  {
    id: 103,
    type: "cert",
    title: "Database Foundations",
    institution: "Oracle Academy (Certifications)",
    link: "#",
    desc: "Database Foundations — completed Sep 2024.",
    image: "/assets/oracle.png",
  },
  {
    id: 3,
    type: "main",
    title: "Advanced Level (Completed)",
    institution: "St. Thomas' College, Matara",
    date: "2022",
    desc: "Completed A/L (2022) — Foundation of academic and extracurricular excellence.",
    subjects: ["Chemistry", "Physics", "Mathematics"],
    image: "/assets/stc.jpeg",
  },
  {
    id: 4,
    type: "main",
    title: "Diploma in Information Technology (DITEC) (Completed)",
    institution: "Pearson",
    date: "May 2021",
    desc: "DITEC (Pearson) — practical IT skills and professional certification.",
    image: "/assets/2021.png",
    featured: true,
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
    const px = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const py = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    const rotateY = px * 12;
    const rotateX = -py * 12;
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
          <div className="profile-grid items-center"> {/* added items-center for better alignment */}
            <div className="orbit-loader-container"></div>
            
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
                transition: "transform 0.1s ease-out"
              }}
            >
              <div className="photo-solar-bg1" aria-hidden="true">
                <SolarLoader className="top" />
              </div>

              <div className="image-border-decoration"></div>
              <motion.div
                className="image-inner"
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                }}
              >
                <Image
                  src={ThenulaAbout}
                  alt="Thenula Hansaja"
                  className="profile-img"
                  width={380}
                  height={480}
                  priority
                />
              </motion.div>
            </motion.div>

            <motion.div 
              className="profile-text-content"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{ paddingTop: '200px' }} // Title එක මදක් පහළට ගැනීමට
            >
              <h1 className="main-heading text-colorLight" style={{ marginBottom: '-140px' }}>
                About Me
              </h1>
              
              <div className="description-wrapper">
                <p className="description text-colorLight" style={{ marginBottom: '-200px', lineHeight: '1.7' }}>
                  I am a dedicated <span style={{ color: 'hsl(54,100%,50%)', fontWeight: 'bold' }}>Software Engineering undergraduate</span> at <span style={{ color: 'hsl(54,100%,50%)', fontWeight: 'bold' }}>Coventry University</span>, driven by a passion for solving complex real-world problems through innovative technology. With a solid foundation from a Diploma in IT (<span style={{ color: 'hsl(54,100%,50%)', fontWeight: 'bold' }}>Pearson</span>) and an HND in Software Engineering (<span style={{ color: 'hsl(54,100%,50%)', fontWeight: 'bold' }}>NIBM</span>), I specialize in <span style={{ color: 'hsl(54,100%,50%)', fontWeight: 'bold' }}>Python</span> and <span style={{ color: 'hsl(54,100%,50%)', fontWeight: 'bold' }}>Java</span> while actively expanding my expertise into <span style={{ color: 'hsl(54,100%,50%)', fontWeight: 'bold' }}>AI</span>, <span style={{ color: 'hsl(54,100%,50%)', fontWeight: 'bold' }}>Machine Learning</span>, and <span style={{ color: 'hsl(54,100%,50%)', fontWeight: 'bold' }}>Blockchain</span>.
                </p>
                <p className="description text-colorLight" style={{ lineHeight: '1.7' }}>
                  My primary focus lies in <span style={{ color: 'hsl(54,100%,50%)', fontWeight: 'bold' }}>Mobile Application Development</span> and creating tech-driven solutions that simplify lives. I pride myself on my analytical mindset and my ability to push boundaries in emerging tech fields. You can explore my technical journey, ongoing projects, and problem-solving capabilities via my <span style={{ color: 'hsl(54,100%,50%)', fontWeight: 'bold' }}>GitHub</span> and <span style={{ color: 'hsl(54,100%,50%)', fontWeight: 'bold' }}>LinkedIn</span>.
                </p>
              </div>

              <div className="stats-mini-grid" style={{ marginTop: '30px' }}>
                <div><strong>8+</strong> Projects</div>
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
              <div className="timeline-dot" aria-hidden="true"></div>

              {item.type === "main" ? (
                <div className={`timeline-card ${item.featured ? "featured" : ""} ${item.id === 3 ? 'card-id-3' : ''} ${item.id === 4 ? 'card-id-4' : ''} ${item.id === 5 ? 'card-id-5' : ''}`}>
                  {item.image && (
                    <div className="timeline-card-logo">
                      <Image src={item.image} alt={String(item.institution)} width={72} height={72} />
                    </div>
                  )}

                  <span className="card-date">{item.date}</span>
                  {item.id === 5 && <span className="present-badge">Present</span>}

                  <h3 className="card-title">{item.title}</h3>
                  <h4 className="card-subtitle">{item.institution}</h4>
                  <p className="card-text">{item.desc}</p>

                  {Array.isArray(item.subjects) && (
                    <ul className="timeline-card-subjects">
                      {item.subjects.map((s) => (
                        <li key={s}>{s}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <a href={item.link || '#'} target="_blank" rel="noopener noreferrer" className="mini-cert-card">
                  {item.image && (
                    <div className="cert-icon">
                      <Image src={item.image} alt={`${item.institution} logo`} width={40} height={40} />
                    </div>
                  )}

                  <div className="cert-body">
                    <div className="cert-header">
                      <span className="cert-issuer">{item.institution}</span>
                      <ExternalLink size={14} />
                    </div>

                    <h3 className="cert-title">{item.title}</h3>
                    <p className="cert-desc">{item.desc}</p>
                  </div>
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <Footer className="mt-12" />
    </div>
  );
}