window.addEventListener( 'load', () => {

   
    const _navbar = document.createElement('div');
   _navbar.setAttribute('id') = "_navbar";
   document.body.prepend(_navbar);

    const xhr = new XMLHttpRequest();
      xhr.open('GET', 'http://localhost:3000/navbar', true);
      xhr.onreadystatechange = () => {
        if( xhr.readyState === 4 ) {
          
          console.log(xhr.response);  
          const fileSrc = xhr.responseText;
          console.log('undefiend ??? => ', fileSrc);
          document.getElementById('_navbar').innerHTML = fileSrc;
        }
      }
    xhr.send();
});

// const testFunc = () => { console.log('asdasd')}

// module.exports = {
//     testFunc,
// }