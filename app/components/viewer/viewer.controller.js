"use strict";

var app = angular.module('identisnap');
app.controller("viewerController", ["$scope", "placesFactory", "apiFactory", function($scope, placesFactory, apiFactory) {
  $scope.place = placesFactory.getSelectedPlace;

  $scope.locate = function() {
    var imageURI = $scope.place().url;
    apiFactory.locate($scope.place().url)
      .then(function(r) {
        alert("Success! " + JSON.stringify(r));
        var result = JSON.parse(r.response);
        if(result.success) {
          $scope.place().location = {
            lat: result.lat,
            lng: result.lng,
          }
          $scope.$apply();
        } else {
          alert("Location not recognised!");
        }
      }, function(e) {
        alert("Error locating!\nCode: " + e.code);
      });
  }
}]);
