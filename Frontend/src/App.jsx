import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Login from './pages/login';    
import Register from './pages/Register';
import Home from './pages/home';      
import Form from './pages/Form'; 
import PedidosUsers from './pages/PedidosUsers'; 
import NavBar from './pages/NavBar'; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* SEMPRE use letra inicial MAIÚSCULA nos componentes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/Form" element={<Form />} />
        <Route path="/PedidosUsers" element={<PedidosUsers />} />
        <Route path="/NavBar" element={<NavBar />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;