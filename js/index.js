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
                <tr class="border-b hover:bg-gray-50">
                    <td class="p-3 font-medium">${ticket.title}</td>
                    <td class="p-3">${ticket.category}</td>
                    <td class="p-3">
                        <span class="${corBadge(ticket.priority)} px-2 py-1 rounded text-xs text-white">
                            ${ticket.priority}
                        </span>
                    </td>
                    <td class="p-3">${ticket.status}</td>
                    <td class="p-3">
                        <a href="detalhes.html?id=${ticket.id}" class="text-blue-600 hover:underline">Detalhes</a>
                    </td>
                </tr>
            `;
            corpoTabela.innerHTML += linha;
        });

        document.getElementById('infoPagina').innerText = `Página ${paginaAtual}`;
        document.getElementById('btnProx').disabled = !dados.nextPage;
        document.getElementById('btnAnt').disabled = paginaAtual === 1;

    } catch (erro) {
        alert("Erro ao carregar: " + erro);
        console.error(erro);
    }
}

function corBadge(prioridade) {
    if(prioridade === 'Alta') return 'bg-red-100 text-red-800 border border-red-200 font-bold';
    if(prioridade === 'Media') return 'bg-orange-100 text-orange-800 border border-orange-200 font-medium';
    
    return 'bg-green-100 text-green-800 border border-green-200';
}

function mudarPagina(direcao) {
    paginaAtual += direcao;
    carregarTickets();
}

carregarTickets();