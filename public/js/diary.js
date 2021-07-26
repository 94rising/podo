const content = document.getElementById('content');
const submitBtn = document.querySelector("#submitBtn");
const dateBar = document.querySelector("#dateBar");


 window.addEventListener('DOMContentLoaded', (event) => {
    // Example POST method implementation:
    fetch('/diary/load', {}) // fetch 디폴트 값 get방식 , 전달할 값 없음
    .then(response => {
        console.log(response);
        const responseJson = response.json();
        console.log( responseJson);
        return responseJson;
        // if (data) {
        //     console.log(res.result)
        //     } else {
        //         alert(" 해당 일자 데이터 없음. ");
                
        //     }
            
    })
    .then(data => { //
        console.log(data.date);
        dateBar.value = data.date;
        console.log(data.diaryList)
        let diary = data.diaryList;
        const aa = 'dasda';

        for (let i = 0; i < diary.length; i++) { // 
            if (diary[i].date == data.date) {
                content.value = diary[i].content;
                break;
            }
    

       //if(data.date == data.diary[date]) 
     }
         console.log(content.value) 

    })
    // JSON-string from `response.json()` call
    .catch(error => console.error(error));
});  

  document.getElementById('submitBtn').addEventListener('click', function(){
      const content2 = content.value.replace(/(\r\n\t|\n|\r\t)/gm,"");


     // Example POST method implementation:
     postData('/diary/write', {
        content: content.value,
        content2: content2
    })
     .then(data => {
         console.log(JSON.stringify(data)) 
         
         if (data.result) {
               location.href = '/compre';
             } else {
                 alert(" 작성 실패 ");
                 
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