import { useState } from 'react';
import '../index.css';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

export default function Register() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    try {

      // =========================
      // CADASTRO
      // =========================

      const response = await api.post(
        '/Auth/Register',
        {
          nome,
          email,
          senha
        }
      );

      console.log(
        'Cadastro realizado:',
        response.data
      );


      // =========================
      // LOGIN AUTOMÁTICO
      // =========================

      const login = await api.post(
        '/Auth/Login',
        {
          email,
          senha
        }
      );


      // =========================
      // SALVAR DADOS
      // =========================

      localStorage.setItem(
        'token',
        login.data.token
      );

      localStorage.setItem(
        'user',
        JSON.stringify(login.data.user)
      );

      localStorage.setItem(
        'usuarioNome',
        login.data.user.nome
      );

      localStorage.setItem(
        'usuarioRole',
        login.data.user.role
      );


      // =========================
      // MODAL DE SUCESSO
      // =========================

      setShowModal(true);


      setTimeout(() => {

        navigate('/Home', {
          replace: true
        });

      }, 2000);


    } catch (error) {

      console.error(
        'Erro ao conectar:',
        error
      );

      const mensagemErro =
        error.response?.data?.error ||
        error.response?.data?.message ||
        'Erro ao realizar cadastro. Verifique os dados ou o servidor.';

      alert(mensagemErro);
    }
  }

  return (
    <div className="login-page">

      <div className="login-container">

        <h2>
          🍌 Cadastro Banana
        </h2>


        <form onSubmit={handleSubmit}>

          <div className="input-group">

            <label>
              Nome:
            </label>

            <input
              type="text"
              placeholder="Seu nome completo"
              value={nome}
              onChange={(e) =>
                setNome(e.target.value)
              }
              required
            />

          </div>


          <div className="input-group">

            <label>
              E-mail:
            </label>

            <input
              type="email"
              placeholder="exemplo@email.com"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />

          </div>


          <div className="input-group">

            <label>
              Senha:
            </label>

            <div className="senha-box">

              <input
                type={
                  mostrarSenha
                    ? 'text'
                    : 'password'
                }
                placeholder="Sua senha"
                value={senha}
                onChange={(e) =>
                  setSenha(e.target.value)
                }
                required
              />

              <button
                type="button"
                className="btn-mostrar-senha"
                onClick={() =>
                  setMostrarSenha(!mostrarSenha)
                }
              >
                {mostrarSenha
                  ? '👁️'
                  : '🙈'}
              </button>

            </div>

          </div>


          <button
            type="submit"
            className="btn-login"
          >
            Cadastrar e Entrar
          </button>

        </form>


        <div className="login-footer">

          <p>
            Já tem uma conta?{' '}

            <Link to="/Login">
              Faça Login
            </Link>

          </p>

        </div>

      </div>


      {showModal && (

        <div className="modal-overlay">

          <div className="modal-box">

            <h3>
              Sucesso 🍌
            </h3>

            <p>
              Cadastro realizado e login efetuado!
            </p>

          </div>

        </div>

      )}

    </div>
  );
}