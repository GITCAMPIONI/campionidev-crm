import { useEffect, useState } from "react";

function Dashboard() {
  const [tareas, setTareas] = useState([]);

  useEffect(() => {
    cargarTareas();
  }, []);

  const cargarTareas = async () => {
    try {
      const respuesta = await fetch("http://localhost:3000/tareas");
      const datos = await respuesta.json();

      setTareas(datos);
    } catch (error) {
      console.error(error);
    }
  };

  const total = tareas.length;

  const completadas = tareas.filter((tarea) => tarea.completada).length;

  const pendientes = total - completadas;

  return (
    <div>
      <h1>Dashboard</h1>

      <h3>Total tareas: {total}</h3>
      <h3>Completadas: {completadas}</h3>
      <h3>Pendientes: {pendientes}</h3>
    </div>
  );
}

export default Dashboard;