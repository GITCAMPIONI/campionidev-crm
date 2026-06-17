import { useState, useEffect } from "react";
import TaskCard from "../components/TaskCard";

function Tasks() {
    const [tareas, setTareas] = useState([]);
    const [nuevaTarea, setNuevaTarea] = useState("");

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

    const agregarTarea = async () => {
        if (nuevaTarea.trim() === "") return;

        try {
            const respuesta = await fetch("http://localhost:3000/tareas", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    texto: nuevaTarea,
                }),
            });

            const tareaCreada = await respuesta.json();

            setTareas([...tareas, tareaCreada]);
            setNuevaTarea("");
        } catch (error) {
            console.error(error);
        }
    };

    const eliminarTarea = async (id) => {
        try {
            await fetch(`http://localhost:3000/tareas/${id}`, {
                method: "DELETE",
            });

            const nuevasTareas = tareas.filter((tarea) => tarea.id !== id);
            setTareas(nuevasTareas);
        } catch (error) {
            console.error(error);
        }
    };

    const cambiarEstado = async (id) => {
        const tarea = tareas.find(
            (tarea) => tarea.id === id
        );

        const nuevoEstado = !tarea.completada;

        try {
            await fetch(
                `http://localhost:3000/tareas/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        completada: nuevoEstado,
                    }),
                }
            );

            const tareasActualizadas = tareas.map(
                (tarea) => {
                    if (tarea.id === id) {
                        return {
                            ...tarea,
                            completada: nuevoEstado,
                        };
                    }

                    return tarea;
                }
            );

            setTareas(tareasActualizadas);
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div>
            <h1>Mis tareas</h1>

            <input
                type="text"
                placeholder="Nueva tarea"
                value={nuevaTarea}
                onChange={(e) => setNuevaTarea(e.target.value)}
            />

            <button onClick={agregarTarea}>Añadir tarea</button>

            <hr />

            {tareas.map((tarea) => (
                <TaskCard
                    key={tarea.id}
                    tarea={tarea}
                    eliminarTarea={eliminarTarea}
                    cambiarEstado={cambiarEstado}
                />
            ))}
        </div>
    );
}

export default Tasks;