import { useState } from 'react';
import '../index.css';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await api.post('/Auth/Login', {
        email,
        senha
      });

      console.log('Login bem-sucedido!', response.data);

      // Salva o token
      localStorage.setItem(
        'token',
        response.data.token
      );

      // Salva informações do usuário
      localStorage.setItem(
        'usuarioNome',
        response.data.user.nome
      );

      // Salva a permissão do usuário
      localStorage.setItem(
        'usuarioRole',
        response.data.user.role
      );

      setShowModal(true);

      setTimeout(() => {
        navigate('/Home', {
          replace: true
        });
      }, 2000);

    } catch (error) {
      console.error(
        'Erro ao logar:',
        error
      );

      const mensagemErro =
        error.response?.data?.message ||
        'Erro ao fazer login.';

      alert(mensagemErro);
    }
  }

  return (
    <div className="login-page">

      <div className="login-container">

        <h2>
          🍌 Entrar na Banana Store
        </h2>

        <form onSubmit={handleSubmit}>

          <div className="input-group">

            <label>
              E-mail:
            </label>

            <input
              type="email"
              placeholder="seuemail@gmail.com"
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
            Entrar
          </button>

        </form>


        <div className="login-footer">

          <p>
            Não tem uma conta?{' '}
            <Link to="/Register">
              Cadastre-se
            </Link>
          </p>

        </div>

      </div>


      {showModal && (

        <div className="modal-overlay">

          <div className="modal-box">

            <h3>
              Bem-vindo 🍌
            </h3>

            <p>
              Login realizado com sucesso!
            </p>

          </div>

        </div>

      )}

    </div>
  );
}