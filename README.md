# 💻 Frontend - Sistema de Pedidos

Interface web desenvolvida com **React** para consumo da API de pedidos, permitindo autenticação de usuários e gerenciamento de pedidos em tempo real.

---

## 🧠 Objetivo

Criar uma interface intuitiva para interação com a API, permitindo que usuários realizem login, cadastro e gerenciamento completo de pedidos.

---

## 🛠️ Tecnologias

- React  
- Vite  
- JavaScript (ES6+)  
- CSS  

---

## 📁 Estrutura do Projeto

```
src/
 ├── assets/        # Imagens e recursos
 ├── pages/         # Páginas da aplicação
 │   ├── Home.jsx
 │   ├── Login.jsx
 │   ├── Register.jsx
 │   ├── Form.jsx
 │   ├── PedidosUsers.jsx
 │   └── NavBar.jsx
 ├── services/
 │   └── api.js     # Comunicação com backend
 ├── App.jsx
 ├── main.jsx
```

---

## 🔐 Autenticação

- Login gera token JWT  
- Token é armazenado no frontend  
- Requisições protegidas enviam o token automaticamente  

---

## 📡 Integração com API

O frontend se comunica com o backend através de requisições HTTP utilizando um serviço centralizado (`api.js`).

Exemplo de uso:

```js
api.get('/Pedidos', {
  headers: {
    Authorization: `Bearer ${token}`
  }
})
```

---

## 🖥️ Funcionalidades

- Cadastro de usuário  
- Login com autenticação  
- Criação de pedidos  
- Listagem de pedidos do usuário  
- Cancelamento de pedidos  
- Navegação entre páginas  

---

## ⚙️ Como rodar o projeto

### 1. Clonar repositório
```bash
git clone https://github.com/shadow123433/banana-store-frontend.git
```

### 1. Instalar dependências
```bash
npm install
```

### 2. Rodar aplicação
```bash
npm run dev
```

Aplicação disponível em:
```
http://localhost:5173
```

---

## 🔗 Conexão com Backend

Certifique-se de que o backend esteja rodando em:

```
http://localhost:3000
```

---

## 🧠 Organização

- **Pages** → telas da aplicação  
- **Services** → comunicação com API  
- **Components** → elementos reutilizáveis  
- **Assets** → recursos visuais  

---

## 📌 Melhorias Futuras

- Implementar proteção de rotas  
- Gerenciamento de estado global (Context API ou Zustand)  
- Feedback visual (loading, erros)  
- Responsividade completa  
- Melhor organização de estilos  

---

## 📄 Licença

MIT