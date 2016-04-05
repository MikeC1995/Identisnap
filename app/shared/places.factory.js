"use strict";

var app = angular.module('identisnap');
app.factory('placesFactory', function placesFactory() {
  var placesFactory = {};

  var uniqueId = 0;
  var selectedIndex = -1;
  var places = [];

  placesFactory.getPlaces = function() {
    return places;
  }
  placesFactory.addPlace = function(place) {
    place._id = uniqueId++;
    places.push(place);
  }
  placesFactory.removePlace = function(place) {
    for(var i = 0; i < places.length; i++) {
      if(places[i]._id == place._id) {
        places.splice(i, 1);
      }
    }
  }

  placesFactory.getSelectedPlace = function() {
    return places[selectedIndex];
  }
  placesFactory.setSelectedPlace = function(place) {
    for(var i = 0; i < places.length; i++) {
      if(places[i]._id == place._id) {
        selectedIndex = i;
      }
    }
  }

  return placesFactory;
});
