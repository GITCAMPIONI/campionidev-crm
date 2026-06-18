import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Clients() {
  const [busqueda, setBusqueda] = useState("");
  const [clientes, setClientes] = useState([]);
  const [editandoId, setEditandoId] = useState(null);

  const [formulario, setFormulario] = useState({
    nombre: "",
    email: "",
    proyecto: "",
    estado: "Pendiente",
  });

  useEffect(() => {
    cargarClientes();
  }, []);

  const cargarClientes = async () => {
    try {
      const respuesta = await fetch("http://localhost:3000/clientes");
      const datos = await respuesta.json();
      setClientes(datos);
    } catch (error) {
      console.error(error);
    }
  };

  const manejarCambio = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value,
    });
  };

  const agregarCliente = async (e) => {
    e.preventDefault();

    if (
      formulario.nombre.trim() === "" ||
      formulario.email.trim() === "" ||
      formulario.proyecto.trim() === ""
    ) {
      return;
    }

    try {
      if (editandoId) {
        await fetch(`http://localhost:3000/clientes/${editandoId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formulario),
        });

        await cargarClientes();
        setEditandoId(null);
      } else {
        const respuesta = await fetch("http://localhost:3000/clientes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formulario),
        });

        const clienteCreado = await respuesta.json();
        setClientes([...clientes, clienteCreado]);
      }

      setFormulario({
        nombre: "",
        email: "",
        proyecto: "",
        estado: "Pendiente",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const cancelarEdicion = () => {
    setEditandoId(null);
    setFormulario({
      nombre: "",
      email: "",
      proyecto: "",
      estado: "Pendiente",
    });
  };

  const eliminarCliente = async (id) => {
    try {
      await fetch(`http://localhost:3000/clientes/${id}`, {
        method: "DELETE",
      });

      const nuevosClientes = clientes.filter((cliente) => cliente.id !== id);
      setClientes(nuevosClientes);
    } catch (error) {
      console.error(error);
    }
  };

  const clientesFiltrados = clientes.filter(
    (cliente) =>
      cliente.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      cliente.email.toLowerCase().includes(busqueda.toLowerCase()) ||
      cliente.proyecto.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div>
      <h1>Clientes</h1>

      <form onSubmit={agregarCliente} className="form-card">
        <input
          type="text"
          name="nombre"
          placeholder="Nombre del cliente"
          value={formulario.nombre}
          onChange={manejarCambio}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formulario.email}
          onChange={manejarCambio}
        />

        <input
          type="text"
          name="proyecto"
          placeholder="Tipo de proyecto"
          value={formulario.proyecto}
          onChange={manejarCambio}
        />

        <select
          name="estado"
          value={formulario.estado}
          onChange={manejarCambio}
        >
          <option value="Pendiente">Pendiente</option>
          <option value="En desarrollo">En desarrollo</option>
          <option value="Finalizado">Finalizado</option>
        </select>

        <button type="submit">
          {editandoId ? "Guardar cambios" : "Añadir cliente"}
        </button>

        {editandoId && (
          <button type="button" onClick={cancelarEdicion}>
            Cancelar edición
          </button>
        )}
      </form>

      <input
        type="text"
        placeholder="Buscar cliente..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        style={{ marginBottom: "20px" }}
      />

      <div className="cards-grid">
        {clientesFiltrados.map((cliente) => (
          <div className="client-card" key={cliente.id}>
            <div className="client-card-header">
              <h3>{cliente.nombre}</h3>

              <span
                className={`status-badge ${(cliente.estado || "Pendiente")
                  .replace(" ", "-")
                  .toLowerCase()}`}
              >
                {cliente.estado || "Pendiente"}
              </span>
            </div>

            <p>{cliente.email}</p>

            <div className="client-project">{cliente.proyecto}</div>

            <div className="client-actions">
              <Link to={`/clientes/${cliente.id}`} className="btn-link">
                Ver detalle
              </Link>

              <button
                type="button"
                onClick={() => {
                  setEditandoId(cliente.id);
                  setFormulario({
                    nombre: cliente.nombre,
                    email: cliente.email,
                    proyecto: cliente.proyecto,
                    estado: cliente.estado || "Pendiente",
                  });
                }}
              >
                Editar
              </button>

              <button onClick={() => eliminarCliente(cliente.id)}>
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Clients;