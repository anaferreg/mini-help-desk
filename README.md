# 🎫 Mini Helpdesk - Desafio Técnico

![Backend](https://img.shields.io/badge/Backend-Xano-blue?style=for-the-badge)
![Frontend](https://img.shields.io/badge/Frontend-HTML5%20%2F%20JS-orange?style=for-the-badge)
![Deploy](https://img.shields.io/badge/Deploy-Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)

Solução completa desenvolvida para o desafio técnico de estágio em TI. O projeto consiste em uma aplicação de Helpdesk **Fullstack**, integrando um Frontend SPA com uma API RESTful robusta no **Xano**.

---

## 🚀 Deploy e CI/CD (Acesso Online)

O projeto está **hospedado e funcional** na plataforma Render.

Aplicando meus conhecimentos acadêmicos em **DevOps e Desenvolvimento Web**, configurei um pipeline de **Integração e Entrega Contínua (CI/CD)**. O site está vinculado diretamente a este repositório: a cada novo `commit` na branch principal, o Render executa o build e realiza o deploy automático da nova versão.

💡 **Nota:** Devido a essa automação, **não é necessário rodar o projeto localmente** para validação. O ambiente de produção reflete exatamente o estado atual do código.

🔗 **ACESSE A PROJETO ONLINE:**
> **https://mini-help-desk-cgls.onrender.com**

---

## 🛠️ Tecnologias e Arquitetura

### 1. Backend (Xano)
O backend foi construído no Xano (No-Code/Low-Code), seguindo padrões REST e garantindo performance.

* **Banco de Dados:** Tabela `ticket` estruturada e normalizada.
* **Campos:** `id`, `created_at`,`title`, `description`, `category`, `priority`, `status`, `requester_name`, `requester_email`, `updated_at`.
* **Regras de Negócio Implementadas:**
    * ✅ **Paginação no Servidor:** Controle via `page` e `per_page`.
    * ✅ **Filtros Avançados:** Busca textual (`q`) e filtros por status.
    * ✅ **Validações:** Campos obrigatórios e formatação de e-mail.
    * ✅ **Tratamento de Erros:** Retornos HTTP coerentes (400, 404).

### 2. Frontend (HTML/CSS/JS)
Interface limpa e responsiva, focada na experiência do usuário (UX).

* **Integração E2E:** Consumo direto da API do Xano via `fetch`.
* **Estados de Interface:** Feedbacks visuais para *Loading*, *Sucesso* e *Erro*.
* **Funcionalidades:**
    * Listagem de chamados com paginação real.
    * Criação, Edição e Exclusão de tickets.

---

## 🔌 Documentação da API (Endpoints)

Caso deseje testar a API isoladamente (via Insomnia, Postman ou Curl), utilize a URL base abaixo:

**Base URL:** `https://x8ki-letl-twmt.n7.xano.io/api:oWYjwcfP`

| Método | Endpoint | Descrição | Parâmetros/Body |
| :--- | :--- | :--- | :--- |
| `GET` | `/tickets` | Listar tickets | `?page=1`, `?per_page=10`, `?q=busca` |
| `GET` | `/tickets/{id}` | Detalhes do ticket | N/A |
| `POST` | `/tickets` | Criar ticket | JSON com `title`, `email`, `category`, etc. |
| `PUT` | `/tickets/{id}` | Atualizar ticket | JSON com campos a alterar |
| `DELETE`| `/tickets/{id}` | Excluir ticket | N/A |

---

## 💻 Instalação e Execução Local (Opcional)

Como o foco do projeto é a entrega contínua via Render, a execução local é opcional. Caso deseje analisar o código na sua máquina:

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/anaferreg/mini-help-desk.git
    ```

2.  **Abra o projeto:**
    * Navegue até a pasta do projeto.
    * Abra o arquivo `index.html` em seu navegador.
    * *Recomendação:* Use a extensão **Live Server** do VS Code para evitar problemas de CORS locais.

3.  **Configuração:**
    * O frontend já está configurado para apontar para a API do Xano na nuvem. Nenhuma configuração extra é necessária.

---

## 📸 Evidências do Backend (Xano)

Estrutura da tabela de Tickets com tipos de dados validados.

![alt text](<print banco de dados 1.png>)

Configuração de paginação Server-side via parâmetros externos.

![alt text](<print da api e endpoints.png>)

Estrutura de resposta JSON incluindo metadados de paginação (requisito 2.2).

![alt text](<print do endpoint get e filters busca .png>)
![alt text](<print do endpoint get e output .png>)

Implementação de filtros de busca por título e status no backend.

![alt text](<print swagger do mini helpdesk.png>)

---

## 📞 Contato

Desenvolvido por **Analice Ferreira Gomes**.

* **LinkedIn:** https://www.linkedin.com/in/analice-ferreira-184ab4250/
* **Email:** ferreiraanalice122@gmail.com