/* Lang() - should be separated one day...  */

var language = (navigator.language || navigator.userLanguage).split('-')[0];
var strings = {
  "en" : {
      "error":
      {
         "title" : "Error!",
         "body"  : "I do not seem to be able, to connect to the web!" 
      },
      "load":
      {
        "title" : "Please hold!",
        "body"  : "I am downloading data..." 
      },
    "stop":"Stops nearby",
    "distance":"Distance :",
    "to":" to "
  },
  "de" : {
      "error":
      {
         "title" : "Fehler!",
         "body"  : "Ich habe keine Internetverbindung!" 
      },
      "load":
      {
        "title" : "Bitte warten!",
        "body"  : "Ich lade Daten..." 
      },
    "stop":"Nahe Stationen",
    "distance":"Distanz :",
    "to":" nach "
  }
};


/* Main() */

var UI = require('ui');
var Ajax = require('ajax');
var Moment = require('moment');
    Moment.locale(language);

var error = new UI.Card({
      title: strings[language].error.title,
      body : strings[language].error.body,
      style: 'small'
});

var load = new UI.Card({
      title: strings[language].load.title,
      body : strings[language].load.body,
      style: 'small'
});

load.show();

navigator.geolocation.getCurrentPosition(function(position){
 showLocation(position); 
}, function(e){
    error.show();
});

function showLocation(position) {
  error.hide();
  var latitude     = position.coords.latitude;
  var longitude    = position.coords.longitude;
  var haltestellen = new UI.Menu({
    sections: [{
      title: strings[language].stop
    }]
  });
  haltestellen.on('select', function(e) {
    if(e.item.title !== undefined){
      console.log(e.item.stopId);
      console.log(e.item);
      load.show();
      Ajax(
      {
        url: 'http://transport.opendata.ch/v1/stationboard?id=' + e.item.stopId,
        type: 'json',
        cache: false,
        async: true
      },
        function(data){
          var i = 0;
          var timetable = new UI.Menu({
            sections: [{
             title: e.item.title
            }]
          });
          data.stationboard.forEach(function(data){ 
            timetable.item(0, i++, 
            { 
              title   : data.number + strings[language].to + data.to, 
              subtitle: (typeof data.stop.prognosis  !== 'undefined') ? Moment(data.stop.prognosis.departure).fromNow() : Moment(data.stop.departureTimestamp).format('HH:mm')
            });  
          });
          load.hide();
          timetable.show();
        },
        function(err) {
          load.hide();
          error.show();
        }
      ); 
    }
  });
  Ajax(
  {
    url: 'http://transport.opendata.ch/v1/locations?x=' + latitude + '&y=' + longitude,
    type: 'json',
    cache: true,
    async: true
  },
  function(data) {
    var i=0;
    data.stations.forEach(function(stop){
    haltestellen.item(0, i++, 
               { title    : stop.name, 
                 subtitle : strings[language].distance + stop.distance + 'm',
                 stopId   : stop.id
               });
    });
    load.hide();
    haltestellen.show();
  });
  
}
