import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/login';    // Verifique se o arquivo é 'login.jsx' ou 'Login.jsx'
import Register from './pages/Register';
import Home from './pages/home';      // Verifique se o arquivo é 'home.jsx' ou 'Home.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* SEMPRE use letra inicial MAIÚSCULA nos componentes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;