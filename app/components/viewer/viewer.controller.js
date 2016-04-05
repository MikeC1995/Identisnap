"use strict";

var app = angular.module('identisnap');
app.controller("viewerController", ["$scope", "placesFactory", "apiFactory", function($scope, placesFactory, apiFactory) {
  $scope.place = placesFactory.getSelectedPlace;

  $scope.locate = function() {
    var imageURI = $scope.place().url;
    apiFactory.locate($scope.place().url)
      .then(function(r) {
        alert("Success!");
        $scope.place().location = {
          lat: r.response.lat,
          lng: r.response.lng,
        }
        $scope.$apply();
      }, function(e) {
        alert("Error locating!\nCode: " + e.code);
      });
  }
}]);
