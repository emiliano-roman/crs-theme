"use client"; // Asegúrate de que este archivo se ejecute en el cliente

import { useEffect, useState } from "react";
import Link from "next/link";

// Define un tipo para los proyectos
interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  images: string[];
  videos: string[];
}

const ProjectsPage = () => {
  const [projects, setProjects] = useState<Project[]>([]); // Usamos el tipo 'Project' para el estado

  useEffect(() => {
    // Cargar los proyectos desde el archivo JSON
    const fetchProjects = async () => {
      const response = await fetch('/data/projects.json');  // Accedemos al archivo JSON desde /public/data/projects.json
      const data = await response.json();
      setProjects(data);
    };

    fetchProjects();
  }, []);

  return (
    <div>
      <h1>Proyectos</h1>
      <div>
        {projects.map((project) => (
          <div key={project.id}>
            <h2>{project.title}</h2>
            <p>{project.description}</p>
            <Link href={`/projects/${project.slug}`}>Ver detalle</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;
