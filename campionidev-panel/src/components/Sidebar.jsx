import { NavLink } from "react-router-dom";
import { FaUsers, FaTasks } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import logo from "../assets/campionidev_icon.png";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <img
          src={logo}
          alt="CampioniDev"
          className="brand-logo"
        />

        <div>
          <h2>CampioniDev</h2>
          <p>CRM Panel</p>
        </div>
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/">
          <MdDashboard />
          Dashboard
        </NavLink>

        <NavLink to="/clientes">
          <FaUsers />
          Clientes
        </NavLink>

        <NavLink to="/tareas">
          <FaTasks />
          Tareas
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <small>Versión 0.1</small>
        <small>React + Node.js</small>
      </div>
    </aside>
  );
}

export default Sidebar;