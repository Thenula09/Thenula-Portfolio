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

export function AboutWrapper({}) {
  return (
    <main className="flex h-full w-full max-w-maxWidth grow flex-col justify-center items-center text-[5.8vw] md:text-[clamp(20px,_1vw_+_14px,_32px)]">
      {/* Empty section */}
    </main>
  );
}
