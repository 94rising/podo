
const id = document.querySelector("#id");
const password = document.querySelector("#password");
const loginBtn = document.querySelector("#loginBtn");
const joinBtn = document.querySelector("#joinBtn");
const findBtn = document.querySelector("#findBtn");
const kakaoLogin = document.querySelector("#kakaoLogin");
const kakaoLogout = document.querySelector("#kakaoLogout");

document.getElementById('joinBtn').addEventListener('click', function(){
    location.href = "/join"
  
})


document.getElementById('findBtn').addEventListener('click', function(){
    location.href = "/find"
  
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





document.getElementById('kakaoLogin').addEventListener('click',  function(){
    
    getData('/login/kakaoUrl', data={})
        .then(response => {
            console.log(response)
            console.log(response.url)
            location.href = response.url;
        });


        // location.href = "https://kauth.kakao.com/oauth/authorize?client_id=20e2b296829e3514f9a490fc43a5b076&redirect_uri=http://localhost:3000/login/auth/kakao/callback&response_type=code";

    // getData('/login/kakao', data = {}) 
    //     .then(response => {
    //         console.log(JSON.stringify(response))
    //         console.log(response);
    //         console.log(response.body);

            
    //     })

    });  




 async function postData(url = '', data = {}) {
    // Default options are marked with *
     return fetch
       (url, {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, cors, *same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, *same-origin, omit
          headers:  {
              'Content-Type': 'application/json',
              // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: 'follow', // manual, *follow, error
          referrer: 'no-referrer', // no-referrer, *client
          body: JSON.stringify(data), // body data type must match "Content-Type" header
      })
      .then(response =>  response.json()); // parses JSON response into native JavaScript objects
  }






  function getData(url = '', data = {}) {
    // Default options are marked with *
        return fetch(url, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-type' : 'application/x-www-form-urlencoded;charset=utf-8',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client
        })
        .then(response => response.json()); // parses JSON response into native JavaScript objects
    }
