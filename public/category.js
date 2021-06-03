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
    
