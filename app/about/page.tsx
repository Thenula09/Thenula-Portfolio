"use client";

import React from "react";
import { Cursor } from "@/components/cursor";
import { HeaderNavigation } from "@/components/headerNavigation";
import "../work.css";
import "../header.css";
import "./about.css";
import { AboutSection } from "@/components/aboutSection/aboutSection";

export default function AboutPage() {
  return (
    <>
      <Cursor />
      <HeaderNavigation />

        <AboutSection />
      
    </>
  );
}
