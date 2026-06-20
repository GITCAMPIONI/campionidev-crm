import { useState, useEffect } from "react";
import TaskCard from "../components/TaskCard";
import { apiUrl } from "../api";

function Tasks() {
  const [tareas, setTareas] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  const [nuevaTarea, setNuevaTarea] = useState("");
  const [clienteId, setClienteId] = useState("");
  const [proyectos, setProyectos] = useState([]);
  const [proyectoId, setProyectoId] = useState("");

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      const respuestaTareas = await fetch(apiUrl("/tareas"));
      const datosTareas = await respuestaTareas.json();

      const respuestaClientes = await fetch(apiUrl("/clientes"));
      const datosClientes = await respuestaClientes.json();

      const respuestaProyectos = await fetch(apiUrl("/proyectos"));
      const datosProyectos = await respuestaProyectos.json();
      setProyectos(datosProyectos);

      setTareas(datosTareas);
      setClientes(datosClientes);
    } catch (error) {
      console.error(error);
    }
  };

  const agregarTarea = async () => {
    if (nuevaTarea.trim() === "" || clienteId === "" || proyectoId === "") return;

    try {
      if (editandoId) {
        const tareaOriginal = tareas.find((tarea) => tarea.id === editandoId);

        await fetch(apiUrl(`/tareas/${editandoId}`), {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            texto: nuevaTarea,
            clienteId: Number(clienteId),
            proyectoId: Number(proyectoId),
            completada: tareaOriginal.completada,
          }),
        });

        await cargarDatos();
        setEditandoId(null);
      } else {
        const respuesta = await fetch(apiUrl("/tareas"), {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            texto: nuevaTarea,
            clienteId: Number(clienteId),
            proyectoId: Number(proyectoId),
          }),
        });

        const tareaCreada = await respuesta.json();
        setTareas([...tareas, tareaCreada]);
      }

      setNuevaTarea("");
      setClienteId("");
      setProyectoId("");
    } catch (error) {
      console.error(error);
    }
  };

  const eliminarTarea = async (id) => {
    try {
      await fetch(apiUrl(`/tareas/${id}`), {
        method: "DELETE",
      });

      setTareas(tareas.filter((tarea) => tarea.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const cambiarEstado = async (id) => {
    const tarea = tareas.find((tarea) => tarea.id === id);
    const nuevoEstado = !tarea.completada;

    try {
      await fetch(apiUrl(`/tareas/${id}`), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          texto: tarea.texto,
          clienteId: Number(tarea.clienteId),
          proyectoId: Number(tarea.proyectoId),
          completada: nuevoEstado,
        }),
      });

      setTareas(
        tareas.map((tarea) =>
          tarea.id === id ? { ...tarea, completada: nuevoEstado } : tarea
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const obtenerNombreCliente = (id) => {
    const cliente = clientes.find((cliente) => cliente.id === id);
    return cliente ? cliente.nombre : "Sin cliente";
  };

  return (
    <div>
      <h1>Mis tareas</h1>

      <div className="form-card">
        <select
          value={clienteId}
          onChange={(e) => {
            setClienteId(e.target.value);
            setProyectoId("");
          }}
        >
          <option value="">Selecciona un cliente</option>

          {clientes.map((cliente) => (
            <option key={cliente.id} value={cliente.id}>
              {cliente.nombre}
            </option>
          ))}
        </select>

        <select
          value={proyectoId}
          onChange={(e) => setProyectoId(e.target.value)}
        >
          <option value="">Selecciona un proyecto</option>

          {proyectos.map((proyecto) => (
            <option key={proyecto.id} value={proyecto.id}>
              {proyecto.nombre} - Cliente ID: {proyecto.clienteId}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Nueva tarea"
          value={nuevaTarea}
          onChange={(e) => setNuevaTarea(e.target.value)}
        />

        <button onClick={agregarTarea}>
          {editandoId ? "Guardar cambios" : "Añadir tarea"}
        </button>
      </div>

      <hr />

      {tareas.map((tarea) => (
        <div key={tarea.id}>
          <small>Cliente: {obtenerNombreCliente(tarea.clienteId)}</small>

          <TaskCard
            tarea={tarea}
            eliminarTarea={eliminarTarea}
            cambiarEstado={cambiarEstado}
          />
          <button
            type="button"
            onClick={() => {
              setEditandoId(tarea.id);
              setNuevaTarea(tarea.texto);
              setClienteId(String(tarea.clienteId));
              setProyectoId(String(tarea.proyectoId));
            }}
          >
            Editar
          </button>
        </div>
      ))}
    </div>
  );
}

export default Tasks;
