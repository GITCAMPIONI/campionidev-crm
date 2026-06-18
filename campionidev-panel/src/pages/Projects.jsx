import { useEffect, useState } from "react";

function Projects() {
    const [proyectos, setProyectos] = useState([]);
    const [clientes, setClientes] = useState([]);

    const [formulario, setFormulario] = useState({
        nombre: "",
        clienteId: "",
        estado: "Pendiente",
        fechaInicio: "",
    });

    useEffect(() => {
        cargarDatos();
    }, []);

    const cargarDatos = async () => {
        try {
            const resProyectos = await fetch("http://localhost:3000/proyectos");
            const dataProyectos = await resProyectos.json();

            const resClientes = await fetch("http://localhost:3000/clientes");
            const dataClientes = await resClientes.json();

            setProyectos(dataProyectos);
            setClientes(dataClientes);
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

    const agregarProyecto = async (e) => {
        e.preventDefault();

        try {
            const respuesta = await fetch("http://localhost:3000/proyectos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formulario),
            });

            const proyectoCreado = await respuesta.json();

            setProyectos([...proyectos, proyectoCreado]);

            setFormulario({
                nombre: "",
                clienteId: "",
                estado: "Pendiente",
                fechaInicio: "",
            });
        } catch (error) {
            console.error(error);
        }
    };

    const eliminarProyecto = async (id) => {
        try {
            await fetch(`http://localhost:3000/proyectos/${id}`, {
                method: "DELETE",
            });

            setProyectos(
                proyectos.filter((proyecto) => proyecto.id !== id)
            );
        } catch (error) {
            console.error(error);
        }
    };

    const obtenerNombreCliente = (clienteId) => {
        const cliente = clientes.find(
            (cliente) => cliente.id === clienteId
        );

        return cliente ? cliente.nombre : "Sin cliente";
    };

    return (
        <div>
            <h1>Proyectos</h1>

            <form onSubmit={agregarProyecto} className="form-card">
                <input
                    type="text"
                    name="nombre"
                    placeholder="Nombre del proyecto"
                    value={formulario.nombre}
                    onChange={manejarCambio}
                />

                <select
                    name="clienteId"
                    value={formulario.clienteId}
                    onChange={manejarCambio}
                >
                    <option value="">
                        Selecciona un cliente
                    </option>

                    {clientes.map((cliente) => (
                        <option
                            key={cliente.id}
                            value={cliente.id}
                        >
                            {cliente.nombre}
                        </option>
                    ))}
                </select>

                <select
                    name="estado"
                    value={formulario.estado}
                    onChange={manejarCambio}
                >
                    <option value="Pendiente">
                        Pendiente
                    </option>

                    <option value="En desarrollo">
                        En desarrollo
                    </option>

                    <option value="Finalizado">
                        Finalizado
                    </option>
                </select>

                <input
                    type="date"
                    name="fechaInicio"
                    value={formulario.fechaInicio}
                    onChange={manejarCambio}
                />

                <button type="submit">
                    Crear proyecto
                </button>
            </form>

            <div className="cards-grid">
                {proyectos.map((proyecto) => (
                    <div
                        className="client-card"
                        key={proyecto.id}
                    >
                        <h3>{proyecto.nombre}</h3>

                        <p>
                            Cliente:{" "}
                            {obtenerNombreCliente(
                                Number(proyecto.clienteId)
                            )}
                        </p>

                        <p>
                            Estado: {proyecto.estado}
                        </p>

                        <p>
                            Inicio: {proyecto.fechaInicio}
                        </p>

                        <button
                            onClick={() =>
                                eliminarProyecto(proyecto.id)
                            }
                        >
                            Eliminar
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Projects;