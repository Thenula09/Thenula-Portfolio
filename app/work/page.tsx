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
        Simple Font <br /> Replacer
      </>
    ),
    description: "Figma Plugin",
    link: "https://www.figma.com/community/plugin/1380643582596908985/simple-font-replacer",
    imageLink: "/img/projects/2.avif",
  },
  {
    title: (
      <>
        Andy PFP <br /> Generator
      </>
    ),
    description: "Next.js Site",
    link: "https://generator.andytoken.com/",
    imageLink: "/img/SOULBUDDY.png",
  },
  {
    title: (
      <>
        Rayspire <br /> Solar
      </>
    ),
    description: "Android app for solar power systems with hot deals and tech specs.",
    link: "https://github.com/Thenula09/Rayspire-Solar",
    imageLink: "/img/Rayspire_solar.png",
  },

  {
    title: (
      <>
        AmanFX <br /> Portfolio
      </>
    ),
    description: "Webflow Site",
    link: "https://amanfx.webflow.io/",
    imageLink: "/img/LuxeLese.png",
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
