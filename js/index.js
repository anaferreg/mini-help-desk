import { API_BASE_URL } from './config.js';

let paginaAtual = 1;

async function carregarTickets() {
    const busca = document.getElementById('busca').value;
    const status = document.getElementById('filtroStatus').value;
    
    let url = `${API_BASE_URL}?page=${paginaAtual}&per_page=10`;
    if(busca) url += `&q=${busca}`;
    if(status) url += `&status=${status}`;

    document.getElementById('tabela-corpo').innerHTML = '<tr><td colspan="5" class="p-4 text-center">Carregando...</td></tr>';

    try {
        const resposta = await fetch(url);
        const dados = await resposta.json();

        const corpoTabela = document.getElementById('tabela-corpo');
        corpoTabela.innerHTML = "";

        const lista = dados.items || dados; 
        
        if(lista.length === 0) {
            corpoTabela.innerHTML = '<tr><td colspan="5" class="p-4 text-center text-gray-500">Nenhum chamado encontrado.</td></tr>';
            return;
        }

        lista.forEach(ticket => {
            const linha = `
                <tr class="row-hover">
                    <td>${ticket.title}</td>
                    <td>${ticket.category}</td>
                    <td>
                        <span class="${corBadge(ticket.priority)}">
                            ${ticket.priority}
                        </span>
                    </td>
                    <td>${ticket.status}</td>
                    <td>${new Date(ticket.created_at).toLocaleDateString()}</td>
                    <td>
                        <a href="detalhes.html?id=${ticket.id}" class="link-detalhes">Detalhes</a>
                    </td>
                </tr>
            `;
            corpoTabela.innerHTML += linha;
        });

        document.getElementById('infoPagina').innerText = `Página ${paginaAtual}`;
        document.getElementById('proxBtn').disabled = !dados.nextPage;
        document.getElementById('antBtn').disabled = paginaAtual === 1;

    } catch (erro) {
        alert("Erro ao carregar: " + erro);
        console.error(erro);
    }
}

function corBadge(prioridade) {
    if(prioridade === 'Alta') return 'badge badge-alta';
    if(prioridade === 'Media') return 'badge badge-media';
    return 'badge badge-baixa';
}

// function mudarPagina(direcao) {
//     paginaAtual += direcao;
//     carregarTickets();
// }

document.getElementById('filtrarBtn').addEventListener('click', () => {
    paginaAtual = 1;
    carregarTickets();
});

document.getElementById('antBtn').addEventListener('click', () => {
    if (paginaAtual > 1) {
        paginaAtual--;
        carregarTickets();
    }
});

document.getElementById('proxBtn').addEventListener('click', () => {
    paginaAtual++;
    carregarTickets();
});

carregarTickets();