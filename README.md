Decipher
Decipher é uma aplicação de jogo inspirada no clássico Mastermind, desenvolvida para demonstrar boas práticas de engenharia de software e integrar tecnologias modernas tanto no backend quanto no frontend. O projeto serve como portfólio e como estudo prático de conceitos avançados de autenticação, persistência de dados e interfaces interativas.

Visão Geral
Decipher é composto por duas partes principais:

Backend
Tecnologias:

Spring Boot – Framework para criação de APIs REST robustas e seguras.
Hibernate / JPA – Persistência de dados com mapeamento objeto-relacional.
JWT + Cookies HTTP‑only – Autenticação segura com tokens gerenciados via cookies.
Tratamento de Exceções e Validações – Uso de exceções personalizadas e tratamento global para garantir respostas padronizadas.
Funcionalidades:

Gerenciamento de Usuários: Endpoints para criação, atualização, recuperação e exclusão de usuários.
Autenticação: Endpoint de login que gera um JWT e o envia em um cookie HTTP‑only; endpoint de validação para checar a autenticidade do token; endpoint de logout que remove o cookie.
Gestão do Jogo: Endpoints para criação, atualização e consulta de partidas (games) e para o gerenciamento de stickers, que fazem parte da dinâmica do jogo.
Relacionamentos: O jogo é relacionado a usuários e temas (stickers), demonstrando o uso de consultas derivadas e mapeamento de relacionamentos com JPA.
Frontend
Tecnologias:
React com Vite – Setup rápido e moderno com hot module replacement para uma experiência de desenvolvimento ágil.
Tailwind CSS e Material UI – Combinação para construir interfaces altamente customizadas e responsivas, aproveitando o melhor dos estilos utilitários e componentes pré-estilizados.
Funcionalidades:
Interatividade do Jogo: Interface inspirada no Mastermind, onde o usuário deve acertar a sequência correta de stickers, utilizando interações por clique (e, futuramente, drag & drop).
Gerenciamento de Estado: Uso de Redux e contextos para gerenciar o estado global, como a autenticação do usuário e a dinâmica do jogo.
Autenticação: Fluxo de login, logout e verificação de autenticação, integrado com a API backend que utiliza cookies HTTP‑only para armazenar o token.
Objetivos do Projeto
Aprendizado: Demonstrar a integração de tecnologias modernas (Spring Boot, React, Vite, Tailwind CSS e Material UI) e boas práticas de desenvolvimento (injeção de dependências, tratamento de exceções, autenticação segura e uso de DTOs).
Portfólio: Exibir um exemplo completo de aplicação que abrange tanto a camada de backend quanto a de frontend, evidenciando a capacidade de desenvolver soluções escaláveis e seguras.
Experiência do Usuário: Proporcionar uma experiência interativa e intuitiva, com uma interface moderna e responsiva, ideal para jogos e aplicações web dinâmicas.



# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
