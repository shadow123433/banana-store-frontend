# 💻 Sistema de Pedidos - Frontend

Interface web desenvolvida em **React** para consumo de uma API REST, com autenticação JWT e gerenciamento completo de pedidos.

---

## 🚀 Acesse o Projeto

👉 https://banana-store-frontend.vercel.app

---

## 🧠 Visão Geral

Este projeto faz parte de uma arquitetura **full stack desacoplada**, onde:

- 🔹 Frontend: React (Vercel)
- 🔹 Backend: Node.js (Render)
- 🔹 Banco de Dados: MongoDB

A aplicação simula um sistema real de pedidos, com fluxo completo de autenticação e operações do usuário.

---

## ⚙️ Funcionalidades

- ✔️ Cadastro de usuário  
- ✔️ Login com autenticação JWT  
- ✔️ Persistência de sessão (localStorage)  
- ✔️ Criação de pedidos  
- ✔️ Listagem de pedidos do usuário  
- ✔️ Cancelamento de pedidos  
- ✔️ Navegação entre páginas  

---

## 🔐 Autenticação

- O login gera um **token JWT**
- O token é armazenado no navegador
- Requisições autenticadas enviam automaticamente o token via **Axios Interceptor**

---

## 📡 Integração com API

A comunicação com o backend é feita através de um serviço centralizado:

```js
src/services/api.js
```

Exemplo:

```js
api.get('/Pedidos');
```

---

## 🛠️ Tecnologias Utilizadas

- **React**
- **Vite**
- **JavaScript (ES6+)**
- **Axios**
- **CSS**

---

## 📁 Estrutura do Projeto

```
src/
 ├── assets/          
 ├── pages/           
 │   ├── Home.jsx
 │   ├── Login.jsx
 │   ├── Register.jsx
 │   ├── Form.jsx
 │   ├── PedidosUsers.jsx
 │   └── NavBar.jsx
 ├── services/
 │   └── api.js       
 ├── App.jsx
 ├── main.jsx
```

---

## ⚙️ Como rodar localmente

```bash
git clone https://github.com/shadow123433/banana-store-frontend.git
cd banana-store-frontend
npm install
npm run dev
```

A aplicação estará disponível em:

```
http://localhost:5173
```

---

## 🔗 Configuração da API

Crie um arquivo `.env` na raiz do projeto:

```
VITE_API_URL=http://localhost:3000
```

Ou utilize a API em produção.

---

## 🌐 Deploy

- **Frontend:** Vercel  
- **Backend:** Render  

👉 Aplicação em produção com comunicação real entre frontend e backend.

---

## 📌 Melhorias Futuras

- Proteção de rotas (Auth Guard)
- Gerenciamento de estado global (Context API ou Zustand)
- Feedback visual (loading e tratamento de erros)
- Responsividade completa
- Melhorias de UX/UI

---

## 📄 Licença

MIT

---

## 👨‍💻 Autor: Thiago Martins

Desenvolvido como projeto de estudo com foco em arquitetura full stack, integração de serviços e deploy em produção.