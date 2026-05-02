import { useState } from 'react';
import '../index.css';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api'; 

export default function Login() {
  // Login só precisa de Email e Senha
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState(''); 
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      // 1. Chamada para a rota de LOGIN que criamos no backend
      const response = await api.post('/Auth/Login', { email, senha });
      
      console.log('Login bem-sucedido!', response.data);

      // 2. Salva o nome do Thiago (ou do usuário) para usar na Home
      localStorage.setItem('usuarioNome', response.data.user.nome);

      alert(`Bem-vindo, ${response.data.user.nome}! 🍌`);
      
      // 3. Redireciona para a Home
      navigate('/home'); 

    } catch (error) {
      console.error('Erro ao logar:', error);
      // Aqui tratamos se a senha estiver errada ou e-mail não existir
      alert(error.response?.data?.message || 'Erro ao fazer login. Verifique suas credenciais.');
    }
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>🍌 Entrar na Banana Store</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>E-mail:</label>
            <input 
              type="email" 
              placeholder="seuemail@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>

          <div className="input-group">
            <label>Senha:</label>
            <input 
              type="password" 
              placeholder="Sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required 
            />
          </div>

          <button type="submit" className="btn-login">
            Entrar
          </button>
        </form>

        <div className="login-footer">
          <p>Não tem uma conta? <Link to="/register">Cadastre-se</Link></p>
        </div>
      </div>
    </div>
  );
}