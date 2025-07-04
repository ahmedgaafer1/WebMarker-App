var emailname = document.getElementById("emailname");
var password = document.getElementById("password");

var loginbtn = document.getElementById("loginbtn");
var accounts = [];

if (localStorage.getItem('accounts') != null) {
    accounts = JSON.parse(localStorage.getItem('accounts'));
};

document.getElementById("signup").addEventListener('click',function(){
    window.location = "./signup.html"
} );


function login(name) {
    var emterm = emailname.value;
    var passterm = password.value;
    for (var i = 0; i < accounts.length; i++) {
      if (accounts[i].email === emterm && accounts[i].password === passterm) {
         
        
        
        Swal.fire({
          icon: "success",
          title: "Good job!",
          text: "Welcome",
        });
        localStorage.setItem("sessionusername" , JSON.stringify(accounts[i].name));
        window.location = "./home.html";
        return;
      }
      }
      if (emterm==""&& passterm=="") {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Empty data ?!",  
          }); 
      }
      else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Incorrect email or password!",
    });
      }
  
  }


loginbtn.addEventListener('click' , function() {
    login();
  
});