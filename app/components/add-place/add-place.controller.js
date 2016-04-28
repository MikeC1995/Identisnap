"use strict";

var app = angular.module('identisnap');
app.controller("addPlaceController", ["$scope", "$state", "apiFactory", function($scope, $state, apiFactory) {
  $scope.location = undefined;
  $scope.name = undefined;
  $scope.address = undefined;
  $scope.description = undefined;

  $scope.dialogOpen = false;

  $scope.addPlace = function() {
    if($scope.getDisabled() == "disabled") {
      return;
    }
    $scope.closeDialog();
    apiFactory.addPlace({
      location: $scope.location,
      name: $scope.name,
      address: $scope.address,
      description: $scope.description
    }).then(function() {
      alert("Thanks! Your place was added.");
      $state.go('gallery');
    }, function() {
      alert("Sorry, we were unable to add your place!");
    });
  }

  $scope.getDisabled = function () {
    if($scope.location == "" || $scope.location === undefined ||
       $scope.name == "" || $scope.name === undefined ||
       $scope.address == "" || $scope.address === undefined ||
       $scope.description == "" || $scope.description === undefined) {

         return "disabled";
     } else {
       return "";
     }
  }

  $scope.closeDialog = function () {
    $scope.dialogOpen = false;
  }
  $scope.openDialog = function () {
    $scope.dialogOpen = true;
  }
  $scope.isDialogOpen = function() {
    return $scope.dialogOpen;
  }
}]);
