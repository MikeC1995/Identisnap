"use strict";

var app = angular.module('identisnap');
app.controller("viewerController", ["$scope", "$state", "placesFactory", "apiFactory", function($scope, $state, placesFactory, apiFactory) {
  $scope.place = placesFactory.getSelectedPlace;
  $scope.isLoading = true;

  $scope.locate = function() {
    $scope.isLoading = true;
    var imageURI = $scope.place().url;
    apiFactory.locate($scope.place().url)
      .then(function(r) {
        var result = JSON.parse(r.response);
        $scope.isLoading = false;
        if(result.success) {
          $scope.place().location = {
            lat: result.lat,
            lng: result.lng,
          }
          $scope.$apply();
        } else {
          alert("Location not recognised!");
          placesFactory.removePlace($scope.place());
          $state.go('gallery');
        }
      }, function(e) {
        alert("Error locating!");
        $scope.isLoading = false;
        placesFactory.removePlace($scope.place());
        $state.go('gallery');
      });
  }

  $scope.locate();
}]);
