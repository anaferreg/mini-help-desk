import { API_BASE_URL } from './config.js';

const params = new URLSearchParams(window.location.search);
const idTicket = params.get("id");

if(!idTicket) {
    alert("Ticket não identificado!");
    window.location.href = "index.html";
}

async function carregarDados() {
    try {
        const resp = await fetch(`${API_BASE_URL}/${idTicket}`);
        const ticket = await resp.json();

        document.getElementById('tituloDisplay').innerText = ticket.title;
        document.getElementById('descDisplay').innerText = ticket.description || "Sem descrição";
        
        document.getElementById('status').value = ticket.status;
        document.getElementById('priority').value = ticket.priority;

    } catch (e) {
        alert("Erro ao buscar ticket");
    }
}

async function salvarAlteracoes() {
    const novosDados = {
        status: document.getElementById('status').value,
        priority: document.getElementById('priority').value
    };

    try {
        const resp = await fetch(`${API_BASE_URL}/${idTicket}`, {
            method: "PUT", // Ou PATCH
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(novosDados)
        });
        
        if(resp.ok) {
            alert("Atualizado com sucesso!");
        } else {
            alert("Erro ao atualizar");
        }
    } catch (e) {
        alert("Erro de conexão");
    }
}

async function excluir() {
    if(confirm("Tem certeza que deseja excluir?")) {
        try {
            await fetch(`${API_BASE_URL}/${idTicket}`, { method: "DELETE" });
            alert("Excluído!");
            window.location.href = "index.html";
        } catch (e) {
            alert("Erro ao excluir");
        }
    }
}

carregarDados();