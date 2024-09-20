
//seleção de elementos
const todoForm = document.querySelector('#todo-form');
const todoInput = document.querySelector('#todo-input');
const todoList = document.querySelector('#todo-list');
const editForm = document.querySelector('#edit-form');
const editInput = document.querySelector('#edit-input');
const cancelEditBtn = document.querySelector('#cancel-edit-btn');
let oldInputValue;
let listEmpty = `<div id="todo-list-empty" >
                    <h4 >Aqui aparecerão as tuas tarefas</h4>
                </div>`



//funções
const criarMensagemQuandoEmptyList = ()=>{
    if (todoList.children.length==0) {
        const todoEmpty = document.createElement('div')
        todoEmpty.classList.add("todo-list-empty")
        const titulo = document.createElement('h4')
        titulo.textContent = "Aqui aparecerão as tuas tarefas"
        todoEmpty.appendChild(titulo)
        todoList.appendChild(todoEmpty)
    }
}
const saveTodo = (texto) => {

    const todo = document.createElement("div")
    todo.classList.add("todo")
    const todoTitle = document.createElement("h3")
    todoTitle.innerText = texto
    todoTitle.style.maxWidth = "100%";  // Garante que o título não ultrapasse o tamanho do container
    todoTitle.style.overflow = "hidden";  // Esconde o texto que ultrapassa o limite, se necessário
    todoTitle.style.wordWrap = "break-word";  // Quebra o texto se necessário
    todoTitle.style.whiteSpace = "normal";  // Permite quebras de linha se o texto for muito longo
    todo.appendChild(todoTitle)
    const doneBtn = document.createElement("button")
    doneBtn.classList.add("finish-todo")
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>'
    todo.appendChild(doneBtn)
    const editBtn = document.createElement("button")
    editBtn.classList.add("edit-todo")
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>'
    todo.appendChild(editBtn)
    const deleteBtn = document.createElement("button")
    deleteBtn.classList.add("remove-todo")
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>'
    todo.appendChild(deleteBtn)

    todoList.appendChild(todo)
    todoInput.value = ""
    todoInput.focus()
    verificarElementosNaLista()
}

const toggleForms = () => {
    editForm.classList.toggle("hide")
    todoForm.classList.toggle("hide");
    todoList.classList.toggle("hide")
}

const updateTodo = (texto) => {
    const todos = document.querySelectorAll(".todo")
    todos.forEach((todo) => {
        let todoTitle = todo.querySelector("h3")
        if (todoTitle.innerText == oldInputValue) {
            todoTitle.innerText = texto
        }
    })
}

const verificarElementosNaLista = ()=>{
    let nodes = todoList.children
    let vazio = true
    console.log(todoList.children)
    for(node of nodes){
        console.log(node.className)
        if(node.className=="todo"){
            if(document.querySelector(".todo-list-empty"))
            document.querySelector(".todo-list-empty").remove() 
            vazio=false
        }
    }
    if(vazio){
        criarMensagemQuandoEmptyList()
    }
}

//eventos
todoForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const inputValue = todoInput.value
    if (inputValue) {
        console.log(inputValue)
        saveTodo(inputValue)
    } else {
        alert('Tarefa não pode ser vazia')
    }
})

//Um event click global, para poder saber quem foi clicado.(Considerando que tem elementos que são gerados automaticamente)
document.addEventListener("click", (e) => {
    const targetEl = e.target
    //para pegar o elemento pai(div) mais próximo
    const parentEl = targetEl.closest("div")
    //titulo
    let todoTitle

    if (parentEl && parentEl.querySelector("h3")) {
        todoTitle = parentEl.querySelector("h3").innerText;
    }
    if (targetEl.classList.contains("finish-todo")) {
        console.log("Clicou para finalizar")
        //fazer toggle para fazer o activa/desactiva
        parentEl.classList.toggle("done")
    }

    if (targetEl.classList.contains("remove-todo")) {
        parentEl.remove()
        verificarElementosNaLista()
    }
    if (targetEl.classList.contains("edit-todo")) {
        toggleForms()
        editInput.value = todoTitle
        oldInputValue = todoTitle
    }
})

cancelEditBtn.addEventListener("click", (e) => {
    e.preventDefault();

    toggleForms();
})

editForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const editInputValue = editInput.value

    if (editInputValue) {
        //actualizar
        updateTodo(editInputValue)
    }
    toggleForms()
})

verificarElementosNaLista()
criarMensagemQuandoEmptyList()