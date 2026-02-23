import React, { useEffect } from "react";
import { motion, useScroll, useMotionValue, useSpring } from "framer-motion";
import { gsap } from "gsap";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

// Components & UI
import TrueFocus from "@/components/ui/TrueFocus";
import SkillsSection from "./skillsSection";
import DecorativeCard from "@/components/ui/DecorativeCard";
import DiscoverButton from "@/components/ui/DiscoverButton";
import ExperienceEducation from "./experienceEducation";
import ProjectCard from "./projectCard";

// Assets & Data
import ThenulaAbout from "./Thenulabaout.jpg";
import "swiper/css";

export function AboutWrapper({}) {
  const { scrollY } = useScroll();
  const sectionRef = React.useRef<HTMLDivElement | null>(null);
  const [range, setRange] = React.useState<[number, number]>([0, 0]);

  // Photo parallax settings
  const photoY = useMotionValue(0);
  const smoothPhotoY = useSpring(photoY, { damping: 60, stiffness: 150 });

  // Calculate section range for parallax
  React.useLayoutEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const top = el.offsetTop;
    const height = el.offsetHeight;
    setRange([top, top + height]);
  }, []);

  // Update photo parallax
  React.useEffect(() => {
    const unsub = scrollY.onChange((y) => {
      const [start, end] = range;
      if (end === start) return;
      let val = 0;
      if (y > end) {
        const distance = y - end;
        const maxDist = 1000;
        const progress = Math.min(distance / maxDist, 1);
        val = -60 * progress;
      }
      photoY.set(val);
    });
    return unsub;
  }, [scrollY, range, photoY]);

  // GSAP Animations (Projects + About Text Reveal)
  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>(".project-card");
    const numbers = document.querySelectorAll<HTMLElement>(".project-number");
    const animeTexts = document.querySelectorAll<HTMLElement>(".anime-reveal");

    // Initial State (Hidden)
    gsap.set(cards, { opacity: 0, y: 30, scale: 0.99 });
    gsap.set(numbers, { opacity: 0, scale: 0.6 });
    gsap.set(animeTexts, { opacity: 0, y: 40 });

    const observerOptions = { threshold: 0.15 };

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target as HTMLElement;

        // Project Cards Animation Logic
        if (el.classList.contains("project-card")) {
          const idx = Array.from(cards).indexOf(el);
          const tl = gsap.timeline();
          tl.to(el, { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power3.out" });

          const num = numbers[idx];
          if (num) {
            tl.fromTo(
              num,
              { scale: 0.6, opacity: 0 },
              { scale: 1.05, opacity: 1, duration: 0.45, ease: "back.out(1.6)" },
              "-=.45"
            );
          }
        }

        // About Text Animation Logic
        if (el.classList.contains("anime-reveal")) {
          const delay = el.getAttribute("data-delay") || "0";
          gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power4.out",
            delay: parseFloat(delay),
          });
        }

        io.unobserve(el);
      });
    }, observerOptions);

    cards.forEach((c) => io.observe(c));
    animeTexts.forEach((t) => io.observe(t));

    return () => io.disconnect();
  }, []);

  return (
    <div className="w-full">
      <main
        ref={sectionRef}
        className="flex h-full w-full max-w-maxWidth grow flex-col md:flex-row items-center justify-center gap-8 mt-8 px-paddingX text-[5.8vw] md:text-[clamp(20px,_1vw_+_14px,_32px)]"
      >
        {/* About text on the LEFT */}
        <div className="w-full md:w-1/2 flex flex-col items-start text-colorLight">
          <div className="anime-reveal" data-delay="0.1">
            <TrueFocus
              sentence="About Me"
              manualMode={false}
              blurAmount={4}
              borderColor="#5227FF"
              animationDuration={0.45}
              pauseBetweenAnimations={1}
            />
          </div>

          <p className="max-w-prose text-base md:text-xl anime-reveal mt-8" data-delay="0.3">
            I am a <span className="text-[hsl(54,100%,50%)] font-semibold">BSc (Hons) Computer Science with Software Engineering</span> student at <span className="text-[hsl(54,100%,50%)] font-semibold">Coventry University</span>, backed by a solid academic foundation from <span className="text-[hsl(54,100%,50%)] font-semibold">Pearson</span> and <span className="text-[hsl(54,100%,50%)] font-semibold">NIBM</span>. With a strong command of Python and Java, I specialize in <span className="text-[hsl(54,100%,50%)] font-semibold">Full Stack Development</span> with a primary focus on building high-performance <span className="text-[hsl(54,100%,50%)] font-semibold">Mobile Applications</span>.
          </p>
          
          <p className="max-w-prose text-base md:text-xl mt-4 anime-reveal" data-delay="0.5">
            My work revolves around strategic problem-solving by integrating emerging technologies like <span className="text-[hsl(54,100%,50%)] font-semibold">AI</span>, <span className="text-[hsl(54,100%,50%)] font-semibold">Machine Learning</span>, and <span className="text-[hsl(54,100%,50%)] font-semibold">Blockchain</span>. I am a lifelong learner committed to delivering innovative, tech-driven solutions. Explore my technical journey and latest projects on <a href="https://github.com/thenula09" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors">GitHub (thenula09)</a> and <a href="https://www.linkedin.com/in/thenula-hansaja-317a63301/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors">LinkedIn (Thenula Hansaja)</a>.
          </p>
        </div>

        {/* Image on the RIGHT */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
          <div className="photo-frame p-4 rounded-3xl">
            <motion.div
              className="w-[360px] h-[360px] md:w-[480px] md:h-[580px] rounded-3xl overflow-hidden shadow-lg about-photo"
              style={{ y: smoothPhotoY }}
              whileHover={{ scale: 1.05, rotateY: 5 }}
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

      <div className="max-w-maxWidth mx-auto px-paddingX mt-8">
        <ExperienceEducation />
      </div>

      <div className="max-w-maxWidth mx-auto px-paddingX mt-10">
        <SkillsSection />
      </div>

      {/* Projects Section */}
      <div className="max-w-maxWidth mx-auto px-paddingX mt-[120px] md:mt-[160px] relative overflow-visible projects-wrapper">
        <DecorativeCard className="absolute inset-0 -z-10 pointer-events-none" />

        <h3 className="mb-6 text-2xl md:text-3xl font-semibold text-colorLight text-center projects-title anime-reveal" data-delay="0.2">
          My Latest Projects and Works
        </h3>

        {/* Featured Project */}
        <article className="group relative mb-8 overflow-hidden rounded-3xl bg-card/60 border border-border z-10 anime-reveal" data-delay="0.3">
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
              <ProjectCard index={i + 1} imgSrc={p.image} title={p.title} category={p.category} footer={p.footer} />
            </a>
          ))}
        </div>

        <div className="mt-6 z-10 flex justify-center">
          <DiscoverButton href="/work">View all projects</DiscoverButton>
        </div>
      </div>
    </div>
  );
}