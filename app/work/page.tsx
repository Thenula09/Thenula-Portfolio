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
    textColor: "text-black"
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
        Rayspire Solar <br /> Mobile App
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
        BUS LANKA <br /> Mobile App
      </>
    ),
    description: "BUS Lanka is a React Native mobile platform for real-time highway bus tracking and seat booking, featuring a dual-app system for Drivers and Passengers. It integrates Google Maps API for live tracking and Firebase for Google Auth, real-time database syncing, and dynamic timetables. This project demonstrates expertise in mobile development, cloud integration, and real-time data synchronization",
    link: "https://github.com/Thenula09/PassengerApp",
    imageLink: "/img/Bus%20Lanka.png",
    customClass: "long-description"
  },
  {
    title: (
      <>
        Smart-Waste-Management-<br /> with-Arduino
      </>
    ),
    description: "Smart Garbage Vehicle is an Arduino Mega-powered autonomous robot for automated urban waste collection. It features IR-based line following, color sensors for bin detection, and a robotic arm for automated disposal. The system utilizes smart sensors to monitor waste levels and optimize collection. This project showcases expertise in robotics, sensor integration, and embedded systems.",
    link: "https://github.com/Thenula09/Smart-Waste-Management-with-Arduino-",
    imageLink: "/img/smartwaste%20management.png",
    customClass: "long-description"
  },
  {
    title: (
      <>
        Smart-Power-Monitoring-Plug <br /> IoT
      </>
    ),
    description: "Smart Power Monitoring Plug is an IoT solution using ESP32 and PZEM-004 to monitor and control electrical appliances in real-time. It features remote ON/OFF switching, high-load detection alerts, and data logging via a PHP/SQL Server backend to optimize energy consumption. This project showcases expertise in embedded systems, IoT security, and real-time data analytics.",
    link: "https://github.com/Thenula09/Smart-Power-Monitoring-Plug-IoT-",
    imageLink: "/img/powermonitoring%20plug.png",
    customClass: "long-description"
  },
  {
    title: (
      <>
        Chess-game <br /> Game
      </>
    ),
    description: "",
    link: "https://github.com/Thenula09/Chess-game-full",
    imageLink: "/img/chess%20game.png",
  },
  {
    title: (
      <>
        Movie HUB <br /> Website
      </>
    ),
    description: "A comprehensive movie booking system for a single theater, built with Spring Boot microservices backend and React frontend, featuring user authentication, seat booking, and billing.",
    link: "https://github.com/Thenula09/MOVIE_MATE",
    imageLink: "/img/moviehub.png",
    customClass: "long-description"
  },
  {
    title: (
      <>
        Battle for the goal <br /> Game
      </>
    ),
    description: "This project is a smart, automated Goal Tracking System designed to detect and display game scores in real-time using IoT technology. It eliminates manual scorekeeping by using sensors to track goals as they happen.",
    link: "https://github.com/Thenula09/Battle_for_the_goal",
    imageLink: "/img/battlefor%20goal.png",
    customClass: "long-description"
  },
  {
    title: (
      <>
        Computer shop <br></br>
         management system <br /> POS
      </>
    ),
    description: "pos system ",
    link: "#",
    imageLink: "/img/computer%20shop.png",
    customClass: "long-description"
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
