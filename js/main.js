
// SELEÇÃO DE ELEMENTOS
const todoForm = document.querySelector('#todo-form');
const todoInput = document.querySelector('#todo-input');
const todoList = document.querySelector('#todo-list');
const editForm = document.querySelector('#edit-form');
const editInput = document.querySelector('#edit-input');
const cancelEditBtn = document.querySelector('#cancel-edit-btn');
let oldInputValue;

const todoObj = new Todo(todoForm,todoInput, todoList,editForm, editInput,cancelEditBtn);

todoObj.verificarElementosNaLista()
todoObj.criarMensagemQuandoEmptyList()

// EVENTOS
todoForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const inputValue = todoInput.value
    if (inputValue) {
        console.log(inputValue)
        todoObj.saveTodo(inputValue)
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
        todoObj.verificarElementosNaLista()
    }
    if (targetEl.classList.contains("edit-todo")) {
        todoObj.toggleForms()
        editInput.value = todoTitle
        oldInputValue = todoTitle
    }
})

cancelEditBtn.addEventListener("click", (e) => {
    e.preventDefault();

    todoObj.toggleForms();
})

editForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const editInputValue = editInput.value

    if (editInputValue) {
        //actualizar
        todoObj.updateTodo(editInputValue)
    }
    todoObj.toggleForms()
})

