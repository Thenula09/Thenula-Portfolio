import { Footer } from "@/components/contactSection/footer";
import React, { useRef } from "react";
import Magentic from "@/components/ui/magentic";
import { BgImagesContainer } from "@/components/contactSection/bgImagesContainer";
import { useAppSelector } from "@/hooks/reduxHooks";
import { Header } from "../header";
import { Bulge } from "../bulge";
import { links } from "@/data/data";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { toggleMenu } from "@/redux/states/menuSlice";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { cn } from "@/lib/utils";
import ContactForm from "./ContactForm";

export function ContactSection({}) {
  const { suscribe } = useAppSelector((state) => state.fullpageReducer.third);
  const bgImagesSharedRef = useRef<gsap.core.Tween | null>(null);
  const logoAnimationTl = useRef<gsap.core.Timeline | null>(null);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const ease = CustomEase.create("custom", "M0,0 C0.52,0.01 0.16,1 1,1 ");
    logoAnimationTl.current = gsap.timeline({ paused: true }).fromTo(
      `.contact-logo__rotate`,
      {
        rotate: 0,
        transformOrigin: "center",
      },
      {
        rotate: -360,
        transformOrigin: "center",
        duration: 0.6,
        ease: ease,
      },
    );

    return () => {
      logoAnimationTl.current?.kill();
    };
  }, []);

  return (
    <section className="section section__5 third darkGradient">
      <Bulge type="Light" />

      {/* Contact Form */}
      <div className="contact-form-wrapper anime py-12">
        <ContactForm />
      </div>
      <BgImagesContainer bgImagesSharedRef={bgImagesSharedRef} />
      <Footer />
    </section>
  );
}
