import { useState } from 'react';
import api from '../services/api';
import Form from './Form';
import PedidosUsers from './PedidosUsers';
import Navbar from './NavBar';
import '../App.css';

export default function Home() {
  const produtos = [
    {
      id: 1,
      nome: 'Banana Nanica',
      tipo: 'Nanica',
      preco: 4.5,
      imagem: new URL('../assets/imgs/images (1).jpg', import.meta.url).href
    },
    {
      id: 2,
      nome: 'Banana da Terra',
      tipo: 'Terra',
      preco: 7.9,
      imagem: new URL('../assets/imgs/images.jpg', import.meta.url).href
    }
  ];

  const [quantidades, setQuantidades] = useState({
    1: 1,
    2: 1
  });

  const [mostrarForm, setMostrarForm] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [mostrarPedidos, setMostrarPedidos] = useState(false);

  const [feedback, setFeedback] = useState({
    visible: false,
    message: '',
    type: ''
  });

  function mostrarMensagem(message, type = 'success') {
    setFeedback({
      visible: true,
      message,
      type
    });

    setTimeout(() => {
      setFeedback({
        visible: false,
        message: '',
        type: ''
      });
    }, 2500);
  }

  function alterarQuantidade(id, valor) {
    const quantidade = Number(valor);

    setQuantidades((prev) => ({
      ...prev,
      [id]: quantidade < 1 || isNaN(quantidade) ? 1 : quantidade
    }));
  }

  function prepararPedido(produto) {
    setProdutoSelecionado(produto);
    setMostrarForm(true);
  }

  async function finalizarCompra(event) {
    event.preventDefault();

    try {
      const formData = new FormData(event.target);

      const entrega = {
        cep: formData.get('cep')?.trim(),
        uf: formData.get('uf')?.trim(),
        endereco: formData.get('endereco')?.trim(),
        bairro: formData.get('bairro')?.trim(),
        cidade: formData.get('cidade')?.trim(),
        numero: formData.get('numero')?.trim(),
        complemento: formData.get('complemento')?.trim() || ''
      };

      const token = localStorage.getItem('token');

      if (!token) {
        mostrarMensagem('Você precisa fazer login novamente.', 'error');
        return;
      }

      const payload = {
        item: produtoSelecionado.nome,
        quantidade: Number(quantidades[produtoSelecionado.id]),
        entrega
      };

      console.log('Payload enviado:', payload);

      const response = await api.post('/pedidos', payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log(response.data);

      mostrarMensagem(
        `✅ Pedido de ${produtoSelecionado.nome} realizado com sucesso!`
      );

      setMostrarForm(false);
    } catch (error) {
      console.error('Erro completo:', error);

      const mensagem =
        error.response?.data?.error ||
        'Erro ao processar pedido.';

      mostrarMensagem(mensagem, 'error');
    }
  }

  return (
    <div className="container">
      <Navbar abrirPedidos={() => setMostrarPedidos(true)} />

      {mostrarForm && (
        <div
          className="modal-overlay"
          onClick={() => setMostrarForm(false)}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="btn-fechar"
              onClick={() => setMostrarForm(false)}
            >
              X
            </button>

            <Form
              aoEnviar={finalizarCompra}
              aoCancelar={() => setMostrarForm(false)}
            />
          </div>
        </div>
      )}

      {mostrarPedidos && (
        <div
          className="modal-overlay"
          onClick={() => setMostrarPedidos(false)}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="btn-fechar"
              onClick={() => setMostrarPedidos(false)}
            >
              X
            </button>

            <PedidosUsers />
          </div>
        </div>
      )}

      {feedback.visible && (
        <div className="modal-overlay">
          <div className={`modal-box ${feedback.type}`}>
            <p>{feedback.message}</p>
          </div>
        </div>
      )}

      <header>
        <h1>
          🍌 <span>Banana</span> Store
        </h1>

        <p>Qualidade premium para o seu carrinho</p>
      </header>

      <div className="vitrine">
        {produtos.map((banana) => (
          <div key={banana.id} className="card">
            <img
              src={banana.imagem}
              alt={banana.nome}
            />

            <div className="card-info">
              <h3>{banana.nome}</h3>

              <p className="preco">
                R$ {banana.preco.toFixed(2)} / cacho
              </p>

              <div className="controle-quantidade">
                <label>Qtd:</label>

                <input
                  type="number"
                  min="1"
                  value={quantidades[banana.id]}
                  onChange={(e) =>
                    alterarQuantidade(
                      banana.id,
                      e.target.value
                    )
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

