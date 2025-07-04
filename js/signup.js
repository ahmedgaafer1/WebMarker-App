const username = document.getElementById("username");
const emailname = document.getElementById("emailname");
const password = document.getElementById("password");
const signupbtn = document.getElementById("signupbtn");
const alertexist = document.getElementById("alertexist");
const alertBox = document.getElementById("alert");
const closeBtn = document.getElementById("closeBtn");
const loginBtn = document.getElementById("login");
const signupForm = document.getElementById("signupForm");

let accounts = [];
function loadAccounts() {
  try {
    accounts = JSON.parse(localStorage.getItem("accounts")) || [];
  } catch (e) {
    accounts = [];
  }
}
loadAccounts();

function hideAlerts() {
  alertexist.classList.add("d-none");
  alertBox.classList.add("d-none");
}

function clearForm() {
  username.value = "";
  emailname.value = "";
  password.value = "";
  username.classList.remove("is-valid", "is-invalid");
  emailname.classList.remove("is-valid", "is-invalid");
  password.classList.remove("is-valid", "is-invalid");
}

function validateUsername() {
  const value = username.value.trim();
  const regex = /^[A-Za-z0-9_]{3,15}$/;
  if (value === "") {
    username.classList.remove("is-valid", "is-invalid");
    return false;
  }
  if (regex.test(value)) {
    username.classList.add("is-valid");
    username.classList.remove("is-invalid");
    return true;
  } else {
    username.classList.add("is-invalid");
    username.classList.remove("is-valid");
    return false;
  }
}

function validateEmail() {
  const value = emailname.value.trim();
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (value === "") {
    emailname.classList.remove("is-valid", "is-invalid");
    return false;
  }
  if (regex.test(value)) {
    emailname.classList.add("is-valid");
    emailname.classList.remove("is-invalid");
    return true;
  } else {
    emailname.classList.add("is-invalid");
    emailname.classList.remove("is-valid");
    return false;
  }
}

function validatePassword() {
  const value = password.value;
  const regex = /^[A-Z][A-Za-z0-9]{7,15}$/;
  if (value === "") {
    password.classList.remove("is-valid", "is-invalid");
    return false;
  }
  if (regex.test(value)) {
    password.classList.add("is-valid");
    password.classList.remove("is-invalid");
    return true;
  } else {
    password.classList.add("is-invalid");
    password.classList.remove("is-valid");
    return false;
  }
}

function checkAccountExists(email) {
  loadAccounts();
  return accounts.some(
    (acc) => acc.email.toLowerCase() === email.toLowerCase()
  );
}

username.addEventListener("input", function () {
  validateUsername();
  hideAlerts();
});
emailname.addEventListener("input", function () {
  validateEmail();
  hideAlerts();
});
password.addEventListener("input", function () {
  validatePassword();
  hideAlerts();
});
[username, emailname, password].forEach((input) => {
  input.addEventListener("focus", hideAlerts);
});
closeBtn.addEventListener("click", hideAlerts);

loginBtn.addEventListener("click", function (e) {
  e.preventDefault();
  window.location.href = "./index.html";
});

signupForm.addEventListener("submit", function (e) {
  e.preventDefault();
  hideAlerts();

  const nameVal = username.value.trim();
  const emailVal = emailname.value.trim();
  const passVal = password.value;

  if (!nameVal || !emailVal || !passVal) {
    alertBox.classList.remove("d-none");
    return;
  }

  const validName = validateUsername();
  const validEmail = validateEmail();
  const validPass = validatePassword();
  if (!validName || !validEmail || !validPass) {
    alertBox.classList.remove("d-none");
    return;
  }

  if (checkAccountExists(emailVal)) {
    alertexist.classList.remove("d-none");
    return;
  }

  const newAccount = {
    name: nameVal,
    email: emailVal,
    password: passVal,
    createdAt: new Date().toISOString(),
  };
  accounts.push(newAccount);
  localStorage.setItem("accounts", JSON.stringify(accounts));

  Swal.fire({
    icon: "success",
    title: " Account created successfully  !",
    text: "  you will be redirected to the login page",
    confirmButtonText: "Ok",
  }).then(() => {
    clearForm();
    window.location.href = "./index.html";
  });
});

document.addEventListener("DOMContentLoaded", () => {
  hideAlerts();
  username.focus();
});
