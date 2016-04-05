"use strict";

var app = angular.module("identisnap", ['ui.router']);
app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/");
  $stateProvider
    .state('gallery', {
      url: "/",
      templateUrl: "app/components/gallery/gallery.view.html",
      controller: 'galleryController'
    });
});
app.controller("appController", ["$scope", function($scope) {

}]);
