import { useEffect, useState } from 'react';
import api from '../services/api';
import '../Admin.css';

export default function Admin() {

  const [pedidos, setPedidos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  async function carregarPedidos() {

    try {

      setCarregando(true);
      setErro('');

      const token = localStorage.getItem('token');

      const response = await api.get('/admin/pedidos', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setPedidos(response.data);

    } catch (error) {

      console.error('Erro ao carregar pedidos:', error);

      setErro(
        error.response?.data?.error ||
        'Erro ao carregar pedidos.'
      );

    } finally {

      setCarregando(false);

    }
  }

  useEffect(() => {
    carregarPedidos();
  }, []);


  async function marcarComoEntregue(id) {

    try {

      const token = localStorage.getItem('token');

      await api.patch(
        `/admin/pedidos/${id}/entregar`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setPedidos((prev) =>
        prev.map((pedido) =>
          pedido.id === id
            ? {
                ...pedido,
                status: 'ENTREGUE'
              }
            : pedido
        )
      );

    } catch (error) {

      console.error(
        'Erro ao marcar pedido como entregue:',
        error
      );

      alert(
        error.response?.data?.error ||
        'Erro ao atualizar pedido.'
      );
    }
  }


  if (carregando) {

    return (
      <div className="admin-loading">
        Carregando pedidos...
      </div>
    );

  }


  if (erro) {

    return (
      <div className="admin-error">
        <h2>Erro</h2>
        <p>{erro}</p>

        <button onClick={carregarPedidos}>
          Tentar novamente
        </button>
      </div>
    );

  }


  return (

    <div className="admin-container">

      <header className="admin-header">

        <div>
          <h1>Painel Administrativo</h1>

          <p>
            Gerencie os pedidos da loja
          </p>
        </div>

        <button
          className="btn-atualizar"
          onClick={carregarPedidos}
        >
          ↻ Atualizar
        </button>

      </header>


      <div className="admin-resumo">

        <div className="resumo-card">
          <span>Total</span>
          <strong>{pedidos.length}</strong>
        </div>

        <div className="resumo-card pendente">
          <span>Pendentes</span>
          <strong>
            {
              pedidos.filter(
                (p) =>
                  p.status === 'PENDENTE'
              ).length
            }
          </strong>
        </div>

        <div className="resumo-card entregue">
          <span>Entregues</span>
          <strong>
            {
              pedidos.filter(
                (p) =>
                  p.status === 'ENTREGUE'
              ).length
            }
          </strong>
        </div>

        <div className="resumo-card cancelado">
          <span>Cancelados</span>
          <strong>
            {
              pedidos.filter(
                (p) =>
                  p.status === 'CANCELADO'
              ).length
            }
          </strong>
        </div>

      </div>


      {pedidos.length === 0 ? (

        <div className="admin-vazio">
          <h2>Nenhum pedido encontrado</h2>
          <p>
            Ainda não existem pedidos registrados.
          </p>
        </div>

      ) : (

        <div className="admin-lista">

          {pedidos.map((pedido) => (

            <div
              key={pedido.id}
              className="admin-pedido"
            >

              <div className="pedido-header">

                <span className="pedido-id">
                  #{pedido.id.slice(-5)}
                </span>

                <span
                  className={`pedido-status ${pedido.status.toLowerCase()}`}
                >
                  {pedido.status}
                </span>

              </div>


              <div className="pedido-principal">

                <h3>
                  {pedido.item}
                </h3>

                <p>
                  Quantidade:
                  {' '}
                  <strong>
                    {pedido.quantidade}
                  </strong>
                </p>

              </div>


              <div className="pedido-cliente">

                <h4>Cliente</h4>

                <p>
                  <strong>
                    {pedido.usuario?.nome}
                  </strong>
                </p>

                <p>
                  {pedido.usuario?.email}
                </p>

              </div>


              <div className="pedido-entrega">

                <h4>Endereço de entrega</h4>

                <p>
                  {pedido.endereco},
                  {' '}
                  nº {pedido.numeroCasa}
                </p>

                <p>
                  {pedido.bairro}
                </p>

                <p>
                  {pedido.cidade}
                  {' - '}
                  {pedido.uf}
                </p>

                <p>
                  CEP: {pedido.cep}
                </p>

                {pedido.complemento && (
                  <p>
                    Complemento:
                    {' '}
                    {pedido.complemento}
                  </p>
                )}

              </div>


              <div className="pedido-data">

                <span>
                  Pedido realizado em:
                  {' '}
                  {new Date(
                    pedido.createdAt
                  ).toLocaleString('pt-BR')}
                </span>

              </div>


              {pedido.status !== 'ENTREGUE' &&
               pedido.status !== 'CANCELADO' && (

                <button
                  className="btn-entregar"
                  onClick={() =>
                    marcarComoEntregue(
                      pedido.id
                    )
                  }
                >
                  ✓ Marcar como entregue
                </button>

              )}

            </div>

          ))}

        </div>

      )}

    </div>
  );
}