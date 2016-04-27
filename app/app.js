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
    })
    .state('add-place', {
      templateUrl: "app/components/add-place/add-place.view.html",
      controller: 'addPlaceController'
    });
});
app.controller("appController", ["$scope", "$state", function($scope, $state) {
  $scope.$state = $state;

  $scope.navClicked = function() {
    if($state.is('viewer') || $state.is('add-place')) {
      $state.go('gallery');
    }
  }
}]);
app.value('mapApiKey', 'AIzaSyCP5BKla9RY0aObtlovjVzIBV2XEsfYj48');
