const ctx = document.getElementById('myChart');
const keyWord1 = document.getElementById('keyWord1');
const keyWord2 = document.getElementById('keyWord2');
const keyWord3 = document.getElementById('keyWord3');
const keyWord4 = document.getElementById('keyWord4');
const keyWord5 = document.getElementById('keyWord5');

let compreObj;



window.addEventListener('DOMContentLoaded', (event) => {
console.log('gagasga')

    postData('/compre', {

   })
    .then(response => { 
     console.log(JSON.stringify(response))
     console.log(response)

     compreObj = response.compreList[0];


 
    doughnutChart();
    KeyPhraseText();



    })// JSON-string from `response.json()` call
   .catch(error => console.error(error));
   });
 

   
   

function doughnutChart () {

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
    keyWord1.innerHTML = compreObj.phrase1
    keyWord2.innerHTML = compreObj.phrase2
    keyWord3.innerHTML = compreObj.phrase3
    keyWord4.innerHTML = compreObj.phrase4
    keyWord5.innerHTML = compreObj.phrase5

    
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