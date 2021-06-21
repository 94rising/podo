import {getData} from './util/util.js';

const diaryListBody = document.getElementById("diary_list_body");


window.addEventListener('DOMContentLoaded', (event) => {
    // Example POST method implementation:
    getData('/diary/listData', {})
    .then(response => {
        const diaryList = response.diaryList;
        
        console.log("response : " + response); //데이터 옴
        console.log("diaryList : " + JSON.stringify(diaryList));
        for (let i = 0; i < diaryList.length; i++) {
            const diary = diaryList[i];
            diaryListBody.innerHTML= 
            `
            <td><a href="/?diary=${diary.date}">${diary.date}, ${diary.emotion}</a></td> 
            <td>${diary.emotion}</td>


            ` //diary=1 .. 1부분에 number 작성 .. number : 자동증가되는 DB 유니크키 
            
        }
            
    })// JSON-string from `response.json()` call
   .catch(error => console.error(error));

});

