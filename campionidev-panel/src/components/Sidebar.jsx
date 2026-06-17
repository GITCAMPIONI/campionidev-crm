import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">
      <h3>Menú</h3>

      <nav>
        <NavLink to="/">Dashboard</NavLink>
        <NavLink to="/tareas">Tareas</NavLink>
        <NavLink to="/clientes">Clientes</NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;