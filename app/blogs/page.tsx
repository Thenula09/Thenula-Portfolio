"use client";

import React from "react";
import Link from "next/link";
import "../header.css";
import "../work.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/contactSection/footer";
import { links } from "@/data/data";

const samplePosts = [
  { id: 1, title: "Building my portfolio with Next.js", excerpt: "How I structured components, styling and deployment.", href: "#" },
  { id: 2, title: "Animating with GSAP", excerpt: "Small performance tips & patterns I use.", href: "#" },
  { id: 3, title: "Design to code workflow", excerpt: "From Figma to production-ready UI.", href: "#" },
];

export default function BlogsPage() {
  return (
    <>
      <Header color="Light" />

      <main className="w-full box-border max-w-maxWidth mx-auto px-6 sm:px-8 md:px-paddingX py-8 md:py-paddingY overflow-x-hidden">
        <h1 className="mb-4 text-3xl md:text-4xl font-semibold text-colorDark">Blogs</h1>

        <p className="mb-6 text-colorSecondaryLight">Latest posts and write-ups — coming soon. Below are example entries you can replace with real content.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 items-stretch">
          {samplePosts.map((p) => (
            <article key={p.id} className="glass p-4 md:p-5 rounded-lg border border-white/6 h-full flex flex-col justify-between min-w-0">
              <div>
                <h3 className="text-base md:text-lg font-semibold text-colorDark mb-2">{p.title}</h3>
                <p className="text-sm text-colorSecondaryLight mb-4 max-h-[3.6rem] overflow-hidden break-words">{p.excerpt}</p>
              </div>

              <div className="flex items-end justify-between">
                <Link href={p.href} className="text-sm underline text-colorPrimary">Read</Link>
                <span className="text-xs text-colorSecondaryLight">{/* placeholder date */}Feb 18, 2026</span>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8">
          <Link href={links.home} className="underline text-colorSecondaryLight">← Back to home</Link>
        </div>

        <Footer className="mt-12" />
      </main>
    </>
  );
}
