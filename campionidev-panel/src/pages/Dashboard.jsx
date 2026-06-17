import { useEffect, useState } from "react";

function Dashboard() {
  const [tareas, setTareas] = useState([]);
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      const respuestaTareas = await fetch("http://localhost:3000/tareas");
      const datosTareas = await respuestaTareas.json();

      const respuestaClientes = await fetch("http://localhost:3000/clientes");
      const datosClientes = await respuestaClientes.json();

      setTareas(datosTareas);
      setClientes(datosClientes);
    } catch (error) {
      console.error(error);
    }
  };

  const totalTareas = tareas.length;
  const completadas = tareas.filter((tarea) => tarea.completada).length;
  const pendientes = totalTareas - completadas;
  const totalClientes = clientes.length;

  return (
    <div>
      <h1>Dashboard</h1>

      <div className="dashboard-grid">
        <div className="stat-card">
          <span>Total tareas</span>
          <strong>{totalTareas}</strong>
        </div>

        <div className="stat-card">
          <span>Completadas</span>
          <strong>{completadas}</strong>
        </div>

        <div className="stat-card">
          <span>Pendientes</span>
          <strong>{pendientes}</strong>
        </div>

        <div className="stat-card">
          <span>Clientes</span>
          <strong>{totalClientes}</strong>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;