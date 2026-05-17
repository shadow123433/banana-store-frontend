import React from 'react';
import '../NavBar.css';

const NavBar = ({ abrirPedidos }) => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <h1 className="nav-logo">🍌 Banana Store</h1>
        
        <button className="nav-btn-pedidos" onClick={abrirPedidos}>
          <span className="icon">🛍️</span>
          <span className="text">Meus Pedidos</span>
        </button>
      </div>
    </nav>
  );
};

export default NavBar;