const currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (!currentUser) {
  window.location.href = "Login.html";
}

document.getElementById("welcomeText").innerText =
  "Welcome, " + currentUser.name;

function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "Login.html";
}

function getAllTodos() {
  return JSON.parse(localStorage.getItem("todos")) || {};
}

function saveAllTodos(data) {
  localStorage.setItem("todos", JSON.stringify(data));
}

function getUserTodos() {
  const all = getAllTodos();
  return all[currentUser.email] || [];
}

function renderTodos() {
  const list = document.getElementById("todoList");
  list.innerHTML = "";

  getUserTodos().forEach((todo, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${todo}
      <button onclick="deleteTodo(${index})">Delete</button>
    `;
    list.appendChild(li);
  });
}

function addTodo() {
  const value = todoInput.value.trim();
  if (!value) return;

  const all = getAllTodos();
  const userTodos = getUserTodos();

  userTodos.push(value);
  all[currentUser.email] = userTodos;

  saveAllTodos(all);
  todoInput.value = "";
  renderTodos();
}

function deleteTodo(index) {
  const all = getAllTodos();
  const userTodos = getUserTodos();

  userTodos.splice(index, 1);
  all[currentUser.email] = userTodos;

  saveAllTodos(all);
  renderTodos();
}

renderTodos();
