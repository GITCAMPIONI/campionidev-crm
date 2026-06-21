import { useEffect, useState } from "react";
import {
  FaUsers,
  FaTasks,
  FaCheckCircle,
  FaClock,
  FaFolderOpen,
} from "react-icons/fa";
import { apiUrl } from "../api";

function Dashboard() {
  const [tareas, setTareas] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [proyectos, setProyectos] = useState([]);

  useEffect(() => {
    cargarDatos();
  }, []);

  // Carga los tres recursos para calcular metricas cruzadas del panel.
  const cargarDatos = async () => {
    try {
      const resTareas = await fetch(apiUrl("/tareas"));
      const dataTareas = await resTareas.json();

      const resClientes = await fetch(apiUrl("/clientes"));
      const dataClientes = await resClientes.json();

      const resProyectos = await fetch(apiUrl("/proyectos"));
      const dataProyectos = await resProyectos.json();

      setTareas(dataTareas);
      setClientes(dataClientes);
      setProyectos(dataProyectos);
    } catch (error) {
      console.error(error);
    }
  };

  // Metricas derivadas: no se guardan, se calculan desde el estado actual.
  const totalTareas = tareas.length;
  const tareasCompletadas = tareas.filter((tarea) => tarea.completada).length;
  const tareasPendientes = totalTareas - tareasCompletadas;
  const totalClientes = clientes.length;
  const totalProyectos = proyectos.length;

  const ultimosClientes = clientes.slice(-3).reverse();
  const ultimasTareas = tareas.slice(-3).reverse();

  return (
    <div>
      <h1>Dashboard</h1>

      <div className="dashboard-grid">
        <div className="stat-card stat-blue">
          <div className="stat-icon">
            <FaUsers />
          </div>
          <span>Clientes</span>
          <strong>{totalClientes}</strong>
        </div>

        <div className="stat-card stat-purple">
          <div className="stat-icon">
            <FaFolderOpen />
          </div>
          <span>Proyectos</span>
          <strong>{totalProyectos}</strong>
        </div>

        <div className="stat-card stat-purple">
          <div className="stat-icon">
            <FaTasks />
          </div>
          <span>Tareas</span>
          <strong>{totalTareas}</strong>
        </div>

        <div className="stat-card stat-green">
          <div className="stat-icon">
            <FaCheckCircle />
          </div>
          <span>Completadas</span>
          <strong>{tareasCompletadas}</strong>
        </div>

        <div className="stat-card stat-orange">
          <div className="stat-icon">
            <FaClock />
          </div>
          <span>Pendientes</span>
          <strong>{tareasPendientes}</strong>
        </div>
      </div>

      <div className="dashboard-sections">
        <section className="panel-card">
          <h2>Ultimos clientes</h2>

          {ultimosClientes.length === 0 ? (
            <p>No hay clientes registrados.</p>
          ) : (
            ultimosClientes.map((cliente) => (
              <div className="list-item" key={cliente.id}>
                <div>
                  <strong>{cliente.nombre}</strong>
                  <p>{cliente.proyecto}</p>
                </div>

                <span>{cliente.estado}</span>
              </div>
            ))
          )}
        </section>

        <section className="panel-card">
          <h2>Ultimas tareas</h2>

          {ultimasTareas.length === 0 ? (
            <p>No hay tareas registradas.</p>
          ) : (
            ultimasTareas.map((tarea) => (
              <div className="list-item" key={tarea.id}>
                <div>
                  <strong>{tarea.texto}</strong>
                  <p>{tarea.completada ? "Completada" : "Pendiente"}</p>
                </div>

                <span>{tarea.completada ? "Completada" : "Pendiente"}</span>
              </div>
            ))
          )}
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
