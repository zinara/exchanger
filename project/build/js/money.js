  // Copyright 2016 Google Inc.
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//      http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
  
       (function(){
        'use strict'; 
 
         var app = {
           isLoading : true,
           spinner: document.querySelector('.loader'),
           container: document.querySelector('#scroll')
         }

     $.when( $.ready ).then(function() {
        // Document is ready.
        if (app.isLoading) {
          app.spinner.setAttribute('hidden', true);
          app.container.removeAttribute('hidden');
          app.isLoading = false;
        };
        $('.offlinerow').css("display","none");
          app.addFrom();
          app.addTo();
      });


      document.getElementById('convert').addEventListener('click', function() {
        // convert currencies
        app.converter();
      });

      document.getElementById('retry').addEventListener('click', function(){
        app.networkState();
      })

  const newcountriesUrl = 'project/build/js/newcountries.json';

  // add object files to the currency-from objectstore
  
  app.addFrom =  async function(){
    try {
      let response = await fetch(newcountriesUrl);
      let datas = await response.json();
      return Promise.all(datas.map(function(data){
     //   console.log('Adding item: ', data);
        $('select:first').append(`<option value="${data.currencyId}" class="opt">${data.name} (${data.currencyId})</option>`)
     //    console.log('All items added successfully!');
    })
  )
    } catch (error) {
      console.log(error);
    }

  }

 // add object files to the currency-to objectStore
 app.addTo = async function () {
    try {
      let response = await fetch(newcountriesUrl);
      let datas = await response.json();
      return Promise.all(datas.map(function(data){
      //  console.log('Adding item: ', data);
        $('select:last').append(`<option value="${data.currencyId}" class="opt">${data.name} (${data.currencyId})</option>`)
       //  console.log('All items added successfully!');
      })
    )
    } catch (error) {
      console.log(error);
    }
}

app.converter = function() {
  $('#convert').text("Converting....");
  $('.cures').attr('value', '');
var  fromc = $('#Currfr').find('option:selected').attr('value');
var  toc = $('#Currto').find('option:selected').attr('value');
var query = `${fromc}_${toc}`;
console.log(query);
const convertUrl = `https://free.currencyconverterapi.com/api/v5/convert?q=${query}&compact=ultra`;
  return getFromNetwork(convertUrl)
   .then(showInPage)
   .catch(handleErrors);
}


// fetch url from network
function getFromNetwork(url) {
 return fetch(url).then(function(response){
   // validate response
    if (!response.ok) {
      throw Error(response.statusText);
    }
    // return response as json
    return response.json();
  });
}


// show returned value in DOM
function showInPage(valu) {
var  fromc = $('#Currfr').find('option:selected').attr('value');
var  toc = $('#Currto').find('option:selected').attr('value');
var query = `${fromc}_${toc}`;
  let calc = valu[query];
  let amount = $('.fores').val();
  let total = calc * amount;
  // move value to three decimal places
  $('.cures').attr('value',total.toFixed(3));
  $('#convert').text('Click to convert');
}
 
// handle errors
function handleErrors(error) {
  console.log('ERROR:',error);
  // show offline image
  $('.offlinerow').show();
  // return button to its former state
  $('#convert').text('Click to convert');
}

// check network state
app.networkState = function() {
  if (navigator.onLine) {
    $('.offlinerow').css("display", "block");
  }
}

}()); 
