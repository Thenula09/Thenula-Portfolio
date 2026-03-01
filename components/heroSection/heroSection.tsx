"use client";
import React, { useRef } from "react";
import Image from "next/image";

import { HeroWrapper } from "@/components/heroSection/heroWrapper";
import { Header } from "@/components/header";
import { Bulge } from "@/components/bulge";
import HeroCenterBg from "@/components/heroSection/ChatGPT Image Mar 1, 2026 at 04_26_03 PM.png";

export function HeroSection({}) {
  const sectionRef = useRef(null);
  return (
    <section
      ref={sectionRef}
      className="section section__1 darkGradient first relative z-0 px-paddingX text-colorLight"
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <div className="relative w-[min(1100px,100vw)] h-[min(1100px,100vw)]">
          <Image
            src={HeroCenterBg}
            alt="Hero background"
            fill
            priority
            className="object-contain opacity-25"
          />
        </div>
      </div>

      <Bulge type="Light" />
      <Header color="Light" />
      <HeroWrapper />
    </section>
  );
}
