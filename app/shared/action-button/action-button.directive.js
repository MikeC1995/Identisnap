"use strict";

var app = angular.module('identisnap');
app.directive('actionButton', function() {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      items: '='
    },
    templateUrl: 'app/shared/action-button/action-button.view.html',
    link: function($scope, element, attrs) {
      $scope.isExpanded = false;
      $scope.toggle = function() {
        $scope.isExpanded = !$scope.isExpanded;
      }
    }
  }
});
