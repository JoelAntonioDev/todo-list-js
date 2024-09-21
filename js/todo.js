class Todo{
    constructor(todoForm, todoInput, todoList, editForm, editInput, cancelEditBtn){
        this.todoForm = todoForm;
        this.todoInput = todoInput;
        this.todoList = todoList;
        this.editForm = editForm;
        this.editInput = editInput;
        this.cancelEditBtn = cancelEditBtn;
    }

    criarMensagemQuandoEmptyList(){
        if (todoList.children.length==0) {
            const todoEmpty = document.createElement('div')
            todoEmpty.classList.add("todo-list-empty")
            const titulo = document.createElement('h4')
            titulo.textContent = "Aqui aparecerão as tuas tarefas"
            todoEmpty.appendChild(titulo)
            todoList.appendChild(todoEmpty)
        }
    }

    saveTodo(texto){
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
        this.verificarElementosNaLista()
    }

    toggleForms ()  {
        editForm.classList.toggle("hide")
        todoForm.classList.toggle("hide");
        todoList.classList.toggle("hide")
    }
    
    updateTodo(texto) {
        const todos = document.querySelectorAll(".todo")
        todos.forEach((todo) => {
            let todoTitle = todo.querySelector("h3")
            if (todoTitle.innerText == oldInputValue) {
                todoTitle.innerText = texto
            }
        })
    }
    
    verificarElementosNaLista(){
        let nodes = todoList.children
        let vazio = true
        console.log('info:',todoList.children)
        for(let i=0;i<nodes.length;i++){
            console.log(nodes[i].className)
            if(nodes[i].className=="todo"){
                if(document.querySelector(".todo-list-empty"))
                document.querySelector(".todo-list-empty").remove() 
                vazio=false
            }
        }
        if(vazio){
            this.criarMensagemQuandoEmptyList()
        }
    }
}