"use client";
import React from "react";
import "../work.css";
import "../header.css";
import FullpageProviderWork from "@/components/fullpageProviderWork";
import { Cursor } from "@/components/cursor";
import { HeaderNavigation } from "@/components/headerNavigation";
import { WorkSection } from "@/components/workPage/workSection";

const projectsData = [
  {
    title: (
      <>
        YieldStone <br /> Page
      </>
    ),
    description: "Webflow Site",
    link: "https://www.yieldstone.ai/",
    imageLink: "/img/projects/1.avif",
  },
  {
    title: (
      <>
       Digital Asset <br /> THW Crypto Token
      </>
    ),
    description: "THW Token is an ERC-20 utility asset built with Solidity on the Ethereum (L1) blockchain, operating at the Application Layer (L3). It leverages secure Smart Contracts to enable transparent, decentralized transactions within a DeFi ecosystem. Designed for modern financial applications, it supports seamless wallet-to-wallet transfers and automated real-time price discovery",
    link: "https://github.com/Thenula09/Personal-Token-THW-",
    imageLink: "/img/THWtokn.png",
    customClass: "long-description"
  },
  {
    title: (
      <>
        SOULBUDDY
       <br /> Mobile app
      </>
    ),
    description: "SoulBuddy is an AI-powered mental health and mood tracking platform split into multiple components for better scalability, maintainability, and deployment flexibility. The system combines AI-powered chat assistance with detailed mood analytics to help users better understand and improve their mental well-bein",
    link: "https://github.com/Thenula09/SOULBUDDY",
    imageLink: "/img/ChatGPT Image Feb 26, 2026 at 09_18_50 AM.png",
    customClass: "long-description"
  },
  {
    title: (
      <>
        Rayspire Solar <br /> Mobile app
      </>
    ),
    description: "Rayspire Solar is a feature-rich Android application that allows users to explore solar power systems, view hot deals, and check detailed technical specifications. The app features a high-performance UI with smooth animations and real-time data syncing.",
    link: "https://github.com/Thenula09/Rayspire-Solar",
    imageLink: "/img/Rayspire_solar.png",
    customClass: "long-description"
  },

  {
    title: (
      <>
        LuxeLese Solutions <br /> Car Rental System 
      </>
    ),
    description: "LuxeLese Solutions is a full-stack MERN monorepo car rental platform with a React customer site and an admin panel. It integrates JWT auth, MongoDB Atlas, and RESTful APIs for secure user sessions, vehicle CRUD, and booking workflows. Optimized with Vite and Node.js, the system features high performance, smooth UI animations, and RBAC-based security. This project showcases expertise in scalable architecture and database modeling..",
    link: "https://github.com/Thenula09/LuxeLese_Solutions_web",
    imageLink: "/img/LuxeLese.png",
    customClass: "long-description"
  },
  {
    title: (
      <>
        Therapist <br /> Website
      </>
    ),
    description: "UI Design",
    link: "https://www.figma.com/proto/Tzz9bwrjHtSza87b1l3D0i/Inner-Strength-UI-Design?type=design&node-id=37-10&t=pq2KDLjYbMU4LFgA-1&scaling=min-zoom&page-id=0%3A1&mode=design",
    imageLink: "/img/Bus%20Lanka.png",
  },
  {
    title: (
      <>
        E-Commerce <br /> Platform
      </>
    ),
    description: "React Application",
    link: "#",
    imageLink: "/img/smartwaste%20management.png",
  },
  {
    title: (
      <>
        Task Manager <br /> App
      </>
    ),
    description: "Mobile Application",
    link: "#",
    imageLink: "/img/powermonitoring%20plug.png",
  },
  {
    title: (
      <>
        Social Media <br /> Dashboard
      </>
    ),
    description: "Vue.js Application",
    link: "#",
    imageLink: "/img/chess%20game.png",
  },
  {
    title: (
      <>
        Weather <br /> Forecast
      </>
    ),
    description: "Python Application",
    link: "#",
    imageLink: "/img/moviehub.png",
  },
  {
    title: (
      <>
        Blog <br /> Platform
      </>
    ),
    description: "Next.js Application",
    link: "#",
    imageLink: "/img/battlefor%20goal.png",
  },
  {
    title: (
      <>
        Portfolio <br /> Website
      </>
    ),
    description: "Static Site",
    link: "#",
    imageLink: "/img/computer%20shop.png",
  },
];
//test
export default function WorkPage() {
  return (
    <>
      <Cursor />
      <HeaderNavigation />
      <FullpageProviderWork>
        <div id="fullpage">
          <div className="background">
            PROJECTS
            <br />
            PROJECTS
          </div>

          {projectsData.map((item, index) => (
            <WorkSection
              key={index}
              item={item}
              index={index}
              length={projectsData.length}
              color={index % 2 !== 0 ? "Light" : "Dark"}
            />
          ))}
        </div>
      </FullpageProviderWork>
    </>
  );
}
