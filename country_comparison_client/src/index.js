console.log('hooked up');

function checkIt(num1, num2) {
  $.ajax(`http://localhost:3000/api/v1/countries/${num1}`)
    .then((responseOne) => {
      console.log(responseOne);
      console.log('response 1');
    })
    .then($.ajax(`http://localhost:3000/api/v1/countries/${num2}`)
    .then((responseTwo) => {
      console.log(responseTwo);
      console.log('response 2');
    }));
}

const button = document.getElementById('testButton');
button.addEventListener('click', () => {
  checkIt(67, 39);
});
