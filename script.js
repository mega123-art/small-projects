document.addEventListener("DOMContentLoaded", () => {
  const addTaskButtton = document.getElementById("addtodo");
  const todoInput = document.getElementById("form");
  const todoList = document.querySelector("ul");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => renderTasks(task));

  addTaskButtton.addEventListener("click", () => {
    const taskText = todoInput.value.trim();
    if (taskText === "") return;
    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
    };
    tasks.push(newTask);
    renderTasks(newTask)
    saveTasks();
    todoInput.value = "";
    console.log(tasks);
  });
  function renderTasks(task) {
    const div = document.createElement("div");
    div.setAttribute("id", "deletediv");
    div.setAttribute("data-id", task.id);

    const li = document.createElement("li");
    li.textContent = task.text;
    if(task.completed){
        li.style.textDecoration="line-through";
    }
    li.addEventListener("click",(e)=>{
        
    })

    const deleteBtn = document.createElement("button");
    deleteBtn.setAttribute("id", "deletebtn");
    deleteBtn.textContent = "delete";

    const doneBtn = document.createElement("button");
    doneBtn.setAttribute("id", "donebtn");
    doneBtn.textContent = "done";
    doneBtn.addEventListener("click", () => {
      task.completed = !task.completed;
      li.style.textDecoration = task.completed ? "line-through" : "none";
      saveTasks();
    });
    deleteBtn.addEventListener("click", () => {
      const index = tasks.findIndex((t) => t.id === task.id);
      if (index !== -1) {
        tasks.splice(index, 1);
        div.remove();
        saveTasks();
      }
    });

    div.appendChild(li);
    div.appendChild(deleteBtn);
    div.appendChild(doneBtn);
    todoList.appendChild(div);
  }
  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});
