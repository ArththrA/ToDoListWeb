let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
let filtroAtual = 'todas';

function salvarTarefas() {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

function renderizarTarefas() {
    const lista = document.getElementById('lista');
    lista.innerHTML = '';

    tarefas.forEach((tarefa, index) => {
        if (filtroAtual === 'pendentes' && tarefa.concluida) return;
        if (filtroAtual === 'concluidas' && !tarefa.concluida) return;

        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.draggable = true;
        li.dataset.index = index;

        li.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', index);
        });

        li.addEventListener('dragover', (e) => {
            e.preventDefault();
            li.style.borderTop = '2px solid #007bff';
        });

        li.addEventListener('dragleave', () => {
            li.style.borderTop = '';
        });

        li.addEventListener('drop', (e) => {
            e.preventDefault();
            const draggedIndex = parseInt(e.dataTransfer.getData('text/plain'));
            const targetIndex = parseInt(li.dataset.index);
            moverTarefa(draggedIndex, targetIndex);
        });

        const span = document.createElement('span');
        span.textContent = tarefa.texto;
        if (tarefa.concluida) {
            span.style.textDecoration = 'line-through';
            span.style.color = 'gray';
        }

        span.style.cursor = 'pointer';
        span.onclick = () => {
            tarefa.concluida = !tarefa.concluida;
            salvarTarefas();
            renderizarTarefas();
        };

        const remover = document.createElement('button');
        remover.className = 'btn btn-danger btn-sm';
        remover.textContent = 'Remover';
        remover.onclick = () => {
            tarefas.splice(index, 1);
            salvarTarefas();
            renderizarTarefas();
        };

        li.appendChild(span);
        li.appendChild(remover);
        lista.appendChild(li);
    });
}

function adicionar() {
    const entrada = document.getElementById('entrada');
    const texto = entrada.value.trim();
    if (texto === '') return;

    tarefas.push({ texto, concluida: false });
    salvarTarefas();
    renderizarTarefas();

    entrada.value = '';
    entrada.focus();
}

function filtrarTarefas(filtro) {
    filtroAtual = filtro;
    renderizarTarefas();
}

function limparConcluidas() {
    tarefas = tarefas.filter(t => !t.concluida);
    salvarTarefas();
    renderizarTarefas();
}

function moverTarefa(fromIndex, toIndex) {
    const tarefaMovida = tarefas.splice(fromIndex, 1)[0];
    tarefas.splice(toIndex, 0, tarefaMovida);
    salvarTarefas();
    renderizarTarefas();
}

document.getElementById('botaoAdd').addEventListener('click', adicionar);
document.getElementById('filtroP').addEventListener('click', () => filtrarTarefas('pendentes'));
document.getElementById('filtroT').addEventListener('click', () => filtrarTarefas('todas'));
document.getElementById('filtroC').addEventListener('click', () => filtrarTarefas('concluidas'));
document.getElementById('limparConcluidas').addEventListener('click', limparConcluidas);

window.onload = renderizarTarefas;
