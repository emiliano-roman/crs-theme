"use client"; // Este archivo es un componente cliente

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

export const useSplitText = (): void => {
  useEffect(() => {
    console.log("Initializing text animations...");

    const elements = document.querySelectorAll("[text-split]");
    console.log("Found elements for text-split:", elements);

    if (elements.length > 0) {
      new SplitType("[text-split]", {
        types: "words,chars",
        tagName: "span",
      });

      // Define animaciones
      setupTextAnimations();
    } else {
      console.warn("No elements found for SplitType.");
    }

    // Asegurar que los textos estén visibles
    gsap.set("[text-split]", { opacity: 1 });
  }, []);
};

// Función para configurar las animaciones
function setupTextAnimations(): void {
  applyAnimation("[zoom-in-up]", (element) =>
    createTimeline(element, ".word", {
      from: { opacity: 0, scale: 100 },
      to: { opacity: 1, scale: 1, stagger: 0.05 },
      duration: 0.5,
      ease: "back.out(2)",
    })
  );

  applyAnimation("[words-slide-up]", (element) =>
    createTimeline(element, ".word", {
      from: { opacity: 0, yPercent: 100 },
      to: { opacity: 1, yPercent: 0, stagger: 0.05 },
      duration: 0.5,
      ease: "back.out(2)",
    })
  );

  applyAnimation("[words-move-up]", (element) =>
    createTimeline(element, ".word", {
      from: { opacity: 0, yPercent: 200 },
      to: { opacity: 1, yPercent: 0, stagger: 0.1 },
      duration: 1,
      ease: "power2.out",
    })
  );

  applyAnimation("[words-rotate-in]", (element) =>
    createTimeline(element, ".word", {
      from: { rotationX: -90 },
      to: { rotationX: 0, stagger: 0.06 },
      duration: 0.6,
      ease: "power2.out",
    })
  );

  applyAnimation("[words-slide-from-right]", (element) =>
    createTimeline(element, ".word", {
      from: { opacity: 0, x: "1em" },
      to: { opacity: 1, x: 0, stagger: 0.2 },
      duration: 0.6,
      ease: "power2.out",
    })
  );

  applyAnimation("[letters-slide-up]", (element) =>
    createTimeline(element, ".char", {
      from: { yPercent: 160 },
      to: { yPercent: 0, stagger: 0.05 },
      duration: 0.5,
      ease: "power1.out",
    })
  );

  applyAnimation("[letters-slide-down]", (element) =>
    createTimeline(element, ".char", {
      from: { yPercent: -120 },
      to: { yPercent: 0, stagger: 0.07 },
      duration: 0.3,
      ease: "power1.out",
    })
  );

  applyAnimation("[letters-fade-in]", (element) =>
    createTimeline(element, ".char", {
      from: { opacity: 0 },
      to: { opacity: 1, stagger: 0.08 },
      duration: 0.2,
      ease: "power1.out",
    })
  );

  applyAnimation("[letters-fade-in-random]", (element) =>
    createTimeline(element, ".char", {
      from: { opacity: 0 },
      to: { opacity: 1, stagger: { each: 0.05, from: "random" } },
      duration: 0.05,
      ease: "power1.out",
    })
  );

  applyAnimation("[scrub-each-word]", (element) => {
    gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: "top 90%",
        end: "bottom center",
        scrub: true,
      },
    }).from(element.querySelectorAll(".word"), {
      opacity: 0.15,
      duration: 2.8,
      ease: "power1.out",
      stagger: { each: 0.4 },
    });
  });
}

// Helper para crear animaciones con ScrollTrigger
function createTimeline(
  element: Element,
  target: string,
  {
    from,
    to,
    ...options
  }: {
    from: gsap.TweenVars;
    to: gsap.TweenVars;
    [key: string]: any;
  }
): void {
  const timeline = gsap.timeline({ paused: true });
  timeline.fromTo(
    element.querySelectorAll(target),
    from,
    { ...to, ...options }
  );
  createScrollTrigger(element, timeline);
}

// Crear un ScrollTrigger para un elemento
function createScrollTrigger(
  element: Element,
  timeline: gsap.core.Timeline
): void {
  ScrollTrigger.create({
    trigger: element,
    start: "top 100%",
    onEnter: () => timeline.play(),
    onLeaveBack: () => {
      timeline.progress(0).pause();
    },
  });
}

// Helper para aplicar animaciones
function applyAnimation(
  selector: string,
  animationFn: (element: Element) => void
): void {
  document.querySelectorAll(selector).forEach((element) => animationFn(element));
}
