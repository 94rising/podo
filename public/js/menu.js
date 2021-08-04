window.Kakao.init("320eb75ea03092912a492070f7665a73");


const mainBtn = document.getElementById("mainBtn");
const listBtn = document.getElementById("listBtn");
const logoutBtn = document.getElementById("logoutBtn");
const podoLogo  = document.getElementById("podoLogo");



mainBtn.addEventListener("click", function() {
    location.href = "/";
});


listBtn.addEventListener("click", function() {
    location.href = "/diary/list";
});


podoLogo.addEventListener("click", function() {
    location.href = "/";
});






 logoutBtn.addEventListener("click", function() {
  // console.log(Kakao.Auth)
  // Kakao.Auth.logout();
  // Kakao.Auth.logout()
   getData('/menu/logout', {
   })
// .then(data => {
//     console.log(JSON.stringify(data))
//     if (data.result) {
//       location.href = "/";
//     } else {
    
//             alert(" 로그아웃 실패 ");
            
//         }
        
//     })// JSON-string from `response.json()` call
// .catch(error => console.error(error));

});




// Kakao.Auth.logout(function() {
//   if (Kakao.Auth.getAccessToken()) {
//        //토큰이 있으면
//        Kakao.API.request({
//          //로그아웃하고
//          url: '/v1/user/unlink',
//          success: function (response) {
//            //console.log(response)
//          },
//          fail: function (error) {
//            console.log(error)
//          },
//        })
//        //토큰도 삭제
//        Kakao.Auth.setAccessToken(undefined)
//        //유저정보도 삭제
//        const userinfoElem = document.querySelector('#userinfo') 
//        if(userinfoElem) userinfoElem.value = ''
//      }
 
//   });

  async function getData(url = '', data = {}) {
    // Default options are marked with *
        return fetch(url, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client
        })
        .then(response => response.json()); // parses JSON response into native JavaScript objects
    }