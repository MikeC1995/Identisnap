"use strict";

var app = angular.module("identisnap", ['ui.router', 'ngAnimate']);
app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/");
  $stateProvider
    .state('gallery', {
      url: "/",
      templateUrl: "app/components/gallery/gallery.view.html",
      controller: 'galleryController'
    })
    .state('viewer', {
      templateUrl: "app/components/viewer/viewer.view.html",
      controller: 'viewerController'
    });
});
app.controller("appController", ["$scope", "$state", function($scope, $state) {
  $scope.$state = $state;

  $scope.navClicked = function() {
    if($state.is('viewer')) {
      $state.go('gallery');
    }
  }
}]);
app.value('mapApiKey', 'AIzaSyCP5BKla9RY0aObtlovjVzIBV2XEsfYj48');
