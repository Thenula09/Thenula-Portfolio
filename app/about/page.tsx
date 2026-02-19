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
  return (
    <div className="about-page-container">
      <Cursor />
      <Header color="Light" />
      <HeaderNavigation />

      {/* --- Personal Profile Section --- */}
      <section className="profile-hero-section">
        <div className="section-solar-bg">
          
        </div>
        <div className="container">
          <div className="profile-grid">
            <motion.div 
              className="profile-image-container"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
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

      {/* --- Timeline Section --- */}
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
                /* Main Large Card */
                <div className="timeline-card">
                  <span className="card-date">{item.date}</span>
                  <h3 className="card-title">{item.title}</h3>
                  <h4 className="card-subtitle">{item.institution}</h4>
                  <p className="card-text">{item.desc}</p>
                </div>
              ) : (
                /* Small Certification Card */
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