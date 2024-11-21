// assets-url-config.ts
"use client";

import { useEffect } from "react";

export const useLazyLoadMedia = (selector: string = 'video[data-src]') => {
  const initializeLazyLoad = () => {
    const BASE_URL = "https://d2llx07cilb2cs.cloudfront.net/";

    // Selecciona todos los elementos de video que tienen el atributo data-src
    const lazyElements = document.querySelectorAll<HTMLVideoElement>(selector);

    lazyElements.forEach((element) => {
      const dataSrc = element.getAttribute("data-src");

      if (dataSrc) {
        // Asignar el src del video directamente
        element.setAttribute("src", `${BASE_URL}${dataSrc}`);
        element.removeAttribute("data-src");
        element.setAttribute("preload", "metadata");
      }
    });
  };

  useEffect(() => {
    initializeLazyLoad(); // Ejecuta al montar el componente
  }, []);

  return initializeLazyLoad; // Retorna la función para llamarla manualmente si es necesario
};
