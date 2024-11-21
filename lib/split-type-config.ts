// lib/split-type-config.ts
import { useEffect } from 'react';
import SplitType from 'split-type';
import { gsap } from 'gsap';

export const useSplitText = () => {
  useEffect(() => {
    // Cambia 'words, chars' por 'words,chars'
    const splitText = new SplitType('.animated-text', { types: 'words,chars' });

    gsap.from(splitText.chars, { opacity: 0, y: 50, stagger: 0.05 });
  }, []);
};
