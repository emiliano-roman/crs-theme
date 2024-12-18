// // lib/lenis-config.ts
// "use client";  // marca el archivo como un componente de cliente

// import { useEffect } from 'react';
// import Lenis from 'lenis';

// export const useLenis = () => {
//   useEffect(() => {
//     const lenis = new Lenis({
//       duration: 1.2,
//       easing: (t) => t * (2 - t),
//     });

//     function raf(time: DOMHighResTimeStamp) { 
//       lenis.raf(time);
//       requestAnimationFrame(raf);
//     }

//     requestAnimationFrame(raf);
//   }, []);
// };


// lib/lenis-config.ts
"use client";  // marca el archivo como un componente de cliente

import { useEffect } from 'react';
import Lenis from 'lenis';

export const useLenis = () => {
  useEffect(() => {
    // Inicializar Lenis para desplazamiento suave
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    // Función de animación que recibe un 'time' de tipo DOMHighResTimeStamp
    function raf(time: DOMHighResTimeStamp) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);
};
