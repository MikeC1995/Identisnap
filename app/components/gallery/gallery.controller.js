"use strict";

var app = angular.module('identisnap');
app.controller("galleryController", ["$scope", "$state", "placesFactory", function($scope, $state, placesFactory) {
  $scope.places = placesFactory.getPlaces;

  // Called when picture has been fetched
  function captured(imageURI) {
    var place = {
      url: imageURI
    }
    placesFactory.addPlace(place);
    placesFactory.setSelectedPlace(place);
    $state.go('viewer');
  }
  // Called when error fetchign a picture
  function captureError() {
    alert("Unable to capture photo!");
  }

  function getPicture(method) {
    // for testing on browser
    if(!navigator.camera) {
      var place = {
        url: 'img/logo.png'
      }
      placesFactory.addPlace(place);
      placesFactory.setSelectedPlace(place);
      $state.go('viewer');
      return;
    }

    // On device:
    var sourceType;
    if(method == "camera") {
      sourceType = navigator.camera.PictureSourceType.CAMERA;
    } else if(method == "gallery") {
      sourceType = navigator.camera.PictureSourceType.SAVEDPHOTOALBUM;
    }
    if(!sourceType) {
      captureError();
      return;
    }
    navigator.camera.getPicture(captured, captureError, { sourceType: sourceType, quality: 50, destinationType: Camera.DestinationType.FILE_URI });
  }
  function choosePhoto() {
    getPicture("gallery");
  }
  function takePhoto() {
    getPicture("camera");
  }

  $scope.openPlace = function(place) {
    placesFactory.setSelectedPlace(place);
    $state.go('viewer');
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
