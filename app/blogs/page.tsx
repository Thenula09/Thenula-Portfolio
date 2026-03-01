"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import "../header.css";
import "../work.css";
import { Header } from "@/components/header";
import { HeaderNavigation } from "@/components/headerNavigation";
import { Footer } from "@/components/contactSection/footer";
import { links } from "@/data/data";
import { gsap } from "gsap";
import { CalendarIcon, FileTextIcon } from "@radix-ui/react-icons";
import { BellIcon, Share2Icon } from "lucide-react";
import { cn } from "@/lib/utils";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { LayoutGrid } from "@/components/ui/layout-grid";

import galleryImg1 from "./1768669939155.jpeg";
import galleryImg2 from "./1768669939732.jpeg";
import galleryImg3 from "./1768669940148.jpeg";

import tallImg1 from "./1770747615535.jpeg";
import tallImg2 from "./1770747618386.jpeg";

import snippetImg1 from "./1772046390723.jpeg";
import snippetImg2 from "./1772046390156.jpeg";
import snippetImg3 from "./1772046388637.jpeg";

import snippet02Img from "./1737483732808.jpeg";

// Add animation styles
const animationStyles = `
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  .animate-spin {
    animation: spin 2s linear infinite;
  }
  .animation-delay-150 {
    animation-delay: 150ms;
  }
  .animation-delay-300 {
    animation-delay: 300ms;
  }
`;

if (typeof window !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = animationStyles;
  document.head.appendChild(style);
}

const files = [
  {
    name: "bitcoin.pdf",
    body: "Bitcoin is a cryptocurrency invented in 2008 by an unknown person or group of people using the name Satoshi Nakamoto.",
  },
  {
    name: "finances.xlsx", 
    body: "A spreadsheet or worksheet is a file made of rows and columns that help sort data, arrange data easily, and calculate numerical data.",
  },
  {
    name: "logo.svg",
    body: "Scalable Vector Graphics is an Extensible Markup Language-based vector image format for two-dimensional graphics with support for interactivity and animation.",
  },
  {
    name: "keys.gpg",
    body: "GPG keys are used to encrypt and decrypt email, files, directories, and whole disk partitions and to authenticate messages.",
  },
  {
    name: "seed.txt",
    body: "A seed phrase, seed recovery phrase or backup seed phrase is a list of words which store all the information needed to recover Bitcoin funds on-chain.",
  },
];

const features = [
  {
    Icon: FileTextIcon,
    name: "Save your files",
    description: "We automatically save your files as you type.",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-1",
    background: (
      <div className="absolute top-10 left-0 right-0 overflow-hidden">
        <div className="flex animate-marquee">
          {[...files, ...files].map((f, idx) => (
            <div
              key={idx}
              className={cn(
                "relative w-32 mx-4 p-4 rounded-xl border",
                "border-gray-950/[.1] bg-gray-950/[.01]",
                "dark:border-gray-50/[.1] dark:bg-gray-50/[.10]",
                "transform-gpu transition-all duration-300"
              )}
            >
              <div className="flex flex-row items-center gap-2">
                <div className="flex flex-col">
                  <div className="text-sm font-medium dark:text-white">
                    {f.name}
                  </div>
                </div>
              </div>
              <blockquote className="mt-2 text-xs">{f.body}</blockquote>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    Icon: BellIcon,
    name: "Notifications",
    description: "Get notified when something happens.",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-2",
    background: (
      <div className="absolute top-4 right-2 h-[300px] w-full flex items-center justify-center">
        <div className="text-white/50 text-center">
          <BellIcon className="w-16 h-16 mx-auto mb-4 animate-pulse" />
          <p>Notification System</p>
        </div>
      </div>
    ),
  },
  {
    Icon: Share2Icon,
    name: "Integrations",
    description: "Supports 100+ integrations and counting.",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-2",
    background: (
      <div className="absolute top-4 right-2 h-[300px] w-full flex items-center justify-center">
        <div className="text-white/50 text-center">
          <Share2Icon className="w-16 h-16 mx-auto mb-4 animate-spin" />
          <p>Integration Hub</p>
        </div>
      </div>
    ),
  },
  {
    Icon: CalendarIcon,
    name: "Calendar",
    description: "Use calendar to filter your files by date.",
    className: "col-span-3 lg:col-span-1",
    href: "#",
    cta: "Learn more",
    background: (
      <div className="absolute top-10 right-0 flex items-center justify-center">
        <div className="text-white/50 text-center">
          <CalendarIcon className="w-16 h-16 mx-auto mb-4" />
          <p>Calendar View</p>
        </div>
      </div>
    ),
  },
];

const samplePosts = [
  { id: 1, title: "E=mc² + Energy = Mass", excerpt: "Einstein's famous equation relating mass and energy: E = mc²", href: "#" },
  { id: 2, title: "Pythagorean Theorem", excerpt: "a² + b² = c² for right-angled triangles", href: "#" },
  { id: 3, title: "Fibonacci Sequence", excerpt: "Each number is sum of previous two: 0, 1, 1, 2, 3, 5, 8...", href: "#" },
];

// LayoutGrid card components
const SkeletonOne = () => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">
        House in woods
      </p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        A serene and tranquil retreat, this house in woods offers a peaceful
        escape from hustle and bustle of city life.
      </p>
    </div>
  );
};

const SkeletonTwo = () => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">
        House above clouds
      </p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        Perched high above the world, this house offers breathtaking views and a
        unique living experience. It&apos;s a place where the sky meets home,
        and tranquility is a way of life.
      </p>
    </div>
  );
};

const SkeletonThree = () => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">
        Greens all over
      </p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        A house surrounded by greenery and nature&apos;s beauty. It&apos;s the
        perfect place to relax, unwind, and enjoy life.
      </p>
    </div>
  );
};

const SkeletonFour = () => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">
        Rivers are serene
      </p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        A house by the river is a place of peace and tranquility. It&apos;s the
        perfect place to relax, unwind, and enjoy life.
      </p>
    </div>
  );
};

// LayoutGridDemo component
function LayoutGridDemo() {
  return (
    <div className="h-screen py-20 w-full">
      <LayoutGrid cards={layoutCards} />
    </div>
  );
}

const layoutCards = [
  {
    id: 1,
    content: <SkeletonOne />,
    className: "md:col-span-2",
    thumbnail:
      "https://images.unsplash.com/photo-1476231682828-37e571bc172f?q=80&w=3474&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    content: <SkeletonTwo />,
    className: "col-span-1",
    thumbnail:
      "https://images.unsplash.com/photo-1464457312035-3d7d0e0c058e?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    content: <SkeletonThree />,
    className: "col-span-1",
    thumbnail:
      "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 4,
    content: <SkeletonFour />,
    className: "md:col-span-2",
    thumbnail:
      "https://images.unsplash.com/photo-1475070929565-c985b496cb9f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export default function BlogsPage() {
  const blogCardsRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [activeSection, setActiveSection] = useState(0);
  const [galleryImageIndex, setGalleryImageIndex] = useState(0);
  const [tallImageIndex, setTallImageIndex] = useState(0);
  const [snippetImageIndex, setSnippetImageIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | StaticImageData | null>(null);
  
  const sections = [
    { id: 'gallery', name: 'Gallery', ref: galleryRef },
    { id: 'blogs', name: 'Blogs', ref: blogCardsRef }
  ];
  
  useEffect(() => {
    // Animate on mount with yellow theme - faster and smoother
    const tl = gsap.timeline();
    
    // Yellow background animation - much faster
    tl.fromTo("main",
      {
        backgroundColor: "#1a1a1a"
      },
      {
        backgroundColor: "#2d2d00",
        duration: 0.5,
        ease: "power2.inOut"
      }
    )
    .to("main", {
      backgroundColor: "#0a0a0a",
      duration: 0.5,
      ease: "power2.inOut"
    }, "+=0.1");
    
    // Subtle title animation - faster
    if (titleRef.current) {
      tl.fromTo(titleRef.current,
        {
          y: -20
        },
        {
          y: 0,
          duration: 0.3,
          ease: "power4.out"
        },
        "-=0.2"
      );
    }
    
    // Subtle blog cards animation - much faster
    if (blogCardsRef.current) {
      tl.fromTo(blogCardsRef.current.children,
        {
          y: -20
        },
        {
          y: 0,
          duration: 0.2,
          ease: "back.out(1.2)",
          stagger: 0.04
        },
        "-=0.1"
      );
    }
    
    
    
    return () => {
      tl.kill();
    };
  }, []);

  useEffect(() => {
    const imagesCount = 3;
    const intervalId = window.setInterval(() => {
      setGalleryImageIndex((prev) => (prev + 1) % imagesCount);
    }, 3000);

    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const imagesCount = 2;
    const intervalId = window.setInterval(() => {
      setTallImageIndex((prev) => (prev + 1) % imagesCount);
    }, 3000);

    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const imagesCount = 3;
    const intervalId = window.setInterval(() => {
      setSnippetImageIndex((prev) => (prev + 1) % imagesCount);
    }, 3000);

    return () => window.clearInterval(intervalId);
  }, []);

  // Initial animation for blogs section
  useEffect(() => {
    const blogSection = document.getElementById('blogs');
    if (blogSection) {
      // Initial state - hidden
      gsap.set(blogSection.querySelectorAll('h1, p, div'), {
        opacity: 0,
        y: 30
      });
      
      // Animate in when section is visible
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              gsap.to(blogSection.querySelectorAll('h1, p, div'), {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power4.out",
                stagger: 0.1
              });
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.3 }
      );
      
      observer.observe(blogSection);
      
      return () => observer.disconnect();
    }
  }, []);

  // Scroll detection for active section
  useEffect(() => {
    let previousSection = 0;
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Get all sections
      const gallerySection = document.getElementById('gallery');
      const blogSection = document.getElementById('blogs');
      
      if (!gallerySection || !blogSection) return;
      
      // Get section positions
      const galleryTop = gallerySection.offsetTop;
      const blogTop = blogSection.offsetTop;
      
      // Determine active section based on scroll position
      let activeIndex = 0;

      if (scrollPosition >= blogTop - windowHeight * 0.5) {
        activeIndex = 1;
      } else if (scrollPosition >= galleryTop - windowHeight * 0.5) {
        activeIndex = 0;
      }
      
      // Animate section transition
      if (previousSection !== activeIndex) {
        // Animate out previous section
        const allSections = [gallerySection, blogSection];
        if (allSections[previousSection]) {
          gsap.to(allSections[previousSection].querySelectorAll('article, h1, h2, p, div'), {
            opacity: 0.3,
            y: 20,
            duration: 0.3,
            ease: "power2.out"
          });
        }
        
        // Animate in new section
        setTimeout(() => {
          if (allSections[activeIndex]) {
            gsap.to(allSections[activeIndex].querySelectorAll('article, h1, h2, p, div'), {
              opacity: 1,
              y: 0,
              duration: 0.4,
              ease: "power4.out",
              stagger: 0.05
            });
          }
        }, 150);
        
        previousSection = activeIndex;
      }
      
      setActiveSection(activeIndex);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Set initial active section
    setTimeout(() => {
      handleScroll();
    }, 100);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll to section
  const scrollToSection = (index: number) => {
    const sectionElement = document.getElementById(sections[index].id);
    if (sectionElement) {
      sectionElement.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <>
      <Header color="Light" />
      <HeaderNavigation />
      
      {/* Timeline Navigation */}
      <div className="fixed left-8 top-1/2 transform -translate-y-1/2 z-50 hidden lg:block">
        <div className="flex flex-col items-center space-y-6">
          {sections.map((section, index) => (
            <div key={section.id} className="flex items-center space-x-3">
              <button
                onClick={() => scrollToSection(index)}
                className={`w-8 h-8 rounded-full transition-all duration-300 flex items-center justify-center text-xs font-bold ${
                  activeSection === index 
                    ? 'bg-yellow-400 scale-125 shadow-lg shadow-yellow-400/50 text-black' 
                    : 'bg-white/20 hover:bg-white/30 text-white/70'
                }`}
                aria-label={`Navigate to ${section.name}`}
              >
                {index + 1}
              </button>
              <span className={`text-sm transition-all duration-300 ${
                activeSection === index 
                  ? 'text-yellow-400 font-medium opacity-100' 
                  : 'text-white/50 opacity-0 hover:opacity-100'
              }`}>
                {section.name}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      <main className="relative w-full h-screen overflow-y-auto overflow-x-hidden snap-y snap-mandatory scroll-smooth">

        <section id="gallery" className="darkGradient min-h-screen w-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-[50px] py-paddingY text-colorLight snap-start">
          <div ref={galleryRef} className="relative z-10 w-full">
            <h1 className="mb-12 text-[clamp(32px,_5vw,_56px)] font-bold leading-[1.1] tracking-tight text-white text-center">
              Gallery
            </h1>

            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-6 md:p-10 shadow-2xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 auto-rows-[190px] md:auto-rows-[240px]">
                <div className="lg:col-span-2 lg:row-span-2 rounded-2xl overflow-hidden bg-gradient-to-br from-yellow-400/20 via-white/5 to-white/5 relative cursor-pointer hover:scale-[1.02] transition-transform duration-300" onClick={() => setSelectedImage([galleryImg1, galleryImg2, galleryImg3][galleryImageIndex])}>
                  <div className="absolute inset-0">
                    {[galleryImg1, galleryImg2, galleryImg3].map((img, idx) => (
                      <div
                        key={idx}
                        className={cn(
                          "absolute inset-0 transition-all duration-700 ease-in-out",
                          idx === galleryImageIndex
                            ? "opacity-100 translate-x-0"
                            : "opacity-0 translate-x-6"
                        )}
                      >
                        <Image
                          src={img}
                          alt="Gallery image"
                          fill
                          priority={idx === 0}
                          className="object-cover"
                        />
                      </div>
                    ))}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  </div>

                  <div className="relative h-full w-full py-6 px-4 md:px-5 flex flex-col justify-end">
                    <p className="text-white/90 text-sm mb-2">Featured</p>
                    <h2 className="text-white font-semibold text-2xl md:text-3xl leading-tight">
                      RoboRover Workshop
                    </h2>
                    <p className="text-white/70 mt-2 max-w-md">
                      Workshop conducted at NIBM Matara – City University.
                    </p>
                  </div>
                </div>

                <div className="lg:row-span-3 rounded-2xl overflow-hidden border border-white/15 bg-gradient-to-br from-white/10 via-white/5 to-yellow-400/10 relative cursor-pointer hover:scale-[1.02] transition-transform duration-300" onClick={() => setSelectedImage([tallImg1, tallImg2][tallImageIndex])}>
                  <div className="absolute inset-0">
                    {[tallImg1, tallImg2].map((img, idx) => (
                      <div
                        key={idx}
                        className={cn(
                          "absolute inset-0 transition-all duration-700 ease-in-out",
                          idx === tallImageIndex
                            ? "opacity-100 translate-x-0"
                            : "opacity-0 translate-x-6"
                        )}
                      >
                        <Image
                          src={img}
                          alt="Tall card image"
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  </div>

                  <div className="relative h-full w-full p-8 lg:p-10 flex flex-col justify-between">
                    <div>
                      <h3 className="text-white font-semibold text-lg">NIBM RoboRover Event!</h3>
                      <p className="text-white/70 text-sm mt-2">
                        Highlights:
                      </p>
                    </div>
                    <p className="text-white/60 text-sm">
                      Workshop conducted at NIBM Matara – City University.
                    </p>
                  </div>
                </div>

                <div className="lg:col-span-1 rounded-2xl overflow-hidden border border-white/15 bg-gradient-to-br from-white/10 to-white/5 relative cursor-pointer hover:scale-[1.02] transition-transform duration-300" onClick={() => setSelectedImage([snippetImg1, snippetImg2, snippetImg3][snippetImageIndex])}>
                  <div className="absolute inset-0">
                    {[snippetImg1, snippetImg2, snippetImg3].map((img, idx) => (
                      <div
                        key={idx}
                        className={cn(
                          "absolute inset-0 transition-all duration-700 ease-in-out",
                          idx === snippetImageIndex
                            ? "opacity-100 translate-x-0"
                            : "opacity-0 translate-x-6"
                        )}
                      >
                        <Image
                          src={img}
                          alt="Snippet image"
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  </div>

                  <div className="relative h-full w-full p-6 flex flex-col justify-end">
                    <h3 className="text-white font-semibold text-lg">Industry Visit</h3>
                    <p className="text-white/70 text-sm mt-2">Wiley IT Company</p>
                  </div>
                </div>

                <div className="lg:col-span-1 rounded-2xl overflow-hidden border border-white/15 bg-gradient-to-br from-white/10 to-white/5 relative cursor-pointer hover:scale-[1.02] transition-transform duration-300" onClick={() => setSelectedImage(snippet02Img)}>
                  <div className="absolute inset-0">
                    <Image
                      src={snippet02Img}
                      alt="Snippet 02 image"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  </div>

                  <div className="relative h-full w-full p-6 flex flex-col justify-end">
                    <h3 className="text-white font-semibold text-lg">02</h3>
                    <p className="text-white/70 text-sm mt-2">new</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Blogs Section - Full Screen */}
        <section id="blogs" className="darkGradient min-h-screen w-full flex flex-col items-center justify-center px-paddingX py-paddingY text-colorLight snap-start">
          <div className="relative z-10 w-full max-w-6xl mx-auto">
            <h1 
              ref={titleRef}
              className="mb-8 text-[clamp(32px,_5vw,_56px)] font-bold leading-[1.1] tracking-tight text-white text-center"
            >
              Coming Soon
            </h1>

            <p className="mb-12 text-[clamp(18px,_2vw,_24px)] text-white/80 text-center max-w-3xl mx-auto">
              Exciting content is on the way! Stay tuned for updates.
            </p>

            {/* Loading Animation */}
            <div className="flex justify-center items-center">
              <div className="relative w-24 h-24">
                <div className="absolute inset-0 border-4 border-yellow-400/20 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-yellow-400 rounded-full animate-spin border-t-transparent"></div>
                <div className="absolute inset-2 border-4 border-yellow-400/10 rounded-full"></div>
                <div className="absolute inset-2 border-4 border-yellow-400/60 rounded-full animate-spin border-t-transparent animation-delay-150"></div>
                <div className="absolute inset-4 border-4 border-yellow-400/5 rounded-full"></div>
                <div className="absolute inset-4 border-4 border-yellow-400/40 rounded-full animate-spin border-t-transparent animation-delay-300"></div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <p className="text-white/60 text-sm animate-pulse">
                We're working on something amazing...
              </p>
            </div>
          </div>
        </section>

        
      </main>
      
      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-6xl max-h-[90vh] w-full h-full flex items-center justify-center">
            <Image
              src={selectedImage}
              alt="Selected image"
              fill
              className="object-contain"
              priority
            />
            <button
              className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
      
      {/* Footer at bottom of all sections */}
      <Footer className="bottom-0 left-0" />
    </>
  );
}
