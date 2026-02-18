"use client";

import React from "react";
import Image from "next/image";
import ThenulaAbout from "@/components/aboutSection/Thenulabaout.jpg";
import { motion } from "framer-motion";
import { GraduationCap, Briefcase, BookOpen, Award, School } from "lucide-react";
import { Cursor } from "@/components/cursor";
import { HeaderNavigation } from "@/components/headerNavigation";
import "./about.css";

const timelineData = [
  {
    id: 1,
    title: "MSc in Software Engineering",
    institution: "University of Colombo",
    date: "2024 - Present",
    desc: "Advanced research in cloud computing and distributed systems.",
    icon: <GraduationCap size={22} />,
  },
  {
    id: 2,
    title: "Senior Full-Stack Developer",
    institution: "Tech Solutions Ltd",
    date: "2022 - 2024",
    desc: "Lead developer for enterprise-level Next.js and Node.js applications.",
    icon: <Briefcase size={22} />,
  },
  {
    id: 3,
    title: "BSc (Hons) in Computing",
    institution: "Informatics Institute of Technology",
    date: "2018 - 2022",
    desc: "Specialized in Software Engineering. Graduated with First Class honors.",
    icon: <School size={22} />,
  },
  {
    id: 4,
    title: "UI/UX Designer & Intern",
    institution: "Creative Digital Agency",
    date: "2020 - 2021",
    desc: "Focused on creating user-centric designs and interactive prototypes.",
    icon: <Award size={22} />,
  },
  {
    id: 5,
    title: "Secondary Education",
    institution: "National College",
    date: "2011 - 2018",
    desc: "Completed G.C.E Advanced Level in Physical Science stream.",
    icon: <BookOpen size={22} />,
  },
];

export default function AboutPage() {
  return (
    <div className="about-page-container">
      <Cursor />
      <HeaderNavigation />

      {/* --- Personal Profile Section --- */}
      <section className="profile-hero-section">
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
              <span className="subtitle">Discovery</span>
              <h1 className="main-heading">About Me</h1>
              <p className="description">
                Hello! I'm a passionate developer dedicated to creating high-quality web experiences. 
                With a strong foundation in both front-end and back-end technologies, I enjoy 
                turning complex problems into simple, beautiful, and intuitive designs. 
                My goal is to build scalable applications that provide real value to users 
                while keeping up with the latest industry standards.
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
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Experience and Education
        </motion.h2>

        <div className="timeline-container">
          <div className="center-line"></div>

          {timelineData.map((item, index) => (
            <motion.div 
              key={item.id}
              className={`timeline-card-wrapper ${index % 2 === 0 ? "left" : "right"}`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <div className="timeline-dot">{item.icon}</div>
              <div className="timeline-card">
                <span className="card-date">{item.date}</span>
                <h3 className="card-title">{item.title}</h3>
                <h4 className="card-subtitle">{item.institution}</h4>
                <p className="card-text">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}