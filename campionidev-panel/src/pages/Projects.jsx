import { useEffect, useState } from "react";

function Projects() {
  const [proyectos, setProyectos] = useState([]);

  useEffect(() => {
    cargarProyectos();
  }, []);

  const cargarProyectos = async () => {
    try {
      const respuesta = await fetch("http://localhost:3000/proyectos");
      const datos = await respuesta.json();

      setProyectos(datos);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Proyectos</h1>

      <div className="cards-grid">
        {proyectos.map((proyecto) => (
          <div className="client-card" key={proyecto.id}>
            <h3>{proyecto.nombre}</h3>

            <p>
              Estado: <strong>{proyecto.estado}</strong>
            </p>

            <p>
              Inicio: {proyecto.fechaInicio}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;