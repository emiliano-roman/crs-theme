"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

// Tipos para el proyecto
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

  const params = useParams(); // Obtener `slug` desde la URL

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
        setError("Error al cargar el proyecto. Inténtalo nuevamente.");
        console.error("Error al cargar el proyecto:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [params.slug]);

  // Manejo de estados de carga, error y ausencia de datos
  if (loading) return <div>Cargando proyecto...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!project) return <div>Proyecto no encontrado.</div>;

  return (
    <div className="project-detail">
      <h1>{project.title}</h1>
      <p>{project.description}</p>

      <section>
        <h2>Imágenes</h2>
        {project.images.length > 0 ? (
          <div className="image-gallery">
            {project.images.map((image, index) => (
              <Image
                key={index}
                src={`/images/${image}`}
                alt={`Imagen del proyecto ${project.title} - ${index + 1}`}
                width={600}
                height={400}
                loading="lazy" // Lazy loading para optimización
              />
            ))}
          </div>
        ) : (
          <p>No hay imágenes disponibles para este proyecto.</p>
        )}
      </section>

      <section>
        <h2>Videos</h2>
        {project.videos.length > 0 ? (
          <div className="video-gallery">
            {project.videos.map((video, index) => (
              <video
                key={index}
                controls
                preload="metadata" // Optimización del pre-load de videos
                width="600"
                height="400"
              >
                <source src={`/videos/${video}`} type="video/webm" />
                Tu navegador no soporta el video.
              </video>
            ))}
          </div>
        ) : (
          <p>No hay videos disponibles para este proyecto.</p>
        )}
      </section>
    </div>
  );
};

export default ProjectDetailPage;
