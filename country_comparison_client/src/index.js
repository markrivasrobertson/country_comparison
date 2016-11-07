import React from 'react';
import ReactDOM from 'react-dom';
import request from 'superagent';

function checkIt(num1, num2, stat) {
  let value1 = 0;
  let value2 = 0;
  let values = []
  request.get(`http://localhost:3000/api/v1/countries/${num1}`)
    .then((responseOne) => {
      request.get(`http://localhost:3000/api/v1/countries/${num2}`)
        .then((responseTwo) => {
          const parsedResponseOne = JSON.parse(responseOne.text);
          value1 = parsedResponseOne[stat];
          value1 ? values.push(value1) : values.push(0);

          const parsedResponseTwo = JSON.parse(responseTwo.text);
          value2 = parsedResponseTwo[stat];
          value2 ? values.push(value2) : values.push(0);

          const x = d3.scaleLinear()
            .domain([0, d3.max(values)])
            .range([0, 600])

          const comparisonChart = d3.select('.root')
            .selectAll('rect')
              .data(values)
            .enter().append('rect')
              .style('height', '20px')
              .style('width', 0)
              .style('background-color', '#ff0000')
              .text(function(d) {
                console.log(d);
                return (d===null || d===undefined || d===0) ? '?' : Math.round(d);
              })

          comparisonChart.transition()
            .style('width', function(d) {
              return `${x(Math.round(d))}px`;
            })
            // .attr('x', function(d) {
            //   return width - x(d);
            // })
            .duration(700)
            .delay(100)
        })
    })
  }
  //   // .then(request.get(`http://localhost:3000/api/v1/countries/${num2}`))
  //   // .then((responseTwo) => {
  //   //   console.log(responseTwo);
  //   //   const parsedResponseTwo = JSON.parse(responseTwo.text);
  //   //   console.log(`parsedResponseTwo is ${parsedResponseTwo}`);
  //   //   value2 = parsedResponseTwo[stat];
  //   //   console.log(`value 2 is ${value2}`);
  //   //   value2 ? values.push(value2) : values.push(0);
  //   //   const x = d3.scaleLinear()
  //   //     .domain([0, d3.max(values)])
  //   //     .range([0, 600])
  //   //
  //   //   // this stuff is d3 graph generation, and it doesn't seem to be the problem

  //   // })
// }

const button = document.getElementById('testButton');
button.addEventListener('click', () => {
  document.querySelector('.root').innerHTML = '';
  const selectItemOne = document.getElementById('countriesSelectOne');
  const selectItemTwo = document.getElementById('countriesSelectTwo');
  const statItem = document.getElementById('statisticsList');
  const valueOne = selectItemOne.value;
  const valueTwo = selectItemTwo.value;
  const stat = statItem.value;
  checkIt(valueOne, valueTwo, stat);
});

const countriesList =
['Afghanistan',
'Albania',
'Algeria',
'Andorra',
'Angola',
'Antigua and Barbuda',
'Argentina',
'Armenia',
'Australia',
'Austria',
'Azerbaijan',
'Bahamas',
'Bahrain',
'Bangladesh',
'Barbados',
'Belarus',
'Belgium',
'Belize',
'Benin',
'Bhutan',
'Bolivia',
'Bosnia and Herzegovina',
'Botswana',
'Brazil',
'Brunei',
'Bulgaria',
'Burkina Faso',
'Burundi',
'Cambodia',
'Cameroon',
'Canada',
'Cape Verde',
'Central African Republic',
'Chad',
'Chile',
'China',
'Colombia',
'Comoros',
'Congo, Dem. Rep.',
'Congo, Rep.',
'Costa Rica',
'Cote d\'Ivoire',
'Croatia',
'Cuba',
'Cyprus',
'Czech Republic',
'Denmark',
'Djibouti',
'Dominica',
'Dominican Republic',
'Ecuador',
'Egypt',
'El Salvador',
'Equatorial Guinea',
'Eritrea',
'Estonia',
'Ethiopia',
'Fiji',
'Finland',
'France',
'Gabon',
'Gambia',
'Georgia',
'Germany',
'Ghana',
'Greece',
'Grenada',
'Guatemala',
'Guinea',
'Guinea-Bissau',
'Guyana',
'Haiti',
'Honduras',
'Hungary',
'Iceland',
'India',
'Indonesia',
'Iran',
'Iraq',
'Ireland',
'Israel',
'Italy',
'Jamaica',
'Japan',
'Jordan',
'Kazakhstan',
'Kenya',
'Kiribati',
'North Korea',
'South Korea',
'Kuwait',
'Kyrgyz Republic',
'Lao',
'Latvia',
'Lebanon',
'Lesotho',
'Liberia',
'Libya',
'Liechtenstein',
'Lithuania',
'Luxembourg',
'"Macedonia, FYR"',
'Madagascar',
'Malawi',
'Malaysia',
'Maldives',
'Mali',
'Malta',
'Marshall Islands',
'Mauritania',
'Mauritius',
'Mexico',
'"Micronesia, Fed. Sts."',
'Moldova',
'Monaco',
'Mongolia',
'Montenegro',
'Morocco',
'Mozambique',
'Myanmar',
'Namibia',
'Nauru',
'Nepal',
'Netherlands',
'New Zealand',
'Nicaragua',
'Niger',
'Nigeria',
'Norway',
'Oman',
'Pakistan',
'Palau',
'Palestine',
'Panama',
'Papua New Guinea',
'Paraguay',
'Peru',
'Philippines',
'Poland',
'Portugal',
'Qatar',
'Romania',
'Russia',
'Rwanda',
'St. Kitts and Nevis',
'St. Lucia',
'St. Vincent and the Grenadines',
'Samoa',
'San Marino',
'Sao Tome and Principe',
'Saudi Arabia',
'Senegal',
'Serbia',
'Seychelles',
'Sierra Leone',
'Singapore',
'Slovak Republic',
'Slovenia',
'Solomon Islands',
'Somalia',
'South Africa',
'South Sudan',
'Spain',
'Sri Lanka',
'Sudan',
'Suriname',
'Swaziland',
'Sweden',
'Switzerland',
'Syria',
'Taiwan',
'Tajikistan',
'Tanzania',
'Thailand',
'Timor-Leste',
'Togo',
'Tonga',
'Trinidad and Tobago',
'Tunisia',
'Turkey',
'Turkmenistan',
'Tuvalu',
'Uganda',
'Ukraine',
'United Arab Emirates',
'United Kingdom',
'United States',
'Uruguay',
'Uzbekistan',
'Vanuatu',
'Vatican City',
'Venezuela',
'Vietnam',
'Yemen',
'Zambia',
'Zimbabwe'
];

const statisticsList = {
  ag_pct: 'Agriculture as % of economy',
  age_marriage: 'Average Age of first marriage for Women ',
  unempl_rate: 'Unemployment rate',
  aid_received: 'Aid received',
  alcohol_consumption: 'Alcohol Consumption pp',
  hiv_deaths: 'HIV deaths',
  army: 'Armed forces total',
  breast_c: 'Breast cancer deaths',
  cell_phones: 'Cell phones',
  cervical_c: 'Cervical cancer deaths',
  children_pw: 'Children born per woman',
  co2_pp: 'co2 release per capita',
  coal_pp: 'Coal produced per capita',
  colon_c_m: 'Colon cancer deaths, men',
  colon_c_w: 'Colon cancer deaths, women',
  debt_for: 'Debt owed to foreign citizens and governemnts',
  elec_gen_pp: 'Electricity generation per capita',
  exp_prim: 'Expenditures on primary education',
  exp_sec: 'Expenditures on secondary education',
  exp_tert: 'Expenditures on tertiary education',
  exports: 'Exports',
  food_supply: 'Food supply',
  forest_a: 'Forest area',
  gdp_pp: 'GDP per capita',
  gdp_growth: 'GDP growth',
  hdi: 'Human development index',
  imp_san_acc: 'Improved sanitation access',
  imports: 'Imports',
  industry: 'Industry as % of economy',
  inf_mort: 'Infant mortality',
  inflation: 'Inflation',
  int_users: 'Internet users',
  life_exp: 'Life expectancy',
  liver_c_m: 'Liver cancer deaths, men',
  liver_c_f: 'Liver cancer deaths, women',
  lung_c_m: 'Lung cancer deaths, men',
  lung_c_f: 'Lung cancer deaths, women',
  malaria: 'Malaria deaths reported',
  mat_mort: 'Maternal mortality rate',
  mil_exp: 'Military expenditures',
  murder: 'Murders per 100,000',
  pop_den: 'Population density',
  pop_urb: 'Population living in Urban Areas',
  sex_rat: 'Sex ratio under 14',
  stomach_c_m: 'Stomach cancer deaths, men',
  stomach_c_f: 'Stomach cancer deaths, women',
  suicide_m: 'Suicides, men',
  suicide_f: 'Suicides, women',
  pop: 'Population',
}
function makeCountryList(listId) {
  countriesList.forEach((country) => {
    const selectList = document.getElementById(`${listId}`);
    const newOption = document.createElement('option');
    newOption.text = `${country}`;
    newOption.value = countriesList.indexOf(country)+1;
    selectList.appendChild(newOption);
  })
}
makeCountryList('countriesSelectOne');
makeCountryList('countriesSelectTwo');

function makeStatisticsList() {
  const statisticsListedArray = Object.keys(statisticsList);
  const selectList = document.getElementById('statisticsList');
  statisticsListedArray.forEach((stat) => {
    const newOption = document.createElement('option');
    newOption.text = `${statisticsList[stat]}`;
    newOption.value = stat;
    selectList.appendChild(newOption);
  })
}
makeStatisticsList();
