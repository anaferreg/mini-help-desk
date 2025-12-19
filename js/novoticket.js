import { API_BASE_URL } from './config.js';

document.getElementById('formTicket').addEventListener('submit', async (e) => {
    e.preventDefault(); 

    const dados = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        category: document.getElementById('category').value,
        priority: document.getElementById('priority').value,
        requester_name: document.getElementById('reqName').value,
        requester_email: document.getElementById('reqEmail').value,
        status: "Aberto"
    };

    console.log(dados);

    alert("O que vou enviar agora: " + document.getElementById('title').value);

    try {
        const resp = await fetch(API_BASE_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dados)
        });

        if(resp.ok) {
            alert("Chamado criado com sucesso!");
            window.location.href = "index.html";
        } else {
            const erro = await resp.json();
            alert("Erro: " + JSON.stringify(erro));
        }
    } catch (e) {
        alert("Erro de conexão");
    }
});