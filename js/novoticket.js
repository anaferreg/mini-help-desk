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

    try {
        const resp = await fetch(API_BASE_URL, {
            method: "POST",
            mode: "cors", 
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json" 
            },
            body: JSON.stringify(dados) 
        });

        if(resp.ok) {
            Toastify({
                text: "Criado com sucesso!",
                duration: 3000,
                gravity: "top", 
                position: "right", 
                style: {
                    background: "linear-gradient(to right, #00b09b, #96c93d)",
                }
            }).showToast();

            setTimeout(() => {
            window.location.href = "index.html";
            }, 3200);
        } else {
            const erro = await resp.json();
            Toastify({
                text: "Erro: " + JSON.stringify(erro.message),
                duration: 3000,
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
            text: "Erro de conexão!",
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            style: {
                background: "linear-gradient(to right, #ff5f6d, #ffc371)",
            }
        }).showToast();
    }
});