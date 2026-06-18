import { NavLink } from "react-router-dom";
import { FaUsers, FaTasks } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import logo from "../assets/campionidev_icon.png";
import { FaFolderOpen } from "react-icons/fa";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand brand-vertical">
        <img src={logo} alt="CampioniDev" className="brand-logo-large" />

        <h2>CampioniDev</h2>
        <p>CRM PANEL</p>
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

        <NavLink to="/proyectos">
          <FaFolderOpen />
          Proyectos
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;