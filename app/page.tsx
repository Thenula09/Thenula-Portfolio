"use client";
import { Main } from "@/components/main";
import { Cursor } from "@/components/cursor";
import { HeaderNavigation } from "@/components/headerNavigation";
import { Transition } from "@/components/transition";

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
