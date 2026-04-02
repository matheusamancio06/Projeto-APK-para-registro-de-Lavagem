// Verificação de Segurança
if (localStorage.getItem('sgl_acesso') !== 'true') {
    window.location.href = 'login.html';
}

const userRole = localStorage.getItem('sgl_role');
const userName = localStorage.getItem('sgl_user_display');

// LISTA DE ATIVOS 
const todosOsAtivos = ["125.A011", "125.A012", "125.A013", "125.A014", "125.A015"]; 

document.addEventListener('DOMContentLoaded', () => {
    configurarInterface();
    exibirLavagens();
});

function configurarInterface() {
    document.getElementById('display-usuario').innerText = userName;
    const badge = document.getElementById('display-role');
    badge.innerText = userRole === 'admin' ? 'Admin' : 'Operador';
    badge.className = `role-badge ${userRole === 'admin' ? 'role-admin' : 'role-user'}`;

    if (userRole !== 'admin') {
        const btnExportar = document.getElementById('btn-exportar');
        if (btnExportar) btnExportar.style.display = 'none';
    }
}

const form = document.getElementById('lavagem-form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const lavagem = {
        id: Date.now(),
        veiculo: document.getElementById('veiculo').value.toUpperCase(),
        responsavel: document.getElementById('responsavel').value,
        data: document.getElementById('data').value
    };
    const lavagens = JSON.parse(localStorage.getItem('lavagens') || '[]');
    lavagens.push(lavagem);
    localStorage.setItem('lavagens', JSON.stringify(lavagens));
    form.reset();
    exibirLavagens();
});

function exibirLavagens() {
    const lavagens = JSON.parse(localStorage.getItem('lavagens') || '[]');
    const lista = document.getElementById('lista-lavagens');
    lista.innerHTML = '';

    lavagens.sort((a, b) => new Date(b.data) - new Date(a.data)); // Ordenar por data recente

    lavagens.forEach(item => {
        const tr = document.createElement('tr');
        const acaoBtn = userRole === 'admin' 
            ? `<td class="admin-only"><button class="btn-delete" onclick="removerLavagem(${item.id})">Excluir</button></td>`
            : `<td class="admin-only">-</td>`;

        tr.innerHTML = `
            <td>${item.veiculo}</td>
            <td>${item.responsavel}</td>
            <td>${item.data.split('-').reverse().join('/')}</td>
            ${acaoBtn}
        `;
        lista.appendChild(tr);
    });

    if (userRole !== 'admin') {
        document.querySelectorAll('.admin-only').forEach(el => el.style.display = 'none');
    }
    
    atualizarDashboard();
    verificarPendencias();
}

function removerLavagem(id) {
    let lavagens = JSON.parse(localStorage.getItem('lavagens') || '[]');
    lavagens = lavagens.filter(l => l.id !== id);
    localStorage.setItem('lavagens', JSON.stringify(lavagens));
    exibirLavagens();
}

function atualizarDashboard() {
    const lavagens = JSON.parse(localStorage.getItem('lavagens') || '[]');
    const hoje = new Date().toISOString().split('T')[0];
    
    document.getElementById('total-lavagens').innerText = lavagens.length;
    document.getElementById('lavagens-hoje').innerText = lavagens.filter(l => l.data === hoje).length;
    
    if(lavagens.length > 0) {
        const counts = {};
        lavagens.forEach(l => counts[l.responsavel] = (counts[l.responsavel] || 0) + 1);
        const top = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
        document.getElementById('lavador-destaque').innerText = top;
    }
}

function verificarPendencias() {
    const lavagens = JSON.parse(localStorage.getItem('lavagens') || '[]');
    const listaPendentes = document.getElementById('lista-pendentes');
    const secaoAlerta = document.getElementById('alerta-frota');
    const hoje = new Date();
    
    listaPendentes.innerHTML = '';
    let temPendente = false;

    todosOsAtivos.forEach(ativo => {
        const registros = lavagens.filter(l => l.veiculo === ativo);
        let diffDias = 999;

        if (registros.length > 0) {
            registros.sort((a, b) => new Date(b.data) - new Date(a.data));
            const ultima = new Date(registros[0].data);
            diffDias = Math.floor((hoje - ultima) / (1000 * 60 * 60 * 24));
        }

        if (diffDias >= 3) {
            temPendente = true;
            const nivel = diffDias >= 6 ? 'status-vermelho' : 'status-amarelo';
            listaPendentes.innerHTML += `<div class="badge-pendente ${nivel}">${ativo} (${diffDias >= 999 ? 'Sem registro' : diffDias + ' dias'})</div>`;
        }
    });

    secaoAlerta.style.display = temPendente ? 'block' : 'none';
}

function exportarExcel() {
    const dados = JSON.parse(localStorage.getItem('lavagens') || '[]');
    const ws = XLSX.utils.json_to_sheet(dados.map(l => ({ "Veículo": l.veiculo, "Responsável": l.responsavel, "Data": l.data })));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Lavagens");
    XLSX.writeFile(wb, "Relatorio_SGL.xlsx");
}

function logout() {
    localStorage.removeItem('sgl_acesso');
    localStorage.removeItem('sgl_role');
    localStorage.removeItem('sgl_user_display');
    window.location.href = 'login.html';
}