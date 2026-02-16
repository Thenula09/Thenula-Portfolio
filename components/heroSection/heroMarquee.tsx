import React, { useEffect } from "react";
import { gsap } from "gsap";

export function HeroMarquee({}) {
  useEffect(() => {
    function roll(
      targets: gsap.TweenTarget,
      vars: gsap.TweenVars,
      reverse?: number,
    ) {
      vars = vars || {};
      vars.ease || (vars.ease = "none");
      const tl = gsap.timeline({
          repeat: -1,
          onReverseComplete() {
            // advance playhead forward without triggering callbacks to avoid recursion
            this.totalTime(this.rawTime() + this.duration() * 10, true); // otherwise when the playhead gets back to the beginning, it'd stop — push it forward several iterations
          },
        }),
        elements = gsap.utils.toArray(targets) as HTMLElement[],
        clones = elements.map((el) => {
          let clone = el.cloneNode(true) as HTMLElement;
          // mark clones so we can remove them later
          clone.setAttribute("data-clone", "true");
          el.parentNode?.appendChild(clone);
          return clone;
        }),
        positionClones = () =>
          elements.forEach((el, i) =>
            gsap.set(clones[i], {
              position: "absolute",
              overwrite: false,
              top: el.offsetTop,
              left: "100%",
            }),
          );
      positionClones();
      elements.forEach((el, i) =>
        tl.to([el, clones[i]], { xPercent: reverse ? 100 : -100, ...vars }, 0),
      );

      const resizeHandler = () => {
        let time = tl.totalTime(); // record the current time
        tl.totalTime(0); // rewind and clear out the timeline
        positionClones(); // reposition
        tl.totalTime(time); // jump back to the proper time
      };

      window.addEventListener("resize", resizeHandler);

      // attach helpers to the timeline for external cleanup
      (tl as any)._clones = clones;
      (tl as any)._resizeHandler = resizeHandler;

      return tl;
    }

    const marqueeTl = roll(".rollingText", { duration: 15 });

    return () => {
      // kill timeline
      marqueeTl && marqueeTl.kill();
      // remove clones appended by roll
      const clones = (marqueeTl as any)?._clones as HTMLElement[] | undefined;
      clones?.forEach((c) => c.parentNode?.removeChild(c));
      // remove resize handler
      const handler = (marqueeTl as any)?._resizeHandler as (() => void) | undefined;
      if (handler) window.removeEventListener("resize", handler);
      // fallback: kill any tweens on selector
      gsap.killTweensOf(".rollingText");
    };
  }, []);
  return (
    <div className="wrapperRollingText anime pointer-events-none z-20  select-none  rounded-3xl tracking-[-0.1em] ">
      <div className="rollingText  md:!text-[200px]">
        - WA Thenula Hansaja - WA Thenula Hansaja&nbsp;
      </div>
    </div>
  );
}
