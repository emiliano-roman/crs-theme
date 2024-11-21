// src/app/expertise/page.tsx
"use client";  // Indica que este es un componente de cliente

import { useEffect } from 'react';
import { useLenis } from '../../../lib/lenis-config';
import { useSplitText } from '../../../lib/split-type-config';
import { gsap } from 'gsap';

export default function ExpertisePage() {
  useLenis();
  useSplitText();

  return (
    <div>
      <h1>Expertise Page</h1>
       <h1>Expertise Page</h1>
      {/* Tu contenido aquí */}
    </div>
  );
}
