"use strict";

var app = angular.module("identisnap", ['ui.router']);
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
app.controller("appController", ["$scope", function($scope) {

}]);
