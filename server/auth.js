function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
}

function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

const signupForm = document.getElementById("signupForm");

if (signupForm) {
  signupForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = signupName.value.trim();
    const email = signupEmail.value.trim();
    const password = signupPassword.value.trim();

    let users = getUsers();

    if (users.find(user => user.email === email)) {
      alert("User already exists!");
      return;
    }

    users.push({ name, email, password });
    saveUsers(users);

    alert("Signup successful!");
    window.location.href = "Login.html";
  });
}

const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = loginEmail.value.trim();
    const password = loginPassword.value.trim();

    let users = getUsers();

    const user = users.find(
      u => u.email === email && u.password === password
    );

    if (!user) {
      alert("Invalid credentials!");
      return;
    }

    localStorage.setItem("currentUser", JSON.stringify(user));
    window.location.href = "Dashboard.html";
  });
}
