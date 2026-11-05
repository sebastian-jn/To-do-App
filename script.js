const form = document.querySelector("#task-form");
const input = document.querySelector("#task-input");
const list = document.querySelector("#task-list");

let tasks = [];

try {
    tasks = JSON.parse(localStorage.getItem("tasks")) || [];
} catch (e) {
    tasks = [];
}

function save() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function render() {
    list.innerHTML = "";
    tasks.forEach(function (task, index) {
        const li = document.createElement("li");
        if (task.done) li.classList.add("done");
        
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.done;
        checkbox.addEventListener("change", function () {
            task.done = checkbox.checked;
            save();
            render();
        });

        const span = document.createElement("span");
        span.textContent = task.text;

        const del = document.createElement("span");
        del.textContent = "❌";
        del.className = "delete";
        del.addEventListener("click", function () {
            tasks.splice(index, 1);
            save();
            render();
        });

        li.append(checkbox, span, del);
        list.appendChild(li);
    });
}

form.addEventListener("submit", function (event) {
    event.preventDefault();
    const text = input.value.trim();
    if (text === "") return;
    tasks.push({ text: text, done: false });
    save();
    input.value = "";
    render();
});

render();