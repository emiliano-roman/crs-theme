// ProjectDetailPage.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useLazyLoadMedia } from "../../../../lib/assets-url-config"; // Importamos el hook para lazy load
import Image from "next/image"; // Importamos Image de Next.js

interface Project {
  slug: string;
  title: string;
  description: string;
  images: string[];
  videos: string[];
}

const ProjectDetailPage = () => {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const initializeLazyLoad = useLazyLoadMedia(); // Hook de lazy load para videos

  useEffect(() => {
    const fetchProject = async () => {
      try {
        if (params.slug) {
          const response = await fetch("/data/projects.json");
          if (!response.ok) {
            throw new Error("Error al cargar los datos del servidor.");
          }
          const projects: Project[] = await response.json();
          const foundProject = projects.find((p) => p.slug === params.slug);
          if (foundProject) {
            setProject(foundProject);
          } else {
            setError("Proyecto no encontrado.");
          }
        }
      } catch (error) {
        setError("Error al cargar el proyecto.");
        console.error("Error al cargar el proyecto:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [params.slug]);

  useEffect(() => {
    if (project) {
      initializeLazyLoad(); // Inicializar lazy load para los videos
    }
  }, [project]);

  if (loading) return <div>Cargando proyecto...</div>;
  if (error) return <div>{error}</div>;
  if (!project) return <div>Proyecto no encontrado.</div>;

  return (
    <div>
      <h1>{project.title}</h1>
      <p>{project.description}</p>

      <div>
        <h2>Imágenes</h2>
        {project.images.length > 0 ? (
          project.images.map((image, index) => (
            <Image
              key={index}
              src={`https://d2llx07cilb2cs.cloudfront.net/${image}`} // URL completa de CloudFront
              alt={`Imagen del proyecto ${project.title} - ${index + 1}`}
              width={1400}
              height={1000}
              style={{ width: '100%', height: 'auto' }}
              decoding="async" // Decodificación asíncrona
            />
          ))
        ) : (
          <p>No hay imágenes disponibles para este proyecto.</p>
        )}
      </div>

      <div>
        <h2>Videos</h2>
        {project.videos.length > 0 ? (
          project.videos.map((video, index) => (
            <video
              key={index}
              data-src={`https://d2llx07cilb2cs.cloudfront.net/${video}`} // Usamos data-src para lazy load
              controls
            >
              Tu navegador no soporta el video.
            </video>
          ))
        ) : (
          <p>No hay videos disponibles para este proyecto.</p>
        )}
      </div>
    </div>
  );
};

export default ProjectDetailPage;
