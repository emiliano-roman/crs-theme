// lib/gsap-config.ts
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Registrar el plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Configuración inicial de GSAP (si es necesario)
gsap.defaults({
  ease: 'power3.out',
});
