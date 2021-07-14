import {getData} from './util/util.js';

const diaryListBody = document.getElementById("diaryListBody");
const feed = document.getElementsByClassName('feed')


window.addEventListener('DOMContentLoaded', async (event) => {
    // Example POST method implementation:
    getData('/diary/listData', {})
    .then(response => {
        const diaryList = response.diaryList;
  
        
        

        console.log("response : " + response); //데이터 옴
        console.log("diaryList : " + JSON.stringify(diaryList));
        for (let i = 0; i < diaryList.length; i++) {
            console.log(diaryList[i].number);
            
            
         diaryListBody.innerHTML += 

                    `
        <td><a href="/diary?date=${diaryList[i].date}" style = "  text-decoration:none; ">  ${diaryList[i].date}</td> 
        <td>${diaryList[i].phrase}</td>
        <td>${emoji(diaryList[i])}</td>
         </a>
         
                    `
        }
            
    })// JSON-string from `response.json()` call
   .catch(error => console.error(error));

});


 function emoji (diaryList)  {

          
const smile = '<img width="50" height="50" src="https://notion-emojis.s3-us-west-2.amazonaws.com/v0/svg-twitter/1f601.svg">'
const natural = '<img width="50" height="50" src="https://notion-emojis.s3-us-west-2.amazonaws.com/v0/svg-twitter/1f610.svg">'
const bad = '<img width="50" height="50" src="https://notion-emojis.s3-us-west-2.amazonaws.com/v0/svg-twitter/2639-fe0f.svg">'

let emotion = '';
    if(diaryList.emotion == 1){
        emotion = smile; 
      }else if(diaryList.emotion == 2){
        emotion = natural;
      }else if(diaryList.emotion == 3){
        emotion = bad;
      }
      return  emotion;
}