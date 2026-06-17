function TaskCard({ tarea, eliminarTarea, cambiarEstado }) {
    return (
        <div>
            <input
                type="checkbox"
                checked={tarea.completada}
                onChange={() => cambiarEstado(tarea.id)}
            />

            <span
                style={{
                    textDecoration: tarea.completada
                        ? "line-through"
                        : "none",
                    marginLeft: "8px",
                }}
            >
                {tarea.texto}
            </span>

            <button
                onClick={() => eliminarTarea(tarea.id)}
                style={{ marginLeft: "10px" }}
            >
                Eliminar
            </button>
        </div>
    );
}

export default TaskCard;