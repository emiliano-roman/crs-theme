// lib/split-type-config.ts

"use client"; // Indica que este archivo es un componente del lado del cliente

import { useEffect } from 'react';
import SplitType from 'split-type';
import { gsap } from 'gsap';

export const useSplitText = () => {
  useEffect(() => {
    const splitText = new SplitType('.split', {
      types: ['words', 'chars'], // Usar un array con los tipos
    });

    gsap.fromTo(
      splitText.chars,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        stagger: 0.05,
      }
    );
  }, []);

  return null; // No es necesario devolver nada, ya que el hook se usa para efectos secundarios
};
