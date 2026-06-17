const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

const tareasPath = path.join(__dirname, "tareas.json");

function leerTareas() {
  if (!fs.existsSync(tareasPath)) {
    fs.writeFileSync(tareasPath, "[]");
  }

  const data = fs.readFileSync(tareasPath, "utf-8");
  return JSON.parse(data);
}

function guardarTareas(tareas) {
  fs.writeFileSync(tareasPath, JSON.stringify(tareas, null, 2));
}

app.get("/tareas", (req, res) => {
  const tareas = leerTareas();
  res.json(tareas);
});

app.post("/tareas", (req, res) => {
  const tareas = leerTareas();

  const nuevaTarea = {
    id: Date.now(),
    texto: req.body.texto,
    completada: false,
  };

  tareas.push(nuevaTarea);
  guardarTareas(tareas);

  res.status(201).json(nuevaTarea);
});
app.delete("/tareas/:id", (req, res) => {
  const tareas = leerTareas();
  const id = Number(req.params.id);

  const nuevasTareas = tareas.filter((tarea) => tarea.id !== id);

  guardarTareas(nuevasTareas);

  res.json({ mensaje: "Tarea eliminada" });
});

app.put("/tareas/:id", (req, res) => {
  const tareas = leerTareas();
  const id = Number(req.params.id);

  const tareasActualizadas = tareas.map((tarea) => {
    if (tarea.id === id) {
      return {
        ...tarea,
        completada: req.body.completada,
      };
    }

    return tarea;
  });

  guardarTareas(tareasActualizadas);

  res.json({ mensaje: "Tarea actualizada" });
});

app.listen(3000, () => {
  console.log("Servidor iniciado en http://localhost:3000");
});
app.listen(3000, () => {
  console.log("Servidor iniciado en http://localhost:3000");
});
app.put("/tareas/:id", (req, res) => {
  const tareas = leerTareas();
  const id = Number(req.params.id);

  const tareasActualizadas = tareas.map((tarea) => {
    if (tarea.id === id) {
      return {
        ...tarea,
        completada: req.body.completada,
      };
    }

    return tarea;
  });

  guardarTareas(tareasActualizadas);

  res.json({
    mensaje: "Tarea actualizada",
  });
});
