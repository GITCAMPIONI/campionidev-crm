# CampioniDev CRM

CRM de demostracion para gestionar clientes, proyectos y tareas de CampioniDev. El proyecto esta pensado como una base de portfolio y aprendizaje: muestra un flujo completo con frontend React, backend Express y persistencia simple en archivos JSON.

> Estado del proyecto: en desarrollo. Todavia no esta preparado para usarse como CRM publico o con datos reales sin agregar autenticacion, validacion fuerte y una base de datos real.

## Que incluye

- Dashboard con metricas generales de clientes, proyectos y tareas.
- CRUD de clientes: crear, editar, eliminar, buscar y abrir detalle.
- CRUD de proyectos asociados a clientes.
- CRUD de tareas asociadas a cliente y proyecto.
- Cambio de estado de tareas completadas/pendientes.
- Vista de detalle de cliente con tareas asociadas.
- API REST simple en Node.js y Express.
- Frontend en React con Vite y React Router.

## Stack tecnico

### Frontend

- React
- Vite
- React Router DOM
- React Icons
- CSS custom con variables globales

### Backend

- Node.js
- Express
- CORS
- Persistencia temporal en JSON local

## Estructura del repositorio

```text
.
├── backend/
│   ├── server.js          # API Express y rutas REST
│   ├── clientes.json      # Datos locales de clientes
│   ├── proyectos.json     # Datos locales de proyectos
│   ├── tareas.json        # Datos locales de tareas
│   └── package.json
└── campionidev-panel/
    ├── src/
    │   ├── api.js         # Helper para construir URLs de API
    │   ├── App.jsx        # Rutas principales del frontend
    │   ├── components/    # Layout, sidebar, header y tarjetas
    │   └── pages/         # Dashboard, clientes, proyectos y tareas
    └── package.json
```

## Instalacion local

Necesitas Node.js instalado.

### 1. Clonar el repositorio

```bash
git clone https://github.com/GITCAMPIONI/campionidev-crm.git
cd campionidev-crm
```

### 2. Instalar y ejecutar backend

```bash
cd backend
npm install
npm run dev
```

El backend queda disponible en:

```text
http://localhost:3000
```

### 3. Instalar y ejecutar frontend

En otra terminal:

```bash
cd campionidev-panel
npm install
npm run dev
```

Vite mostrara la URL local, normalmente:

```text
http://localhost:5173
```

## Configuracion de API

El frontend usa por defecto:

```text
http://localhost:3000
```

Puedes cambiarlo creando un archivo `.env` dentro de `campionidev-panel/`:

```env
VITE_API_URL=http://localhost:3000
```

## Endpoints disponibles

### Clientes

| Metodo | Ruta | Descripcion |
| --- | --- | --- |
| GET | `/clientes` | Lista todos los clientes |
| POST | `/clientes` | Crea un cliente |
| PUT | `/clientes/:id` | Actualiza un cliente |
| DELETE | `/clientes/:id` | Elimina un cliente |

### Proyectos

| Metodo | Ruta | Descripcion |
| --- | --- | --- |
| GET | `/proyectos` | Lista todos los proyectos |
| POST | `/proyectos` | Crea un proyecto asociado a un cliente |
| DELETE | `/proyectos/:id` | Elimina un proyecto |

### Tareas

| Metodo | Ruta | Descripcion |
| --- | --- | --- |
| GET | `/tareas` | Lista todas las tareas |
| POST | `/tareas` | Crea una tarea asociada a cliente y proyecto |
| PUT | `/tareas/:id` | Actualiza texto, estado y relaciones de una tarea |
| DELETE | `/tareas/:id` | Elimina una tarea |

## Modelo de datos

### Cliente

```json
{
  "id": 1781711973807,
  "nombre": "Cliente Demo",
  "email": "cliente@demo.com",
  "proyecto": "Web corporativa",
  "estado": "Pendiente"
}
```

### Proyecto

```json
{
  "id": 1781800604169,
  "clienteId": 1781711973807,
  "nombre": "Sitio web",
  "estado": "En desarrollo",
  "fechaInicio": "2026-06-20"
}
```

### Tarea

```json
{
  "id": 1781800648216,
  "texto": "Preparar estructura React",
  "completada": false,
  "clienteId": 1781711973807,
  "proyectoId": 1781800604169
}
```

## Seguridad y limitaciones actuales

Este proyecto no debe exponerse como CRM publico con datos reales todavia.

Puntos pendientes antes de produccion:

- No tiene autenticacion ni usuarios.
- Cualquier persona con acceso a la API podria crear, editar o eliminar datos.
- CORS esta abierto para facilitar desarrollo local.
- La persistencia en JSON es util para demo, pero no reemplaza una base de datos.
- No hay validacion completa de payloads.
- No hay permisos por rol ni auditoria de cambios.
- No hay rate limiting ni proteccion especifica contra abuso de API.

## Uso recomendado como portfolio

Para mostrarlo en campionidev.com, lo mas seguro por ahora es usarlo como demo visual:

- Capturas de pantalla del dashboard, clientes, proyectos y tareas.
- Video corto del flujo de uso.
- Link al repositorio.
- Descripcion clara indicando que es un CRM en desarrollo.

Si se quiere publicar una demo interactiva, conviene hacerla con datos falsos, modo read-only o datos que se reseteen automaticamente.

## Mejoras futuras

- Login y autenticacion.
- Base de datos real como PostgreSQL, Supabase o MongoDB.
- Validacion de datos con un schema.
- Roles y permisos.
- Busqueda y filtros avanzados.
- Prioridad de tareas.
- Vista de tareas tipo lista/tabla.
- Tests automatizados.
- Deploy separado de frontend y backend.
- Documentacion de variables de entorno.

## Scripts utiles

### Backend

```bash
cd backend
npm run dev
npm start
```

### Frontend

```bash
cd campionidev-panel
npm run dev
npm run build
npm run lint
npm run preview
```

## Autor

Proyecto desarrollado por CampioniDev como demo de CRM full stack en desarrollo.
