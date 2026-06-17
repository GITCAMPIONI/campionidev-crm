import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import Clients from "./pages/Clients";
import ClientDetail from "./pages/ClientDetail";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/tareas" element={<Tasks />} />
          <Route path="/clientes" element={<Clients />} />
          <Route path="/clientes/:id" element={<ClientDetail />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;