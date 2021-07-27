const content = document.getElementById('content');
const submitBtn = document.querySelector("#submitBtn");
const dateBar = document.querySelector("#dateBar");
const header = document.querySelector("#header");


const ctx = document.getElementById('myChart');

const keyWord1 = document.getElementById('keyWord1');
const keyWord2 = document.getElementById('keyWord2');
const keyWord3 = document.getElementById('keyWord3');
const keyWord4 = document.getElementById('keyWord4');
const keyWord5 = document.getElementById('keyWord5');

let compreObj;


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
        header.innerHTML = data.name +'님 일기 작성';


        console.log(data.date);
        dateBar.value = data.date;
        console.log(data.diaryList)
        let diary = data.diaryList;

        const aa = 'dasda';

        for (let i = 0; i < diary.length; i++) { // 
            if (diary[i].date == data.date) {
                content.value = diary[i].content;
                compreObj = data.diaryList[i];

                break;
            }


       //if(data.date == data.diary[date]) 
     }
     doughnutChart(compreObj);
     KeyPhraseText(compreObj);
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


function doughnutChart () {
console.log(compreObj.Mixed)
	const myChart = new Chart(ctx, {

		type: 'doughnut',
		data: {
			labels: ['혼합', '긍정', '보통', '부정'],
			datasets: [{
				label: '# of Votes',
				data: [compreObj.Mixed, compreObj.Positive, compreObj.Neutral, compreObj.Negative],
				backgroundColor: [
					'rgba(255, 99, 132, 0.2)',
					'rgba(54, 162, 235, 0.2)',
					'rgba(255, 206, 86, 0.2)',
					'rgba(75, 192, 192, 0.2)',
					
				],
				borderColor: [
					'rgba(255, 99, 132, 1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(75, 192, 192, 1)',
					
				],
				borderWidth: 1
			}]
		},
		options: {
			responsive: false,
			scales: {
				yAxes: [{
					ticks: {
						beginAtZero: true
					}
				}]
			},
		}
	});
}

function KeyPhraseText () {
    
    if(compreObj.phrase1 !=='' )keyWord1.innerHTML = '# '+ compreObj.phrase1
    if(compreObj.phrase2 !=='' )keyWord2.innerHTML = '# '+ compreObj.phrase2
    if(compreObj.phrase3 !=='' )keyWord3.innerHTML = '# '+ compreObj.phrase3
    if(compreObj.phrase4 !=='' )keyWord4.innerHTML = '# '+ compreObj.phrase4
    if(compreObj.phrase5 !=='' )keyWord5.innerHTML = '# '+ compreObj.phrase5

    
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