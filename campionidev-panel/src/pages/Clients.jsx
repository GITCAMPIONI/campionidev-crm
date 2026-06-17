import { useEffect, useState } from "react";

function Clients() {
  const [clientes, setClientes] = useState([]);
  const [formulario, setFormulario] = useState({
    nombre: "",
    email: "",
    proyecto: "",
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
      const respuesta = await fetch("http://localhost:3000/clientes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formulario),
      });

      const clienteCreado = await respuesta.json();

      setClientes([...clientes, clienteCreado]);

      setFormulario({
        nombre: "",
        email: "",
        proyecto: "",
      });
    } catch (error) {
      console.error(error);
    }
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

        <button type="submit">Añadir cliente</button>
      </form>

      <div className="cards-grid">
        {clientes.map((cliente) => (
          <div className="client-card" key={cliente.id}>
            <h3>{cliente.nombre}</h3>
            <p>{cliente.email}</p>
            <span>{cliente.proyecto}</span>

            <button onClick={() => eliminarCliente(cliente.id)}>
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Clients;