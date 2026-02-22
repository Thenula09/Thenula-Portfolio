import React, { useEffect } from "react";
import { motion, useScroll, useMotionValue, useSpring } from "framer-motion";
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
import ProjectCard from "./projectCard";
import TrueFocus from "@/components/ui/TrueFocus";
import SkillsSection from "./skillsSection";
import DecorativeCard from "@/components/ui/DecorativeCard";
import DiscoverButton from "@/components/ui/DiscoverButton";

export function AboutWrapper({}) {
  const { scrollY } = useScroll();
  const sectionRef = React.useRef<HTMLDivElement | null>(null);
  const [range, setRange] = React.useState<[number, number]>([0, 0]);

  // map scroll position to a modest vertical shift for the photo
  const photoY = useMotionValue(0);
  // softer spring for slower, more gradual motion
  const smoothPhotoY = useSpring(photoY, { damping: 60, stiffness: 150 });

  // calculate the section's start/end scroll positions
  React.useLayoutEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const top = el.offsetTop;
    const height = el.offsetHeight;
    setRange([top, top + height]);
  }, []);

  // update photoY based on scrollY within the section range
  React.useEffect(() => {
    const unsub = scrollY.onChange((y) => {
      const [start, end] = range;
      if (end === start) {
        // range not calculated yet
        return;
      }
      let val = 0;
      // keep image locked inside its frame while the section is in view
      if (y <= end) {
        val = 0;
      } else {
        // after the bottom of the section, move the image slowly upward
        // over a long scroll distance (e.g. 1000px)
        const distance = y - end;
        const maxDist = 1000; // adjust for how long the animation should take
        const progress = Math.min(distance / maxDist, 1);
        val = -60 * progress; // only gradually reach -60
      }
      photoY.set(val);
    });
    return unsub;
  }, [scrollY, range, photoY]);

  useEffect(() => {
    // animate project cards + number badges when they enter viewport
    const cards = document.querySelectorAll<HTMLElement>(".project-card");
    const numbers = document.querySelectorAll<HTMLElement>(".project-number");

    if (!cards || cards.length === 0) return;

    gsap.set(cards, { opacity: 0, y: 30, scale: 0.99 });
    gsap.set(numbers, { opacity: 0, scale: 0.6 });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          const idx = Array.from(cards).indexOf(el);

          const tl = gsap.timeline();
          tl.to(el, { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power3.out" });

          const num = numbers[idx];
          if (num) {
            tl.fromTo(
              num,
              { scale: 0.6, opacity: 0 },
              { scale: 1.05, opacity: 1, duration: 0.45, ease: "back.out(1.6)" },
              "-=.45",
            );
          }

          io.unobserve(el);
        });
      },
      { threshold: 0.12 },
    );

    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, []);


  return (
    <div className="w-full">
      <main
        ref={sectionRef}
        className="flex h-full w-full max-w-maxWidth grow flex-col md:flex-row items-center justify-center gap-8 mt-8 px-paddingX text-[5.8vw] md:text-[clamp(20px,_1vw_+_14px,_32px)]"
      >
        {/* About text on the LEFT (swapped) */}
        <div className="w-full md:w-1/2 flex flex-col items-start text-colorLight">
          <h3 className="sr-only">About Me</h3>

          <TrueFocus
            sentence="About Me"
            manualMode={false}
            blurAmount={4}
            borderColor="#5227FF"
            animationDuration={0.45}
            pauseBetweenAnimations={1}
          />

          <p className="max-w-prose text-base md:text-xl">
            Hi — I'm Thenula. Replace this short bio with your real content in
            `aboutWrapper.tsx` or in your data source.
          </p>
        </div>

        {/* Image on the RIGHT (swapped) */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
          <div className="photo-frame p-4 rounded-3xl"> {/* decorative box */}
            <motion.div
              className="w-[360px] h-[360px] md:w-[480px] md:h-[580px] rounded-3xl overflow-hidden shadow-lg about-photo"
              style={{ y: smoothPhotoY }}
              whileHover={{ scale: 1.07, rotateY: 5 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <Image
                src={ThenulaAbout}
                alt="Thenula Saja"
                width={640}
                height={640}
                className="h-full w-full object-cover"
                priority
              />
            </motion.div>
          </div>
        </div>
      </main>

      {/* Experience/education tabs removed — default to "All" */}
      <div className="max-w-maxWidth mx-auto px-paddingX mt-8">
        <ExperienceEducation />
      </div>

      {/* Skills & Tools (moved above Projects) */}
      <div className="max-w-maxWidth mx-auto px-paddingX mt-10">
        <SkillsSection />
      </div>

      {/* My Works & Projects (3x3 grid) */}
      <div className="max-w-maxWidth mx-auto px-paddingX mt-[120px] md:mt-[160px] relative overflow-visible projects-wrapper">
        <DecorativeCard className="absolute inset-0 -z-10 pointer-events-none" />

        <h3 className="mb-6 text-2xl md:text-3xl font-semibold text-colorLight text-center projects-title anime">My Latest Projects and Works</h3>

        {/* Featured (latest) project */}
        <article className="group relative mb-8 overflow-hidden rounded-3xl bg-card/60 border border-border z-10">
          <a
            href="https://www.yieldstone.ai/"
            target="_blank"
            rel="noreferrer"
            className="block md:flex items-center gap-6"
          >
            <div className="w-full md:w-3/5 h-[150px] md:h-[300px] overflow-hidden rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none">
              <img src="/img/projects/1.avif" alt="YieldStone" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>

            <div className="p-4 md:p-6 md:w-2/5 flex flex-col justify-center h-[150px] md:h-[300px]">
              <p className="mb-2 text-xs uppercase tracking-wide text-colorSecondaryDark">Featured • Latest</p>
              <h4 className="text-lg md:text-xl font-semibold text-colorLight">YieldStone — Page</h4>
              <p className="mt-2 text-sm md:text-sm text-colorSecondaryLight">Webflow site — landing & marketing pages built for YieldStone.</p>

              <div className="mt-4">
                <span className="inline-block rounded-md bg-colorPrimary px-3 py-2 text-sm font-semibold text-colorDark">View Project</span>
              </div>
            </div>
          </a>
        </article>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 relative z-10 justify-items-center">
          {/* map projects (responsive cards) — 1 / 2 / 3 / 4 columns depending on breakpoint */}
          {[
            { title: "YieldStone Page", category: "Webflow", footer: "Landing & marketing pages", image: "/img/projects/1.avif", link: "https://www.yieldstone.ai/" },
            { title: "Simple Font Replacer", category: "Figma plugin", footer: "Figma plugin published", image: "/img/projects/2.avif", link: "https://www.figma.com/community/plugin/1380643582596908985/simple-font-replacer" },
            { title: "Andy PFP Generator", category: "Next.js", footer: "Generative avatar site", image: "/img/projects/3.avif", link: "https://generator.andytoken.com/" },
            { title: "PonkeSol Page", category: "Webflow", footer: "Marketing site", image: "/img/projects/4.avif", link: "https://ponkecoin-ninetyeight.webflow.io/" },
            { title: "AmanFX Portfolio", category: "Webflow", footer: "Portfolio site", image: "/img/projects/5.avif", link: "https://amanfx.webflow.io/" },
            { title: "Therapist Website", category: "UI Design", footer: "Prototype in Figma", image: "/img/projects/6.avif", link: "#" },
            { title: "Project 7", category: "Other", footer: "Description here", image: "/img/projects/7.avif", link: "#" },
            { title: "Project 8", category: "Other", footer: "Description here", image: "/img/projects/1.avif", link: "#" },
          ].map((p, i) => (
            <a key={i} href={p.link} target="_blank" rel="noreferrer">
              {/* rely on CSS variables for sizing so cards adapt at each breakpoint */}
              <ProjectCard index={i + 1} imgSrc={p.image} title={p.title} category={p.category} footer={p.footer} />
            </a>
          ))}
        </div>

        <div className="mt-6 z-10 flex justify-center">
          <div>
            <DiscoverButton href="/work">View all projects</DiscoverButton>
          </div>
        </div>
      </div>
    </div>
  );
}
