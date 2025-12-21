import { API_BASE_URL } from './config.js';

const params = new URLSearchParams(window.location.search);
const idTicket = params.get("id");

if(!idTicket) {
    Toastify({
        text: "Chamado não identificado!",
        duration: 8000,
        close: true,
        gravity: "top",
        position: "right",
        style: {
            background: "linear-gradient(to right, #ff5f6d, #ffc371)",
        }
    }).showToast();
    setTimeout(() => {
    window.location.href = "index.html";
    }, 8200);
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
        Toastify({
            text: "Erro ao buscar o chamado!",
            duration: 8000,
            close: true,
            gravity: "top",
            position: "right",
            style: {
                background: "linear-gradient(to right, #ff5f6d, #ffc371)",
            }
        }).showToast();
    }
}

async function salvarAlteracoes() {
    const novosDados = {
        status: document.getElementById('status').value,
        priority: document.getElementById('priority').value
    };

    try {
        const resp = await fetch(`${API_BASE_URL}/${idTicket}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(novosDados)
        });
        
        if(resp.ok) {
            Toastify({
                text: "Chamado alterado com sucesso!",
                duration: 8000,
                gravity: "top", 
                position: "right", 
                style: {
                    background: "linear-gradient(to right, #00b09b, #96c93d)",
                }
            }).showToast();

            setTimeout(() => {
            window.location.href = "index.html";
            }, 8200);
        } else {
            const erro = await resp.json();
            Toastify({
                text: "Ops! Algo deu errado:" + JSON.stringify(erro),
                duration: 8000,
                close: true,
                gravity: "top",
                position: "right",
                style: {
                    background: "linear-gradient(to right, #ff5f6d, #ffc371)",
                }
            }).showToast();
        }
    } catch (e) {
        Toastify({
            text: "Erro na conexão!",
            duration: 8000,
            close: true,
            gravity: "top",
            position: "right",
            style: {
                background: "linear-gradient(to right, #ff5f6d, #ffc371)",
            }
        }).showToast(); 
    }
}

async function excluir() {
    if(confirm("Tem certeza que deseja excluir?")) {
        try {
            await fetch(`${API_BASE_URL}/${idTicket}`, { method: "DELETE" });
            Toastify({
                text: "Chamado excluído com sucesso!",
                duration: 8000,
                gravity: "top", 
                position: "right", 
                style: {
                    background: "linear-gradient(to right, #00b09b, #96c93d)",
                }
            }).showToast();

            setTimeout(() => {
            window.location.href = "index.html";
            }, 8200);
        } catch (e) {
            Toastify({
                text: "Erro ao excluir!",
                duration: 8000,
                close: true,
                gravity: "top",
                position: "right",
                style: {
                    background: "linear-gradient(to right, #ff5f6d, #ffc371)",
                }
            }).showToast();
        }
    }
}

document.getElementById('excluirBtn').addEventListener('click', () => {
    excluir();
});

document.getElementById('salvarBtn').addEventListener('click', () => {
    salvarAlteracoes();
});

carregarDados();