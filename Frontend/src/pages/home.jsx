import { useState } from 'react';
import api from '../services/api';
import Form from './Form'; 
import PedidosUsers from './PedidosUsers'; 
import '../App.css'

export default function Home() {
  const produtos = [
    { id: 1, nome: 'Banana Nanica', tipo: 'Nanica', preco: 4.50, imagem: new URL('../assets/imgs/images (1).jpg', import.meta.url).href },
    { id: 2, nome: 'Banana da Terra', tipo: 'Terra', preco: 7.90, imagem: new URL('../assets/imgs/images.jpg', import.meta.url).href }
  ];

  const [quantidades, setQuantidades] = useState({ 1: 1, 2: 1 });
  const [mostrarForm, setMostrarForm] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  
  // --- NOVO ESTADO PARA OS PEDIDOS ---
  const [mostrarPedidos, setMostrarPedidos] = useState(false); 

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

    const payload = {
      item: produtoSelecionado.nome,
      quantidade: quantidades[produtoSelecionado.id],
      entrega: dadosEntrega 
    };

    try {
      await api.post('/Pedidos', payload);
      alert(`✅ Pedido de ${payload.item} confirmado!`);
      setMostrarForm(false);
    } catch (error) {
      alert("Erro ao enviar pedido.");
    }
  }

  return (
    <div className="container">
      {/* BOTÃO DE MEUS PEDIDOS (No canto da tela) */}
      <button 
        className="btn-historico" 
        onClick={() => setMostrarPedidos(true)}
        style={{ position: 'absolute', top: '20px', right: '20px', padding: '10px' }}
      >
        🛍️ Meus Pedidos
      </button>

      {/* LÓGICA DO FORMULÁRIO */}
      {mostrarForm && (
        <Form 
          aoEnviar={finalizarCompra} 
          aoCancelar={() => setMostrarForm(false)} 
        />
      )}

      {/* --- LÓGICA DA LISTA DE PEDIDOS --- */}
      {mostrarPedidos && (
        <div className="modal-pedidos">
          <button onClick={() => setMostrarPedidos(false)}>Fechar X</button>
          <PedidosUsers />
        </div>
      )}

      <header>
        <h1>🍌 Banana Store</h1>
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
                  onChange={(e) => alterarQuantidade(banana.id, parseInt(e.target.value))}
                />
              </div>

              <button className="btn-pedido" onClick={() => prepararPedido(banana)}>
                🛒 Confirmar Pedido
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}