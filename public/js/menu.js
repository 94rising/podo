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
    
app.get('/logout',function(req, res){
    req.session.destroy(function(){
    req.session;
    });
    res.redirect('/');
    });
});



function kakaoLogout() {
    if (Kakao.Auth.getAccessToken()) {
      //토큰이 있으면
      Kakao.API.request({
        //로그아웃하고
        url: '/v1/user/unlink',
        success: function (response) {
          //console.log(response)
        },
        fail: function (error) {
          console.log(error)
        },
      })
      //토큰도 삭제
      Kakao.Auth.setAccessToken(undefined)
      //유저정보도 삭제
      const userinfoElem = document.querySelector('#userinfo') 
      if(userinfoElem) userinfoElem.value = ''
    }
  }