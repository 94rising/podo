
const id = document.querySelector("#id");
const password = document.querySelector("#password");
const loginBtn = document.querySelector("#loginBtn");
const joinBtn = document.querySelector("#joinBtn");

document.getElementById('joinBtn').addEventListener('click', function(){
    location.href = "/join"
  
})
document.getElementById('loginBtn').addEventListener('click', function(){

    const id = document.getElementById('id').value;
    const password = document.getElementById('password').value;
     // Example POST method implementation:
     postData('/login', {
         id: id,
         password: password,
         
        })
     .then(data => {
         console.log(JSON.stringify(data))
         
         if (data.result) {
               location.href = '/';
             } else {
                 alert(" 아이디 혹은 비밀번호를 확인해주세요. ");
                 
             }
             
         })// JSON-string from `response.json()` call
         .catch(error => console.error(error));
});






function postData(url = '', data = {}) {
    // Default options are marked with *
      return fetch(url, {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, cors, *same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, *same-origin, omit
          headers: {
              'Content-Type': 'application/json',
              // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: 'follow', // manual, *follow, error
          referrer: 'no-referrer', // no-referrer, *client
          body: JSON.stringify(data), // body data type must match "Content-Type" header
      })
      .then(response => response.json()); // parses JSON response into native JavaScript objects
  }







