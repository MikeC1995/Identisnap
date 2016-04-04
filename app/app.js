"use strict";

var app = angular.module("identisnap", []);
app.controller("appController", ["$scope", function($scope) {
  alert("Hello from angular!");

  $scope.capture = function() {
    alert("Capture!");
    navigator.camera.getPicture(uploadPhoto, null, { sourceType:1, quality:60 });
  }
  function uploadPhoto(data) {
    alert("upload!");
    //output image to screen
    //http://code.tutsplus.com/tutorials/phonegap-from-scratch-camera-api-app-exporting--mobile-9519
  }
}]);
