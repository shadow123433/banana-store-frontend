import { useState } from 'react';
import '../index.css';
import { useNavigate } from 'react-router-dom';
import api from '../services/api'; 


export default function Register() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState(''); 
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      // O endpoint precisa ser exatamente o que definimos no backend
      const response = await api.post('/Auth/Register', { nome, email, senha });
      
      console.log('Sucesso!', response.data);
      alert('Cadastro realizado com sucesso! 🍌');
      navigate('/home'); 

    } catch (error) {
      console.error('Erro ao conectar:', error);
      // Se der erro 404 aqui, verifique se a rota no backend é /Auth/Register
      alert('Erro ao realizar cadastro. Verifique os dados ou o servidor.');
    }
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>🍌 Cadastro Banana</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Nome:</label>
            <input 
              type="text" 
              placeholder="Seu nome completo"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required 
            />
          </div>

          <div className="input-group">
            <label>E-mail:</label>
            <input 
              type="email" 
              placeholder="exemplo@email.com"
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
            Cadastrar e Entrar
          </button>
        </form>

        <div className="login-footer">
          <p>Já tem uma conta? <a href="/">Faça Login</a></p>
        </div>
      </div>
    </div>
  );
}