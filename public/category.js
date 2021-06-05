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


    // AJAX START
    const xhr = new XMLHttpRequest();
    
    // params : 요청 방식, 요청 경로, 동기/비동기 여부(서버에서 데이터 받을 때 까지 대기 여부, true일 경우 비동기)
    xhr.open("POST", '/catergoryAdd', true);
    
    // 서버에 데이터를 보내는 부분
    //Send the proper header information along with the request
    xhr.setRequestHeader("Content-Type", "application/json"); // 서버에 보낼 데이터 타입 정의
    // 보낼 데이터
    const sendData = {
        id: id
        //카테고리 넘버로 변환해서 들어가야 하나? 
    };
    
    xhr.send(JSON.stringify(sendData)); // 객체를 json타입으로 변환 후, 서버에 데이터 전송
    xhr.responseType = "json";
    // 서버에서 데이터를 받는 부분               //fetch로 사용해야 할 듯 ?
    xhr.onreadystatechange = function() { // Call a function when the state changes.
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
          // Request finished. Do processing here.
          res = xhr.response;
          if (res.result) { 
            location.href = '/category'
          } else {
            alert("카테고리 생성 실패."); // 10개 초과일때 표시해줘야 할듯
          }
        }
    }
    // AJAX END
  })

  
  document.getElementById('categoryDelete').addEventListener('click', function(){   


    // AJAX START
    const xhr = new XMLHttpRequest();
    
    // params : 요청 방식, 요청 경로, 동기/비동기 여부(서버에서 데이터 받을 때 까지 대기 여부, true일 경우 비동기)
    xhr.open("POST", '/categoryDelete', true);
    
    // 서버에 데이터를 보내는 부분
    //Send the proper header information along with the request
    xhr.setRequestHeader("Content-Type", "application/json"); // 서버에 보낼 데이터 타입 정의
    // 보낼 데이터
    const sendData = {
        id: id
        //카테고리 넘버로 변환해서 들어가야 하나? 
    };
    
    xhr.send(JSON.stringify(sendData)); // 객체를 json타입으로 변환 후, 서버에 데이터 전송
    xhr.responseType = "json";
    // 서버에서 데이터를 받는 부분               //fetch로 사용해야 할 듯 ?
    xhr.onreadystatechange = function() { // Call a function when the state changes.
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
          // Request finished. Do processing here.
          res = xhr.response;
          if (res.result) { 
            location.href = '/category'
          } else {
            alert("카테고리 삭제 실패."); // 10개 초과일때 표시해줘야 할듯
          }
        }
    }
    // AJAX END
  })
