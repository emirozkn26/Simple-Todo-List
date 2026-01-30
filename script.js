const doneCount = document.querySelector(".todo-done");
const progressCount = document.querySelector(".todo-on-progress")
const form = document.getElementById("todo-form");
const input = document.getElementById("input");
const todoList = document.getElementById("todos");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

function renderTodos() {
    todoList.innerHTML = "";

    let done = 0;
    let progress = 0;

    todos.forEach((todo, index) => {
        const li = document.createElement("li");

        const span = document.createElement("span");
        span.textContent = todo.text;

        if (todo.done) {
            span.style.textDecoration = "line-through";
            done++;
        } else {
            progress++;
        }

        const btnBox = document.createElement("div");
        btnBox.style.display = "flex";
        btnBox.style.gap = "5px";

        const apply = document.createElement("button");
        apply.className = "apply";

        if (todo.done) {
            apply.innerHTML = `<i class="fa-solid fa-check"></i>`;
            apply.style.padding = "7px";
            apply.textContent = "✓";
            apply.classList.add("checked");
        }
        apply.onclick = () => {
            todo.done = !todo.done;
            saveTodos();
            renderTodos();
        };


        const del = document.createElement("button");
        del.innerHTML = `<i class="fa-solid fa-trash"></i>`;
        del.className = "delete";
        del.onclick = () => {
            todos.splice(index, 1);
            saveTodos();
            renderTodos();
        };

        btnBox.appendChild(apply);
        btnBox.appendChild(del);

        li.appendChild(span);
        li.appendChild(btnBox);
        todoList.appendChild(li);
    });

    doneCount.textContent = done;
    progressCount.textContent = progress;
}

form.addEventListener("submit", e => {
    e.preventDefault();
    if (!input.value.trim()) return;

    todos.push({ text: input.value, done: false });
    saveTodos();
    renderTodos();
    input.value = "";
});

renderTodos();
