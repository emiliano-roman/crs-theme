"use client"; // Este archivo también es un componente de cliente

import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // Cambiado de useRouter a useParams
import Image from "next/image"; // Para optimizar imágenes

const ProjectDetailPage = () => {
  const [project, setProject] = useState<any>(null); // Estado para almacenar el proyecto
  const [loading, setLoading] = useState<boolean>(true); // Estado para el loading
  const [error, setError] = useState<string | null>(null); // Estado para manejar errores
  const params = useParams(); // Obtener el parámetro 'slug' desde la URL

  useEffect(() => {
    const fetchProject = async () => {
      try {
        // Solo hacemos la búsqueda cuando tenemos el `slug`
        if (params.slug) {
          const response = await fetch(`/data/projects.json`);
          if (!response.ok) {
            throw new Error("No se pudo cargar el proyecto");
          }
          const projects = await response.json();
          const foundProject = projects.find((p: any) => p.slug === params.slug);

          if (foundProject) {
            setProject(foundProject);
          } else {
            setError("Proyecto no encontrado.");
          }
        }
      } catch (error: any) {
        setError("Error al cargar el proyecto");
        console.error("Error:", error);
      } finally {
        setLoading(false); // Dejar de mostrar loading una vez que se haya terminado de cargar
      }
    };

    fetchProject();
  }, [params.slug]); // Dependencia del `slug` para recargar al cambiar la URL

  if (loading) {
    return <div>Cargando...</div>; // Estado de carga
  }

  if (error) {
    return <div>{error}</div>; // Mostrar mensaje de error si ocurre uno
  }

  if (!project) {
    return <div>Proyecto no encontrado</div>; // Caso en que no se encuentra el proyecto
  }

  return (
    <div>
      <h1>{project.title}</h1>
      <p>{project.description}</p>

      <div>
        <h2>Imágenes</h2>
        {project.images.length > 0 ? (
          project.images.map((image: string, index: number) => (
            <Image
              key={index}
              src={`/images/${image}`}
              alt={`Imagen del proyecto ${project.title}`}
              width={600}
              height={400}
            />
          ))
        ) : (
          <p>No hay imágenes disponibles</p>
        )}
      </div>

      <div>
        <h2>Videos</h2>
        {project.videos.length > 0 ? (
          project.videos.map((video: string, index: number) => (
            <video key={index} controls>
              <source src={`/videos/${video}`} type="video/webm" />
              Tu navegador no soporta el etiquetado de video.
            </video>
          ))
        ) : (
          <p>No hay videos disponibles</p>
        )}
      </div>
    </div>
  );
};

export default ProjectDetailPage;
