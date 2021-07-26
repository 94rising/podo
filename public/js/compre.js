const ctx = document.getElementById('myChart');
const compreData = [];
let Mixed ;
let Positive ;
let Neutral ;
let Negative ;



window.addEventListener('DOMContentLoaded', (event) => {
console.log('gagasga')

    postData('/compre', {

   })
    .then(response => { 
     console.log(JSON.stringify(response))
     console.log(response)

        Mixed = response.compreList[0].Mixed;
        Positive = response.compreList[0].Positive;
        Neutral = response.compreList[0].Neutral;
        Negative = response.compreList[0].Negative;



    console.log(response.compreList[0].Mixed)
 

	const myChart = new Chart(ctx, {

		type: 'doughnut',
		data: {
			labels: ['혼합', '긍정', '보통', '부정'],
			datasets: [{
				label: '# of Votes',
				data: [Mixed, Positive, Neutral, Negative],
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