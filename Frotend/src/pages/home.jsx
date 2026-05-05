import { useState } from 'react';
import api from '../services/api';
import Form from './Form'; // <--- Importe seu novo arquivo aqui
import '../App.css'


export default function Home() {
  const produtos = [
    { id: 1, nome: 'Banana Nanica', tipo: 'Nanica', preco: 4.50, imagem: new URL('../assets/imgs/images (1).jpg', import.meta.url).href },
    { id: 2, nome: 'Banana da Terra', tipo: 'Terra', preco: 7.90, imagem: new URL('../assets/imgs/images.jpg', import.meta.url).href }
  ];

  const [quantidades, setQuantidades] = useState({ 1: 1, 2: 1 });
  
  // --- NOVOS ESTADOS ---
  const [mostrarForm, setMostrarForm] = useState(false); // Controla se o form aparece
  const [produtoSelecionado, setProdutoSelecionado] = useState(null); // Guarda o item atual

  const alterarQuantidade = (id, valor) => {
    setQuantidades({ ...quantidades, [id]: Math.max(1, valor) });
  };

  // 1. Essa função agora só ABRE o formulário
  function prepararPedido(produto) {
    setProdutoSelecionado(produto);
    setMostrarForm(true);
  }

  // 2. Essa função é que vai falar com o BACKEND (Express)
  async function finalizarCompra(event) {
    event.preventDefault();
    
    // Captura os dados que o usuário digitou no Form.jsx
    const formData = new FormData(event.target);
    const dadosEntrega = Object.fromEntries(formData);

    const payload = {
      item: produtoSelecionado.nome,
      quantidade: quantidades[produtoSelecionado.id],
      entrega: dadosEntrega // Aqui vão Nome, Endereço e Telefone
    };

    try {
      await api.post('/Pedidos', payload);
      alert(`✅ Pedido de ${payload.item} confirmado!`);
      setMostrarForm(false); // Fecha o form
    } catch (error) {
      alert("Erro ao enviar pedido.");
    }
  }

  return (
    <div className="container">
      {/* 3. LÓGICA DO FORMULÁRIO: Só aparece se mostrarForm for true */}
      {mostrarForm && (
        <Form 
          aoEnviar={finalizarCompra} 
          aoCancelar={() => setMostrarForm(false)} 
        />
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

              {/* AQUI: Mudamos de handlePedido para prepararPedido */}
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