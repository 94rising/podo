// import {getData, postData} from './util/util.js';

// const emotionBox = document.querySelector("emotionBox");
// const dateBox = document.getElementById("dateBox");
const header = document.querySelector("#header");
let dateValue = '';
let emotionValue = '';
const diaryListBody = document.getElementById("diaryListBody");
let prevOffset = 0;
let offset = 0;
let compreObj;

window.addEventListener('DOMContentLoaded', async (event) => {
    // Example POST method implementation:

    drawList(10);


});



window.addEventListener("scroll", async function () { // 스크롤이 두번 연속된다
  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
    if (prevOffset != offset) {
      drawList(5);
    } 
  }
});



function datedate(dateBox){
  
   dateValue = dateBox.value;
  console.log(' 확인 : ' + dateValue)
  diaryListBody.innerHTML = "";
  prevOffset = 0;
  offset = 0;
  drawList(10);
}

function emotionValueBox(emotionBox){
   emotionValue = emotionBox.value;
  console.log(' 확인 : ' + emotionValue)
  diaryListBody.innerHTML = "";
  prevOffset = 0;
  offset = 0;
  drawList(10);
}



 function drawList(limit){
  prevOffset = offset;


  postData('/diary/ListData', {
      offset : offset,
      limit : limit,
      dateValue : dateValue,
      emotionValue : emotionValue
    })
    .then( response =>{
      header.innerHTML = response.name +'님 다이어리 리스트';
      compreObj = response.diaryList[0];

        const diaryList = response.diaryList;

        console.log("response : " + response); //데이터 옴
        console.log("diaryList : " + JSON.stringify(diaryList));

        for (let i = 0; i < diaryList.length; i++) {
            console.log(diaryList[i].number);
            
            
          diaryListBody.innerHTML += 

                    `
        <td><a href="/diary?date=${diaryList[i].date}" style = "  text-decoration:none; ">  ${diaryList[i].date}</td> 
        <td>${KeyPhraseText(diaryList[i])}</td>
        <td>${emoji(diaryList[i])}</td>
         </a>
         
                    `
        }
            offset = offset + limit ;

    })// JSON-string from `response.json()` call
   .catch(error => console.error(error));
}


 function emoji (diaryList)  {

          
const smile = '<img width="50" height="50" src="https://notion-emojis.s3-us-west-2.amazonaws.com/v0/svg-twitter/1f601.svg">'
const neutral = '<img width="50" height="50" src="https://notion-emojis.s3-us-west-2.amazonaws.com/v0/svg-twitter/1f610.svg">'
const bad = '<img width="50" height="50" src="https://notion-emojis.s3-us-west-2.amazonaws.com/v0/svg-twitter/2639-fe0f.svg">'
const mixed = '<img width="50" height="50" src="https://notion-emojis.s3-us-west-2.amazonaws.com/v0/svg-twitter/1f643.svg">'

let emotion = '';
    if(diaryList.emotion == 'POSITIVE'){
        emotion = smile; 
      }else if(diaryList.emotion == 'NEUTRAL'){
        emotion = neutral;
      }else if(diaryList.emotion == 'NEGATIVE'){
        emotion = bad;
      }else if(diaryList.emotion == 'MIXED'){
        emotion = mixed;
      }
      return  emotion;
}




function KeyPhraseText (diaryList) {
  let phrase = '';
  if (diaryList.phrase1 !== '') phrase += '# ' + diaryList.phrase1;
  if (diaryList.phrase2 !== '') phrase += '# ' + diaryList.phrase2;
  if (diaryList.phrase3 !== '') phrase += '# ' + diaryList.phrase3;
  if (diaryList.phrase4 !== '') phrase += '# ' + diaryList.phrase4;
  if (diaryList.phrase5 !== '') phrase += '# ' + diaryList.phrase5;
  return phrase;
}






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







