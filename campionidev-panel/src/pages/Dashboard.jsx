import { useEffect, useState } from "react";

function Dashboard() {
  const [tareas, setTareas] = useState([]);
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      const resTareas = await fetch("http://localhost:3000/tareas");
      const dataTareas = await resTareas.json();

      const resClientes = await fetch("http://localhost:3000/clientes");
      const dataClientes = await resClientes.json();

      setTareas(dataTareas);
      setClientes(dataClientes);
    } catch (error) {
      console.error(error);
    }
  };

  const totalTareas = tareas.length;
  const tareasCompletadas = tareas.filter((tarea) => tarea.completada).length;
  const tareasPendientes = totalTareas - tareasCompletadas;
  const totalClientes = clientes.length;

  const ultimosClientes = clientes.slice(-3).reverse();
  const ultimasTareas = tareas.slice(-3).reverse();

  return (
    <div>
      <h1>Dashboard</h1>

      <div className="dashboard-grid">
        <div className="stat-card">
          <span>Clientes</span>
          <strong>{totalClientes}</strong>
        </div>

        <div className="stat-card">
          <span>Tareas</span>
          <strong>{totalTareas}</strong>
        </div>

        <div className="stat-card">
          <span>Completadas</span>
          <strong>{tareasCompletadas}</strong>
        </div>

        <div className="stat-card">
          <span>Pendientes</span>
          <strong>{tareasPendientes}</strong>
        </div>
      </div>

      <div className="dashboard-sections">
        <section className="panel-card">
          <h2>Últimos clientes</h2>

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
          <h2>Últimas tareas</h2>

          {ultimasTareas.length === 0 ? (
            <p>No hay tareas registradas.</p>
          ) : (
            ultimasTareas.map((tarea) => (
              <div className="list-item" key={tarea.id}>
                <div>
                  <strong>{tarea.texto}</strong>
                  <p>{tarea.completada ? "Completada" : "Pendiente"}</p>
                </div>

                <span>{tarea.completada ? "✅" : "⏳"}</span>
              </div>
            ))
          )}
        </section>
      </div>
    </div>
  );
}

export default Dashboard;