import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Form from './pages/Form';
import PedidosUsers from './pages/PedidosUsers';
import NavBar from './pages/NavBar';
import Admin from './pages/Admin';


// ========================================
// PROTEÇÃO DA ÁREA ADMINISTRATIVA
// ========================================

function RotaAdmin({ children }) {

  const token = localStorage.getItem('token');

  const usuarioRole = localStorage.getItem('usuarioRole');

  // Não está logado
  if (!token) {
    return <Navigate to="/Login" replace />;
  }

  // Está logado, mas não é administrador
  if (usuarioRole !== 'ADMIN') {
    return <Navigate to="/Home" replace />;
  }

  return children;
}


function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* =========================
            ROTAS PÚBLICAS
        ========================= */}

        <Route
          path="/"
          element={<Navigate to="/Login" replace />}
        />

        <Route
          path="/Login"
          element={<Login />}
        />

        <Route
          path="/Register"
          element={<Register />}
        />


        {/* =========================
            ROTAS DO USUÁRIO
        ========================= */}

        <Route
          path="/Home"
          element={<Home />}
        />

        <Route
          path="/Form"
          element={<Form />}
        />

        <Route
          path="/PedidosUsers"
          element={<PedidosUsers />}
        />

        <Route
          path="/NavBar"
          element={<NavBar />}
        />


        {/* =========================
            ROTA ADMINISTRATIVA
        ========================= */}

        <Route
          path="/Admin"
          element={
            <RotaAdmin>
              <Admin />
            </RotaAdmin>
          }
        />

      </Routes>

    </BrowserRouter>

  );
}

export default App;