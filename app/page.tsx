"use client";
import React from "react";
import { Main } from "@/components/main";
import { Cursor } from "@/components/cursor";
import { HeaderNavigation } from "@/components/headerNavigation";
import { Transition } from "@/components/transition";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";

if (typeof window !== "undefined") {
  gsap.registerPlugin(CustomEase);
}

import "./index.css";

export default function HomePage({}) {
  return (
    <Transition>
      <Cursor />
      <HeaderNavigation />
      <Main />
    </Transition>
  );
}
