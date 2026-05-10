import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../CardPedidos.css';

const PedidosUsers = () => {
  const [pedidos, setPedidos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  // 🔹 Buscar pedidos
  const carregarMeusPedidos = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      setCarregando(false);
      return;
    }

    try {
      const response = await axios.get('http://localhost:3000/Pedidos/MeusPedidos', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setPedidos(response.data);
    } catch (error) {
      console.error("Erro ao buscar pedidos:", error);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarMeusPedidos();
  }, []);

  // 🔹 Cancelar pedido
  const cancelarPedido = async (id) => {
    const token = localStorage.getItem('token');

    try {
      await axios.patch(`http://localhost:3000/pedidos/${id}/cancelar`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // Atualiza o estado sem recarregar
      setPedidos(prev =>
        prev.map(p =>
          p.id === id ? { ...p, status: 'CANCELADO' } : p
        )
      );

    } catch (error) {
      console.error("Erro ao cancelar pedido:", error);
    }
  };

  if (carregando) return <div className="carregando">Carregando seu histórico...</div>;

  return (
    <div className="seus-pedidos-container">
      <header className="pedidos-header">
        <h2>🛍️ Meus Pedidos</h2>
        <p>Acompanhe suas compras recentes</p>
      </header>

      {pedidos.length === 0 ? (
        <div className="sem-pedidos">
          <p>Você ainda não realizou nenhum pedido.</p>
        </div>
      ) : (
        <div className="lista-pedidos-grid">
          {pedidos.map((p) => (
            <div key={p.id} className="card-pedido">
              
              <div className="card-top">
                <span className="pedido-id">
                  #ID: {p.id.toString().slice(-5)}
                </span>

                {/* 🔥 STATUS DINÂMICO */}
                <div className="status-tag">
                  {p.status === 'CANCELADO' ? '❌ Cancelado' : '✓ Confirmado'}
                </div>
              </div>

              <div className="card-info-principal">
                <h4>{p.item}</h4>
                <p><strong>Quantidade:</strong> {p.quantidade} unidades</p>
              </div>

              <div className="entrega-box">
                <h5>📍 Local de Entrega</h5>
                <p><strong>Para:</strong> {p.nome}</p>
                <p>{p.endereco}, nº {p.numeroCasa} - {p.bairro}</p>
                <p>{p.cidade} - {p.uf}</p>
                {p.complemento && (
                  <p className="complemento">Obs: {p.complemento}</p>
                )}
                <p className="telefone">📞 {p.telefone}</p>
              </div>

              {/* 🔥 BOTÃO DE CANCELAR */}
              {p.status !== 'CANCELADO' && (
                <button
                  className="btn-cancelar"
                  onClick={() => cancelarPedido(p.id)}
                >
                  Cancelar Pedido
                </button>
              )}

              <footer className="card-footer">
                <span className="data-pedido">
                  Realizado em: {new Date(p.createdAt).toLocaleDateString('pt-BR')}
                </span>
              </footer>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PedidosUsers;