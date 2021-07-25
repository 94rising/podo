const content2 = document.getElementById('content');

const aa = document.getElementById('aa');


document.getElementById('aa').addEventListener('click', function () {

    console.log('확인 : ' + content2.value)
    
    const content = content2.value.replace(/(\r\n\t|\n|\r\t)/gm,"");
    console.log('확인2 : ' + content)

    
    postData('/compre', {
      content:content,
   })
    .then(response => { 
     
 
 
 
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