
document.getElementById("login").addEventListener('click',function(){
    window.location = "./index.html"
} );
var username = document.getElementById('username');
var emailname = document.getElementById('emailname');
var password = document.getElementById('password');
var signupbtn = document.getElementById('signupbtn');
var alertexist = document.getElementById('alertexist');

var alert = document.getElementById('alert');
var closeBtn = document.getElementById('closeBtn');
var accounts = [];

if (localStorage.getItem('accounts') != null) {
    accounts = JSON.parse(localStorage.getItem('accounts'));
};

function createaccount() {
    var emailterm = emailname.value;
    var usernameterm = username.value;
    var account = {
      name: username.value,
      email: emailname.value,
      password: password.value,
    };
  
    if (
      validationname() == true &&
      validationpassword() == true &&
      validationemail() == true
    ) {
      for (var i = 0; i < accounts.length; i++) {
        if (
          accounts[i].email.includes(emailterm) ||
          accounts[i].name.includes(usernameterm)
        ) {
          alertexist.classList.remove("d-none");
          return;
        }
      }
      accounts.push(account);
      alertexist.classList.add("d-none");
      swal("Good job!", "Welcome to our family", "success");
      localStorage.setItem("accounts", JSON.stringify(accounts));
      emailname.classList.remove("is-valid");
      username.classList.remove("is-valid");
      password.classList.remove("is-valid");
      cleardata();
    } 
    else if (
      validationname() != true ||
      validationpassword() != true ||
      validationemail() != true
    ) {
      alert.classList.remove("d-none");
      alertexist.classList.add("d-none");
    }
  }
// function createaccount() {
//     var emailterm = emailname.value;
//     var usernameterm = username.value;
//     var account = {
//         name: username.value ,
//         email: emailname.value ,
//         password: password.value
        
//     };
    
//     if (validationname() == true  && validationpassword() == true && validationemail() == true ) {
//         for (var i=0; i<accounts.length ; i++ ) {
//             if ( accounts[i].email.includes(emailterm) || accounts[i].name.includes(usernameterm ) ) {
//                 alertexist.classList.remove('d-none')
//                 return;
//             };
//          } ;
//             else {
//                 accounts.push(account);
//                 alertexist.classList.add('d-none')
//                 swal("Good job!", "Welcome to our family", "success");
//                 emailname.classList.remove('is-valid');
//                 username.classList.remove("is-valid");
//                 password.classList.remove("is-valid");
//                 cleardata();
//                 localStorage.setItem('accounts', JSON.stringify(accounts));
//                 return;
//             };
            
       
        
//     }
        
//      else if(validationname() != true || validationpassword() != true || validationemail() != true  ) {
//             alert.classList.remove("d-none");
//             alertexist.classList.add('d-none') ;  
//     };
// };

signupbtn.addEventListener('click' , function() {
    createaccount();
  
});
// user name validation
username.addEventListener('input', function() {
    validationname(); 
});
function validationname() {
    var text = username.value ;
    var regexname = /^[a-z]{3,15}$/g ;
    if (regexname.test(text)){

        username.classList.add('is-valid');
        username.classList.remove("is-invalid");
        return true ;
    }
    else if (text=="") {
        username.classList.remove("is-valid")
        username.classList.remove("is-invalid")
    // alert.classList.add("d-none");
    return false ;

    }
    else {
        username.classList.remove("is-valid")
        username.classList.add("is-invalid")
        return false ;
    }
};

// end validation
// passwordvalidation
password.addEventListener('input', function() {
    validationpassword(); 
});
    function validationpassword() {
        var pass = password.value ;
        var regexpass = /^[A-Z]{1}[0-9]{8,15}$/g ;
        if (regexpass.test(pass)){
    
            password.classList.add('is-valid');
            password.classList.remove("is-invalid");
            return true ;
        }
        else if (pass=="") {
            password.classList.remove("is-valid")
            password.classList.remove("is-invalid")
        
        return false ;
    
        }
        else {
            password.classList.add("is-invalid")
            password.classList.remove("is-valid")
            return false ;
        }
    };
    // end pass valid
    // email validation


    
    emailname.addEventListener('input', function() {
        validationemail(); 
    });
        function validationemail() {
            var mail = emailname.value ;
            var regexmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g ;
            if (regexmail.test(mail)){
        
                emailname.classList.add('is-valid');
                emailname.classList.remove("is-invalid");
                return true ;
            }
            else if (mail=="") {
                emailname.classList.remove("is-valid")
                emailname.classList.remove("is-invalid")
            
            return false ;
        
            }
            else {
                emailname.classList.add("is-invalid")
                emailname.classList.remove("is-valid")
                return false ;
            }
        };

        // alert closebtn 
        closeBtn.addEventListener('click', function() {
            alert.classList.add("d-none")
        });
function cleardata() {
    emailname.value ="";
     username.value ="";
     password.value="";
};