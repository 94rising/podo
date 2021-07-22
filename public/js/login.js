
const id = document.querySelector("#id");
const password = document.querySelector("#password");
const loginBtn = document.querySelector("#loginBtn");
const joinBtn = document.querySelector("#joinBtn");
const findBtn = document.querySelector("#findBtn");
let kakao_account ;

const kakao = document.querySelector("#kakaoLoginImg");
window.Kakao.init("320eb75ea03092912a492070f7665a73");



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


document.getElementById('kakaoLoginImg').addEventListener('click', async function (){ //클릭하는순간 데이터가 넘어가고 KakaoLogin 함수실행된다
   KakaoLogin ();   

   
      //카카오톡 이메일을 변수에 저장함

 });



    
  async function KakaoLogin  (){
   
    window.Kakao.Auth.login({
        scope:'profile_nickname, account_email',
        success:function (authObj){
            console.log(authObj);
             window.Kakao.API.request ({
                url:'/v2/user/me',
                success: res   => {
                  
                     kakao_account = res.kakao_account;
                    console.log(kakao_account);
                    console.log( ' 확인' + kakao_account.profile.nickname);
                    
                     kakaoLoginData();
                }
            });
            
        }

        
    });

}



  async function kakaoLoginData (){

    
     postData 
      ('/login/kakao', {
          
        kakao_account :  kakao_account,
            
    
            })
       .then (data => {
             console.log(JSON.stringify(data))
   
    
             if (data.result) {
                  location.href = '/';
                 } else {
                     alert(" 아이디 혹은 비밀번호를 확인해주세요. ");
                     
                 }
                 
             })// JSON-string from `response.json()` call
        .catch(error => console.error(error));
}

// function kakaoLogin() {
//     Kakao.init(process.env.KAKAO_KEY);
//     console.log(Kakao.isInitialized());
//     Kakao.Auth.login({
//       success: function (authObj) {
//         console.log(authObj);
//         fetch('api 주소', {
//           method: 'GET',
//           headers: {
//             Authorization: authObj.access_token,
//           },
//         })
//           .then(res => res.json())
//           .then(res => {
//             localStorage.setItem('access_token', res.access_token);
//             if (res.access_token) {
//               alert('로그인 성공!');
//               history.push('/');
//             } else {
//               alert('다시 확인해주세요');
//             }
//           });
//        },
//         fail: function (err) {
//         console.log('에러', err);
//         alert('로그인실패!');
//          },
//        });
//     }

    








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







