
let current_year;
let current_month;
let mainList;

document.addEventListener('DOMContentLoaded', (event) => {

   postData('/', {
     
  })
   .then(response => { 
    console.log(JSON.stringify(response))
    console.log( response)
    mainList = response.mainList;
    console.log( mainList ) //여기까지 찍힘
    const bb = 'bb';


    current_year = (new Date()).getFullYear();
    current_month = (new Date()).getMonth() + 1;
    

    $("#year").val(current_year);
    $("#month").val(current_month);


    changeYearMonth(current_year, current_month);


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

    

    h.push('<td onclick="setDate(' + data[i] + ');" style="cursor:pointer;">' + data[i] + emoji(data[i]) + '</td>');
    
    
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

function changeMonth(diff) {
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


function emoji(day) {

const smile = '<img width="50" height="50" src="https://notion-emojis.s3-us-west-2.amazonaws.com/v0/svg-twitter/1f601.svg">'
const natural = '<img width="50" height="50" src="https://notion-emojis.s3-us-west-2.amazonaws.com/v0/svg-twitter/1f610.svg">'
const bad = '<img width="50" height="50" src="https://notion-emojis.s3-us-west-2.amazonaws.com/v0/svg-twitter/2639-fe0f.svg">'





const date = current_year + "-" + current_month + "-" + day;
  //console.log(mainList[1].date);
  console.log('확인 : ' + date) //날짜만 표시됨...
  
for (let i = 0; i < mainList.length; i++) {
  // console.log(mainList[i].date)
  if(date == mainList[i].date) {
    if(mainList[i].emotion == 1)
    return smile; 
  }else if(mainList[i].emotion == 2){
    return natural
  }else if(mainList[i].emotion == 3){
    return bad;
  
}}}

console.log(emoji);
console.log(typeof emoji)
   


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