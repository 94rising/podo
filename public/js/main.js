
let current_year;
let current_month;

document.addEventListener('DOMContentLoaded', (event) => {
    current_year = (new Date()).getFullYear();
    current_month = (new Date()).getMonth() + 1;

    $("#year").val(current_year);
    $("#month").val(current_month);
  
  
    changeYearMonth(current_year,current_month);
//-------------------------------------------------------
 getData('/main', {})
    .then(response => {
        const mainList = response.result;
        




        console.log("response : " + mainList); //데이터 옴
        console.log("mainList : " + JSON.stringify(mainList));
        // // for (let i = 0; i < mainList.length; i++) {
        // //     const mainList = mainList[i];            
        // }
            
    })// JSON-string from `response.json()` call
   .catch(error => console.error(error)); 




});

// calendar 생성 시작
function checkLeapYear(year) {
    if(year%400 == 0) {
      return true;
    } else if (year%100 == 0) {
      return false;
    }else if (year == 0) {
      return true;
    }else {
      return false;
    }
  }

  function getFirstDayOfWeek(year, month) {
    if(month < 10) month = "0" + month;

    return (new Date(year+"-"+month+"-01")).getDay();
  }

  function changeYearMonth(year, month) {
    let month_day = [31,28,31,30,31,30,31,31,30,31,30,31];

    if(month == 2) {
      if(checkLeapYear(year)) month_day[1] = 29;
    }

    let first_day_of_week = getFirstDayOfWeek(year, month);
    let arr_calendar = [];
    for(let i=0 ; i<first_day_of_week ; i++){
      arr_calendar.push(""); //캘린더 시작일 빈 부분
    }

    for(let i=1 ; i<=month_day[month-1] ; i++){
      arr_calendar.push(String(i));
    }

    let remain_day = 7 - (arr_calendar.length%7); // 캘린더 끝나는 날짜 이후 빈 부분
    if(remain_day < 7) {
      for(let i=0 ; i<remain_day ; i++) {
        arr_calendar.push("");
      } 
    }

    renderCalendar(arr_calendar);
  }

  function renderCalendar(data){
    let h = [];
    for(let i=0 ; i<data.length ; i++) {
      if(i==0) {
        h.push('<tr>');

      }else if(i%7 == 0) {
        h.push('</tr>');
        h.push('<tr>');
      }

      
      h.push('<td onclick="setDate(' + data[i] + ');" style="cursor:pointer;">' + data[i] + emoji() + '</td>');
      
    }

    h.push('</tr>');

    

    $("#tb_body").html(h.join(""));
  }

  function setDate(day) { //날짜출력? 
    let month = current_month;
    if (month < 10) month = "0" + month;
    if(day<10) day = "0" + day;
    
    

    const date = current_year + "-" + month + "-" + day;
    location.href = "/diary?date=" + date;
    


  }

  function chageMonth(diff) {
    if(diff == undefined) {
      current_month = parseInt($("#month").val());
    }else {
      current_month = current_month + diff;

      if(current_month == 0) {
        current_year = current_year -1;
        current_month = 12;
      }else if(current_month == 13) {
        current_year = current_year + 1;
        current_month = 1;
      }
    }

    loadCalendar();
  }

  function loadCalendar() {
    $("#year").val(current_year);
    $("#month").val(current_month);
    changeYearMonth(current_year, current_month);
  }

// calendar 생성 종료

function emotionImage(){
	
  
  for (let i = 0; i < mainList.length; i++) {
	//document.getElementById("imgId").src = "b.PNG"; //https://song-yoshiii.tistory.com/9
  const emotionList = mainList[i];
	if(mainList.emotion == 1) document.getElementById("smile");
	if(mainList.emotion == 2) document.getElementById("natural");
  if(mainList.emotion == 3) document.getElementById("bad");



  return emotionList;
}}


const emoji = () => {
  
  const smile = document.getElementById("emo");
  const natural = document.getElementById("emo");
  const bad = document.getElementById("emo");

  smile.innerHTML= '<img width="50" height="50" src="https://notion-emojis.s3-us-west-2.amazonaws.com/v0/svg-twitter/1f601.svg">'
  natural.innerHTML= '<img width="50" height="50" src="https://notion-emojis.s3-us-west-2.amazonaws.com/v0/svg-twitter/1f610.svg">'
  bad.innerHTML= '<img width="50" height="50" src="https://notion-emojis.s3-us-west-2.amazonaws.com/v0/svg-twitter/2639-fe0f.svg">'

  const mainList = mainList[i];


  for (let i = 0; i < mainList.length; i++) {
  if(date == mainList.date) {

    for (let i = 0; i < mainList.length; i++) {
	    if(mainList.emotion == 1) smile.innerHTML;
	    if(mainList.emotion == 2) natural.innerHTML;
      if(mainList.emotion == 3) bad.innerHTML;

  return ; 
}}}}

console.log (typeof smile.innerHTML);
console.log (smile.innerHTML);

    
