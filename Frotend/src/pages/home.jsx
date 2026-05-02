import { useState } from 'react';
import api from '../services/api';
import '../app.css'

export default function Home() {
  // 1. Nossa "vitrine" de bananas
  const produtos = [
  {
    id: 1,
    nome: 'Banana Nanica',
    tipo: 'Nanica',
    preco: 4.50,
    // O caminho deve ser relativo ao arquivo Home.jsx
    imagem: new URL('../assets/imgs/images (1).jpg', import.meta.url).href
  },
  {
    id: 2,
    nome: 'Banana da Terra',
    tipo: 'Terra',
    preco: 7.90,
    imagem: new URL('../assets/imgs/images.jpg', import.meta.url).href
  }
];

  // 2. Estado para controlar a quantidade de cada card individualmente
  // Usamos um objeto onde a chave é o ID do produto: { 1: 2, 2: 5 }
  const [quantidades, setQuantidades] = useState({ 1: 1, 2: 1 });

  const alterarQuantidade = (id, valor) => {
    setQuantidades({ ...quantidades, [id]: Math.max(1, valor) });
  };

  async function handlePedido(produto) {
    const qtde = quantidades[produto.id];
    const textoPedido = `${qtde} cachos de ${produto.nome}`;

    try {
      await api.post('/Pedidos', { itens: textoPedido });
      alert(`✅ Sucesso! ${textoPedido} enviados para o banco.`);
    } catch (error) {
      alert("Erro ao enviar pedido.");
    }
  }

 return (
  <div className="container">
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

            <button className="btn-pedido" onClick={() => handlePedido(banana)}>
              🛒 Confirmar Pedido
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);
}