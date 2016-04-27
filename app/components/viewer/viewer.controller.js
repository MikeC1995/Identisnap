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
          //TODO: currently uses predicted latlng, not "ground truth" lat lng
          $scope.place().location = {
            lat: result.lat,
            lng: result.lng,
          }
          $scope.place().place = JSON.parse(result.places)[0];
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

  if($scope.place().place === undefined)
  {
    $scope.isLoading = true;
    $scope.locate();
  } else {
    $scope.isLoading = false;
  }
}]);
