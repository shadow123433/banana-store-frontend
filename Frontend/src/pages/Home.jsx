import { useState } from 'react';
import api from '../services/api';
import Form from './Form';
import PedidosUsers from './PedidosUsers';
import Navbar from './NavBar';
import '../App.css';

export default function Home() {
  const produtos = [
    { id: 1, nome: 'Banana Nanica', tipo: 'Nanica', preco: 4.50, imagem: new URL('../assets/imgs/images (1).jpg', import.meta.url).href },
    { id: 2, nome: 'Banana da Terra', tipo: 'Terra', preco: 7.90, imagem: new URL('../assets/imgs/images.jpg', import.meta.url).href }
  ];

  const [quantidades, setQuantidades] = useState({ 1: 1, 2: 1 });
  const [mostrarForm, setMostrarForm] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [mostrarPedidos, setMostrarPedidos] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [mensagemFeedback, setMensagemFeedback] = useState('');

  const alterarQuantidade = (id, valor) => {
    setQuantidades({ ...quantidades, [id]: Math.max(1, valor) });
  };

  function prepararPedido(produto) {
    setProdutoSelecionado(produto);
    setMostrarForm(true);
  }

  async function finalizarCompra(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const dadosEntrega = Object.fromEntries(formData);

    // 1. Pegar o token do localStorage
    const token = localStorage.getItem('token');

    const payload = {
      item: produtoSelecionado.nome,
      quantidade: quantidades[produtoSelecionado.id],
      entrega: dadosEntrega
    };

    try {
      // 2. Enviar o token no cabeçalho (Authorization)
      await api.post('/Pedidos', payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setMensagemFeedback(`✅ Pedido de ${payload.item} confirmado!`);
      setShowFeedback(true);
      setMostrarForm(false);

      setTimeout(() => {
        setShowFeedback(false);
      }, 2000);
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 401) {
        setMensagemFeedback("Sessão expirada. Faça login novamente.");
      } else {
        setMensagemFeedback("Erro ao enviar pedido.");
      }

      setShowFeedback(true);

      setTimeout(() => {
        setShowFeedback(false);
      }, 2000);
    }
  }

  return (
    <div className="container">
      <Navbar abrirPedidos={() => setMostrarPedidos(true)} />

      {/* Modal de Formulário de Compra */}
      {mostrarForm && (
        <div className="modal-overlay" onClick={() => setMostrarForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="btn-fechar" onClick={() => setMostrarForm(false)}>X</button>
            <Form
              aoEnviar={finalizarCompra}
              aoCancelar={() => setMostrarForm(false)}
            />
          </div>
        </div>
      )}

      {/* Modal de Histórico de Pedidos */}
      {mostrarPedidos && (
        <div className="modal-overlay" onClick={() => setMostrarPedidos(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="btn-fechar" onClick={() => setMostrarPedidos(false)}>X</button>
            <PedidosUsers />
          </div>
        </div>
      )}

      {/* 🔥 MODAL DE FEEDBACK (NOVO) */}
      {showFeedback && (
        <div className="modal-overlay">
          <div className="modal-box">
            <p>{mensagemFeedback}</p>
          </div>
        </div>
      )}

      <header>
        <h1>🍌 <span>Banana</span> Store</h1>
        <p>Qualidade premium para o seu carrinho</p>
      </header>

      <div className="vitrine">
        {produtos.map((banana) => (
          <div key={banana.id} className="card">
            <img src={banana.imagem} alt={banana.nome} />
            <div className="card-info">
              <h3>{banana.nome}</h3>
              <p className="preco">R$ {banana.preco.toFixed(2)} / cacho</p>

              <div className="controle-quantidade">
                <label>Qtd:</label>
                <input
                  type="number"
                  value={quantidades[banana.id]}
                  onChange={(e) =>
                    alterarQuantidade(banana.id, parseInt(e.target.value))
                  }
                />
              </div>

              <button
                className="btn-pedido"
                onClick={() => prepararPedido(banana)}
              >
                🛒 Confirmar Pedido
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}