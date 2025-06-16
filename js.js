function adicionar() {
    const tarefa = document.getElementById('task-input');
    const tarefaCoisada = tarefa.value.trim();
  
    if ( tarefaCoisada === '') return;
  
    const li = document.createElement('li');
    li.textContent = tarefaCoisada;
  
    const remover = document.createElement('button');
    remover.textContent = 'Remover';
    remover.onclick = () => li.remove();
  
    li.appendChild(remover);
  
    document.getElementById('task-list').appendChild(li);
  
    tarefa.value = '';
    tarefa.focus();
}

const botaoAdd = document.getElementById('botaoAdd');

botaoAdd.addEventListener('click', addTask);


  