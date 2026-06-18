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

const clientesPath = path.join(__dirname, "clientes.json");

function leerClientes() {
  if (!fs.existsSync(clientesPath)) {
    fs.writeFileSync(clientesPath, "[]");
  }

  const data = fs.readFileSync(clientesPath, "utf-8");
  return JSON.parse(data);
}

function guardarClientes(clientes) {
  fs.writeFileSync(clientesPath, JSON.stringify(clientes, null, 2));
}

const proyectosPath = path.join(__dirname, "proyectos.json");

function leerProyectos() {
  if (!fs.existsSync(proyectosPath)) {
    fs.writeFileSync(proyectosPath, "[]");
  }

  const data = fs.readFileSync(proyectosPath, "utf-8");
  return JSON.parse(data);
}

function guardarProyectos(proyectos) {
  fs.writeFileSync(proyectosPath, JSON.stringify(proyectos, null, 2));
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
    clienteId: Number(req.body.clienteId),
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
        texto: req.body.texto,
        clienteId: Number(req.body.clienteId),
        completada: req.body.completada,
      };
    }

    return tarea;
  });

  guardarTareas(tareasActualizadas);

  res.json({ mensaje: "Tarea actualizada" });
});

app.get("/clientes", (req, res) => {
  const clientes = leerClientes();
  res.json(clientes);
});

app.post("/clientes", (req, res) => {
  const clientes = leerClientes();

  const nuevoCliente = {
    id: Date.now(),
    nombre: req.body.nombre,
    email: req.body.email,
    proyecto: req.body.proyecto,
    estado: req.body.estado,
  };

  clientes.push(nuevoCliente);
  guardarClientes(clientes);

  res.status(201).json(nuevoCliente);
});

app.delete("/clientes/:id", (req, res) => {
  const clientes = leerClientes();
  const id = Number(req.params.id);

  const nuevosClientes = clientes.filter((cliente) => cliente.id !== id);

  guardarClientes(nuevosClientes);

  res.json({ mensaje: "Cliente eliminado" });
});



app.put("/clientes/:id", (req, res) => {
  const clientes = leerClientes();
  const id = Number(req.params.id);

  const clientesActualizados = clientes.map((cliente) => {
    if (cliente.id === id) {
      return {
        ...cliente,
        nombre: req.body.nombre,
        email: req.body.email,
        proyecto: req.body.proyecto,
        estado: req.body.estado,
      };
    }

    return cliente;
  });

  guardarClientes(clientesActualizados);

  const proyectosPath = path.join(__dirname, "proyectos.json");

  function leerProyectos() {
    if (!fs.existsSync(proyectosPath)) {
      fs.writeFileSync(proyectosPath, "[]");
    }

    const data = fs.readFileSync(proyectosPath, "utf-8");
    return JSON.parse(data);
  }

  function guardarProyectos(proyectos) {
    fs.writeFileSync(proyectosPath, JSON.stringify(proyectos, null, 2));
  }

  res.json({ mensaje: "Cliente actualizado" });
});

app.get("/proyectos", (req, res) => {
  const proyectos = leerProyectos();
  res.json(proyectos);
});

app.post("/proyectos", (req, res) => {
  const proyectos = leerProyectos();

  const nuevoProyecto = {
    id: Date.now(),
    clienteId: Number(req.body.clienteId),
    nombre: req.body.nombre,
    estado: req.body.estado,
    fechaInicio: req.body.fechaInicio,
  };

  proyectos.push(nuevoProyecto);
  guardarProyectos(proyectos);

  res.status(201).json(nuevoProyecto);
});

app.delete("/proyectos/:id", (req, res) => {
  const proyectos = leerProyectos();
  const id = Number(req.params.id);

  const nuevosProyectos = proyectos.filter((proyecto) => proyecto.id !== id);

  guardarProyectos(nuevosProyectos);

  res.json({ mensaje: "Proyecto eliminado" });
});

app.listen(3000, () => {
  console.log("Servidor iniciado en http://localhost:3000");
});

