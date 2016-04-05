"use strict";

var app = angular.module('identisnap');
app.controller("galleryController", ["$scope", function($scope) {
  $scope.places = [];

  $scope.uploadPhoto = function(imageURI) {
    $scope.places.push({
      url: imageURI
    });
    $scope.apply();
  }

  function captureError() {
    alert("Unable to capture photo!");
  }

  function choosePhoto() {
    console.log("choose photo!");
  }
  function takePhoto() {
    if(!navigator.camera) {
      $scope.places.push({
        url: 'img/logo.png'
      });
      $scope.selectedPlace = $scope.places[$scope.places.length - 1];
      return;
    }
    navigator.camera.getPicture($scope.uploadPhoto, captureError, { sourceType: 1, quality:60, destinationType: Camera.DestinationType.FILE_URI });
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
