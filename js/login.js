var emailname = document.getElementById("emailname");
var password = document.getElementById("password");
var loginbtn = document.getElementById("loginbtn");
var accounts = [];

if (localStorage.getItem("accounts") != null) {
  accounts = JSON.parse(localStorage.getItem("accounts"));
}

document.getElementById("signup").addEventListener("click", function () {
  window.location = "./signup.html";
});

function login() {
  var emterm = emailname.value.trim();
  var passterm = password.value.trim();

  if (emterm === "" || passterm === "") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please fill in all fields",
    }).then(() => {});
    return;
  }

  var account = accounts.find(
    (acc) => acc.email === emterm && acc.password === passterm
  );

  if (account) {
    Swal.fire({
      icon: "success",
      title: "Good job!",
      text: "Welcome",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.setItem("sessionusername", JSON.stringify(account.name));
        window.location = "./home.html";
      }
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Incorrect email or password",
      timer: 3000,
      timerProgressBar: true,
    });
  }
}

loginbtn.addEventListener("click", login);

document.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    login();
  }
});
