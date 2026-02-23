import { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import PrivateRoute from './components/PrivateRoute';
import SidebarLayout from './components/SidebarLayout'; // El layout que creamos al principio

import Login from './pages/Login';
import Register from './pages/Register';
import Materias from './pages/Materias';
import Home from './pages/Home';
import Progreso from './pages/Progreso';

function App() {
  const { token } = useContext(AuthContext);

  return (
    // Quitamos el bg-gray-100 y usamos el color profundo de nuestra nueva estética
    <div className="min-h-screen bg-slate-950">
      <Routes>
        {/* Rutas Públicas: No llevan Sidebar */}
        <Route path="/login" element={!token ? <Login /> : <Navigate to="/" />} />
        <Route path="/register" element={!token ? <Register /> : <Navigate to="/" />} />

        {/* Rutas Privadas: Todas envueltas en el SidebarLayout */}
        <Route element={<PrivateRoute />}>
          <Route
            path="/*"
            element={
              <SidebarLayout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/progreso" element={<Progreso />} />
                  <Route path="/materias" element={<Materias />} />
                  {/* Redirección por si entra a una sub-ruta inexistente estando logueado */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </SidebarLayout>
            }
          />
        </Route>

        {/* Redirección global si no está logueado */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  );
}

export default App;