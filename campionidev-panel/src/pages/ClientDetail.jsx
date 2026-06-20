import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { apiUrl } from "../api";

function ClientDetail() {
  const { id } = useParams();

  const [cliente, setCliente] = useState(null);
  const [tareas, setTareas] = useState([]);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      const respuestaClientes = await fetch(apiUrl("/clientes"));
      const clientes = await respuestaClientes.json();

      const clienteEncontrado = clientes.find(
        (cliente) => cliente.id === Number(id)
      );

      setCliente(clienteEncontrado);

      const respuestaTareas = await fetch(apiUrl("/tareas"));
      const tareasData = await respuestaTareas.json();

      const tareasDelCliente = tareasData.filter(
        (tarea) => tarea.clienteId === Number(id)
      );

      setTareas(tareasDelCliente);
    } catch (error) {
      console.error(error);
    }
  };

  if (!cliente) {
    return <p>Cargando cliente...</p>;
  }

  return (
    <div>
      <Link to="/clientes">← Volver a clientes</Link>

      <h1>{cliente.nombre}</h1>
      <p>{cliente.email}</p>
      <h3>{cliente.proyecto}</h3>

      <hr />

      <h2>Tareas asociadas</h2>

      {tareas.length === 0 ? (
        <p>Este cliente todavía no tiene tareas asociadas.</p>
      ) : (
        tareas.map((tarea) => (
          <div className="task-row" key={tarea.id}>
            <span>{tarea.completada ? "✅" : "⬜"}</span>
            <span>{tarea.texto}</span>
          </div>
        ))
      )}
    </div>
  );
}

export default ClientDetail;
