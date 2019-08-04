class User {
    constructor(firstname, lastname, email, password, role) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        this.role = role;
    }
}
function registerUser(){
     let firstName = document.getElementById('firstName').value;
     let lastName = document.getElementById('lastName').value;
     let email = document.getElementById('email').value;
     let password = document.getElementById('password').value;
     let role = document.getElementById('role').value;
  if(localStorage.getItem('Email')){
  var emails = JSON.parse(localStorage.getItem('Email') || "[]");
  }
  else {
  var emails = [];
  }
  if(emails && emails.indexOf(email) !=-1)
  var userExists = true;
   else{
   
   emails.push(email);
   localStorage.setItem('Email', JSON.stringify(emails));
   }
  if(!userExists){
  let newUser = new User(firstName, lastName, email, password, role);
 if(localStorage.getItem('Users')) {
        let users = JSON.parse(localStorage.getItem('Users') || "[]");
        users.push(newUser);
        localStorage.setItem('Users', JSON.stringify(users));
    } else {
        localStorage.setItem('Users', JSON.stringify([newUser]));
    }
	document.getElementById('firstName').value = "";
	document.getElementById('lastName').value ="";
	document.getElementById('email').value = "";
	document.getElementById('password').value="";
	document.getElementById('role').value="";
	window.location.href = 'loginsignup.html'
        window.alert("User successfully created. Now login to continue.!");
}
else {
 window.alert("User Already Exists");
}

}
function loginUser() {
     var email = document.getElementById('username').value;
    var password = document.getElementById('username_pwd').value;
    var users = JSON.parse(localStorage.getItem('Users') || "[]");
    var user;
    var genuineUser = false;
    var i;
    for(i = 0; i < users.length; i++) {
        user = users[i];
        if(user.email === email && user.password === password) {
            genuineUser = true;
            break;
        }
		else if(user.email === email) {
			var wrongPass = true;
			break;
		}
    }
    if(genuineUser) {
        sessionStorage.setItem('currUserName', user.firstname);
        sessionStorage.setItem('currUserEmail', user.email);
        window.location = 'new6.html'
    } else {
        if(wrongPass)
		window.alert("Incorrect Password. Try Again!");
	    else
			window.alert("user does not exists");
    }
}