var UI = require('ui');
var ajax = require('ajax');
var URL = 'http://54.187.183.77';

var card = new UI.Card({
        title: 'Greenhouse Data',
        scrollable: true
      });

function makeRequest() {
  // Make the request
  ajax(
    {
      url: URL + '/api/0/dankmeme/all',
      type: 'json'
    },
    function(data) {
      if(!data.success) {
        var cardError = new UI.Card({
          title: 'Error',
          subtitle: 'No data on server'
        });
        cardError.show();
      }
      // Success! 
      console.log("Successfully fetched temperature data!");
      
       // Show to user
      card.body('Temp: ' + data.temperature.centigrade + 'C' + '/' + data.temperature.fahrenheit + 'F' + '/' + '\n' + data.temperature.kelvin + 'K' + '\n' +
      'Heat Index: ' + '\n' + data.temperature.heatindex + 'C' + '\n' +
      'Humidity: ' + '\n' + data.humidity + '%' +'\n' +
      'Dew Point: ' + '\n'+ data.dewpoint + 'C' + '\n' +
      'Light: ' + '\n' + data.light + ' lux');
      card.show();
      
      
    },
    function(error) {
      // Failure!
      
      console.log('Failed fetching weather data: ' + error);
    }
  );
}


setInterval(function() {
  makeRequest();
}, 2000);

makeRequest();
