import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import Clients from "./pages/Clients";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/tareas" element={<Tasks />} />
          <Route path="/clientes" element={<Clients />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;