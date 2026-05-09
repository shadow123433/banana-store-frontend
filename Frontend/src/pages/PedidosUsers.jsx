import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../CardPedidos.css';

const PedidosUsers = () => {
  const [pedidos, setPedidos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const carregarMeusPedidos = async () => {
      try {
        // Pega o token salvo no navegador
        const token = localStorage.getItem('token'); 

        // Faz a requisição para a sua API de "Meus Pedidos"
        const response = await axios.get('http://localhost:3000/Auth/MeusPedidos', {
          headers: {
            Authorization: `Bearer ${token}` // Aqui você apresenta o crachá!
          }
        });

        setPedidos(response.data);
      } catch (error) {
        console.error("Erro ao buscar pedidos:", error);
      } finally {
        setCarregando(false);
      }
    };

    carregarMeusPedidos();
  }, []);

  if (carregando) return <p>Carregando seu histórico...</p>;

 return (
  <div className="seus-pedidos-container">
    <h2>🛍️ Meus Pedidos</h2>
    
    {pedidos.length === 0 ? (
      <p>Você ainda não realizou nenhum pedido.</p>
    ) : (
      pedidos.map((p) => (
        <div key={p.id} className="card-pedido">
          <h4>{p.item}</h4>
          <p><strong>Qtd:</strong> {p.quantidade} unidades</p>
          <span className="data-pedido">Realizado em: {new Date(p.createdAt).toLocaleDateString()}</span>
          <div className="status-tag">✓ Confirmado</div>
        </div>
      ))
    )}
  </div>
);
};

export default PedidosUsers;