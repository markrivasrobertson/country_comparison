import React from 'react';
import ReactDOM from 'react-dom';
import request from 'superagent';

function checkIt(num1, num2) {
  let value = 0;
  let values = []
  request.get(`http://localhost:3000/api/v1/countries/${num1}`)
    .then((responseOne) => {
      const parsedResponse = JSON.parse(responseOne.text);
      value = parsedResponse.name;
      values.push(value);
      console.log(values);
      console.log('array');
    })
    .then(request.get(`http://localhost:3000/api/v1/countries/${num2}`)
    .then((responseTwo) => {
      const parsedResponse = JSON.parse(responseTwo.text);
      value = parsedResponse.name;
      values.push(value);
      console.log(values);
      console.log('array');
      d3.select('.root')
        .selectAll('div')
          .data(values)
        .enter().append('div')
          .style('height', '20px')
          .style("width", function(d) { return (d.length*10)+"px"; })
          .style('background-color', '#ff0000')
          .text(function(d) { return d; })
    }))
}

const button = document.getElementById('testButton');
button.addEventListener('click', () => {
  checkIt(67, 39);
});
