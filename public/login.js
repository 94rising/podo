
const id = document.querySelector("#id");
const password = document.querySelector("#password");
const loginBtn = document.querySelector("#loginBtn");
// joinBtn = document.querySelector("joinBtn");

loginBtn.addEventListener("click", login);

function login() {
   const req = { 
    id : id.value,
    password : password.value,
    };
    console.log(req);

    
}

