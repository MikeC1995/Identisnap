"use strict";

var app = angular.module('identisnap');
app.controller("addPlaceController", ["$scope", "$state", "apiFactory", function($scope, $state, apiFactory) {
  $scope.location = undefined;
  $scope.name = undefined;
  $scope.address = undefined;
  $scope.description = undefined;

  $scope.addPlace = function() {
    console.log($scope.location);
    console.log($scope.name);
    console.log($scope.address);
    console.log($scope.description);
    apiFactory.addPlace({
      location: $scope.location,
      name: $scope.name,
      address: $scope.address,
      description: $scope.description
    }).then(function() {
      console.log("success");
    }, function() {
      console.log("error");
    });
  }

  $scope.isDisabled = function() {
    return ($scope.name === undefined || $scope.address === undefined || $scope.description === undefined || $scope.description.trim() === "" || $scope.location === undefined);
  }
}]);
