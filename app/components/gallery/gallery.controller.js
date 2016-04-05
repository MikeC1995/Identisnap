"use strict";

var app = angular.module('identisnap');
app.controller("galleryController", ["$scope", "$state", "placesFactory", function($scope, $state, placesFactory) {
  $scope.places = placesFactory.getPlaces;

  function uploadPhoto(imageURI) {
    var place = {
      url: imageURI
    }
    placesFactory.addPlace(place);
    placesFactory.setSelectedPlace(place);
    $state.go('viewer');
  }

  function captureError() {
    alert("Unable to capture photo!");
  }

  function choosePhoto() {
    console.log("choose photo!");
  }
  function takePhoto() {
    if(!navigator.camera) {
      var place = {
        url: 'img/logo.png'
      }
      placesFactory.addPlace(place);
      placesFactory.setSelectedPlace(place);
      $state.go('viewer');
      return;
    }
    navigator.camera.getPicture(uploadPhoto, captureError, { sourceType: 1, quality:60, destinationType: Camera.DestinationType.FILE_URI });
  }

  // Action button items
  $scope.actionItems = [{
    url: 'img/icons/camera.png',
    callback: takePhoto
  },{
    url: 'img/icons/gallery.png',
    callback: choosePhoto
  }];
}]);
