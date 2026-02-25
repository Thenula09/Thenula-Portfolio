"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import "../header.css";
import "../work.css";
import { Header } from "@/components/header";
import { HeaderNavigation } from "@/components/headerNavigation";
import { Footer } from "@/components/contactSection/footer";
import { links } from "@/data/data";
import { gsap } from "gsap";

const samplePosts = [
  { id: 1, title: "Building my portfolio with Next.js", excerpt: "How I structured components, styling and deployment.", href: "#" },
  { id: 2, title: "Animating with GSAP", excerpt: "Small performance tips & patterns I use.", href: "#" },
  { id: 3, title: "Design to code workflow", excerpt: "From Figma to production-ready UI.", href: "#" },
];

const sampleEventsAndEntries = [
  { id: 1, title: "Tech Conference 2024", date: "March 15, 2024", location: "Colombo", description: "Annual technology conference featuring latest innovations", type: "event", href: "#" },
  { id: 2, title: "Project Launch Success", date: "Feb 10, 2024", category: "Portfolio", description: "Successfully launched new portfolio website with modern design", type: "entry", href: "#" },
  { id: 3, title: "React Meetup", date: "February 28, 2024", location: "Kandy", description: "Community gathering for React developers", type: "event", href: "#" },
  { id: 4, title: "Learning TypeScript", date: "Feb 5, 2024", category: "Education", description: "Completed advanced TypeScript course and certification", type: "entry", href: "#" },
  { id: 5, title: "Web Development Workshop", date: "January 20, 2024", location: "Online", description: "Hands-on workshop on modern web technologies", type: "event", href: "#" },
  { id: 6, title: "Open Source Contribution", date: "Jan 28, 2024", category: "Community", description: "Contributed to popular open source React library", type: "entry", href: "#" },
];

const sampleVideos = [
  { id: 1, title: "Next.js Tutorial Series", duration: "15:30", views: "2.5K", thumbnail: "https://via.placeholder.com/300x200?text=Next.js+Tutorial", href: "#" },
  { id: 2, title: "React Hooks Explained", duration: "12:45", views: "1.8K", thumbnail: "https://via.placeholder.com/300x200?text=React+Hooks", href: "#" },
  { id: 3, title: "CSS Animation Tips", duration: "8:20", views: "3.2K", thumbnail: "https://via.placeholder.com/300x200?text=CSS+Animation", href: "#" },
];

export default function BlogsPage() {
  const blogCardsRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const eventsAndEntriesRef = useRef<HTMLDivElement>(null);
  const videosRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState(0);
  
  const sections = [
    { id: 'blogs', name: 'Blogs', ref: blogCardsRef },
    { id: 'events-entries', name: 'Events & Entries', ref: eventsAndEntriesRef },
    { id: 'videos', name: 'My Videos', ref: videosRef }
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
    
    // Events & Entries section animation - faster
    if (eventsAndEntriesRef.current) {
      tl.fromTo(eventsAndEntriesRef.current.children,
        {
          y: -20,
          opacity: 0.8
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.2,
          ease: "power4.out",
          stagger: 0.04
        },
        "-=0.05"
      );
    }
    
    // Videos section animation - faster
    if (videosRef.current) {
      tl.fromTo(videosRef.current.children,
        {
          y: -20,
          opacity: 0.8
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.2,
          ease: "power4.out",
          stagger: 0.04
        },
        "-=0.05"
      );
    }
    
    return () => {
      tl.kill();
    };
  }, []);

  // Scroll detection for active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Get all sections
      const blogSection = document.getElementById('blogs');
      const eventsSection = document.getElementById('events-entries');
      const videosSection = document.getElementById('videos');
      
      if (!blogSection || !eventsSection || !videosSection) return;
      
      // Get section positions
      const blogTop = blogSection.offsetTop;
      const eventsTop = eventsSection.offsetTop;
      const videosTop = videosSection.offsetTop;
      
      // Determine active section based on scroll position
      let activeIndex = 0;
      if (scrollPosition >= videosTop - windowHeight/2) {
        activeIndex = 2; // Videos section
      } else if (scrollPosition >= eventsTop - windowHeight/2) {
        activeIndex = 1; // Events & Entries section
      } else {
        activeIndex = 0; // Blogs section
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

  // Navigate to section
  const scrollToSection = (index: number) => {
    const sectionElement = document.getElementById(sections[index].id);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: 'smooth' });
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
        
        {/* Blogs Section - Full Screen */}
        <section id="blogs" className="darkGradient min-h-screen w-full flex flex-col items-center justify-center px-paddingX py-paddingY text-colorLight snap-start">
          <div className="relative z-10 w-full max-w-6xl mx-auto">
            <h1 
              ref={titleRef}
              className="mb-8 text-[clamp(32px,_5vw,_56px)] font-bold leading-[1.1] tracking-tight text-white text-center"
            >
              Blogs
            </h1>

            <p className="mb-12 text-[clamp(18px,_2vw,_24px)] text-white/80 text-center max-w-3xl mx-auto">
              Latest posts and write-ups — coming soon. Below are example entries you can replace with real content.
            </p>

            <div 
              ref={blogCardsRef}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch"
            >
              {samplePosts.map((p) => (
                <article 
                  key={p.id} 
                  className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl h-full flex flex-col justify-between min-w-0 hover:shadow-yellow-500/20 transition-all duration-150 hover:scale-105"
                >
                  <div>
                    <h3 className="text-xl md:text-2xl font-semibold text-white mb-4">{p.title}</h3>
                    <p className="text-base text-white/70 mb-6 line-clamp-3">{p.excerpt}</p>
                  </div>

                  <div className="flex items-end justify-between">
                    <Link 
                      href={p.href} 
                      className="text-yellow-400 hover:text-yellow-300 font-medium transition-colors duration-150"
                    >
                      Read →
                    </Link>
                    <span className="text-sm text-white/50">Feb 18, 2026</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Events & Entries Section - Full Screen */}
        <section id="events-entries" className="darkGradient min-h-screen w-full flex flex-col items-center justify-center px-paddingX py-paddingY text-colorLight snap-start">
          <div className="relative z-10 w-full max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">Events & Entries</h2>
            <div 
              ref={eventsAndEntriesRef}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {sampleEventsAndEntries.map((item) => (
                <article 
                  key={item.id} 
                  className={`bg-gradient-to-br ${item.type === 'event' ? 'from-blue-500/10 to-blue-600/5 border-blue-400/20 hover:shadow-blue-500/20' : 'from-green-500/10 to-green-600/5 border-green-400/20 hover:shadow-green-500/20'} backdrop-blur-xl border rounded-3xl p-8 shadow-2xl h-full flex flex-col justify-between min-w-0 transition-all duration-150 hover:scale-105`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className={`${item.type === 'event' ? 'text-blue-400' : 'text-green-400'} text-sm font-medium`}>
                        {item.type === 'event' ? (item as any).location : (item as any).category}
                      </span>
                      <span className={`${item.type === 'event' ? 'text-blue-300' : 'text-green-300'} text-sm`}>
                        {item.type === 'event' ? '📅' : '📝'} {item.date}
                      </span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-semibold text-white mb-4">{item.title}</h3>
                    <p className="text-base text-white/70 line-clamp-3">{item.description}</p>
                  </div>

                  <div className="flex items-end justify-between mt-6">
                    <Link 
                      href={item.href} 
                      className={`${item.type === 'event' ? 'text-blue-400 hover:text-blue-300' : 'text-green-400 hover:text-green-300'} font-medium transition-colors duration-150`}
                    >
                      {item.type === 'event' ? 'Learn More →' : 'Read More →'}
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* My Videos Section - Full Screen */}
        <section id="videos" className="darkGradient min-h-screen w-full flex flex-col items-center justify-center px-paddingX py-paddingY text-colorLight snap-start">
          <div className="relative z-10 w-full max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">My Videos</h2>
            <div 
              ref={videosRef}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {sampleVideos.map((video) => (
                <article 
                  key={video.id} 
                  className="bg-gradient-to-br from-red-500/10 to-red-600/5 backdrop-blur-xl border border-red-400/20 rounded-3xl overflow-hidden shadow-2xl h-full flex flex-col justify-between min-w-0 hover:shadow-red-500/20 transition-all duration-150 hover:scale-105"
                >
                  <div className="relative">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                      {video.duration}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-2">{video.title}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-red-400 text-sm">{video.views} views</span>
                      <Link 
                        href={video.href} 
                        className="text-red-400 hover:text-red-300 font-medium transition-colors duration-150"
                      >
                        Watch →
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            
            <div className="mt-16 text-center">
              <Link 
                href={links.home} 
                className="inline-flex items-center text-white/70 hover:text-white transition-colors duration-150 text-lg"
              >
                ← Back to home
              </Link>
            </div>
          </div>
        </section>
        
      </main>
      
      {/* Footer at bottom of all sections */}
      <Footer className="bottom-0 left-0" />
    </>
  );
}
