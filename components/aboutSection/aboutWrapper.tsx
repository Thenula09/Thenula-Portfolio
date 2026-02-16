import React, { useEffect, useState } from "react";
import Magentic from "../ui/magentic";
import { gsap } from "gsap";
import { AboutMarquee } from "./aboutMarquee";
import { links } from "@/data/data";
import TestimonialCard from "./testimonialCard";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import { isDesktop } from "@/lib/utils";
import Image from "next/image";
import ThenulaAbout from "./Thenulabaout.jpg";
import ExperienceEducation from "./experienceEducation";

export function AboutWrapper({}) {
  return (
    <div className="w-full">
      <main className="flex h-full w-full max-w-maxWidth grow flex-col md:flex-row items-center justify-center gap-8 mt-8 px-paddingX text-[5.8vw] md:text-[clamp(20px,_1vw_+_14px,_32px)]">
        <div className="w-full md:w-1/2 flex justify-center md:justify-start">
          <div className="w-[220px] h-[220px] md:w-[320px] md:h-[320px] rounded-3xl overflow-hidden shadow-lg">
            <Image
              src={ThenulaAbout}
              alt="Thenula Saja"
              width={640}
              height={640}
              className="h-full w-full object-cover"
              priority
            />
          </div>
        </div>

        <div className="w-full md:w-1/2 flex flex-col items-start text-colorDark">
          <h3 className="mb-3 text-[clamp(20px,_2.2vw,_34px)] font-semibold">About</h3>
          <p className="max-w-prose text-base md:text-lg">
            Hi — I'm Thenula. Replace this short bio with your real content in
            `aboutWrapper.tsx` or in your data source.
          </p>
        </div>
      </main>

      {/* Experience timeline (bottom) */}
      <div className="max-w-maxWidth mx-auto px-paddingX mt-8">
        <ExperienceEducation kind="Experience" />
      </div>
    </div>
  );
}
