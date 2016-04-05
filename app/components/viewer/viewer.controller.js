"use strict";

var app = angular.module('identisnap');
app.controller("viewerController", ["$scope", "placesFactory", function($scope, placesFactory) {
  $scope.place = placesFactory.getSelectedPlace;
}]);
