const categoryAdd = document.querySelector("#categoryAdd");
const categoryDelete = document.querySelector("#categoryDelete");


window.addEventListener('DOMContentLoaded', (event) => {

    // AJAX START
    const xhr = new XMLHttpRequest();
    
    // params : 요청 방식, 요청 경로, 동기/비동기 여부(서버에서 데이터 받을 때 까지 대기 여부, true일 경우 비동기)
    xhr.open("get", '/category', false);
    
    // 서버에 데이터를 보내는 부분
    xhr.send(); // 객체를 json타입으로 변환 후, 서버에 데이터 전송
    
    //Send the proper header information along with the request
    xhr.responseType = "json";
    // 서버에서 데이터를 받는 부분
    xhr.onreadystatechange = function() { // 서버의 응답에 따른 로직을 여기에 작성
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
           // 요청 완료되면 여기서 처리
            res = xhr.response;
            if (res.result) {
              console.log(res.result)// 이상없이 응답 받았을때
            } else {
                alert("해당 카테고리 데이터 없음.");
            }
        }
    }
    // AJAX END    
    
    console.log('돔 로드 됨');
    });
    


  document.getElementById('categoryAdd').addEventListener('click', function(){

    const id = document.getElementById('id').value;


     // Example POST method implementation:
     postData('/categoryAdd', {id: id})
     .then(data => {
         console.log(JSON.stringify(data))
         
         if (data.result) {
               location.href = '/category';
               
             } else {
                 alert(" 카테고리 생성 실패 "); // 10개 초과일때 표시해줘야 할듯
                
                 
             }
             
         })// JSON-string from `response.json()` call
         .catch(error => console.error(error));
        });


document.getElementById('categoryDelete').addEventListener('click', function(){

    const id = document.getElementById('id').value;


     // Example POST method implementation:
     postData('/categoryDelete', {id: id})
     .then(data => {
         console.log(JSON.stringify(data))
         
         if (data.result) {
               location.href = '/category';
               
             } else {
                 alert(" 카테고리 삭제 실패 ");
                 
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




 /* categoryAdd => {
     catrgoryBtn(배열) 클릭하면  만들면서 db에 생성순서대로 번호부여
     
     글 생성하면  filterdiv 생성 , date / 감정 노출시키면서

} */