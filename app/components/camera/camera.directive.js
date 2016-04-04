"use strict";

var app = angular.module("identisnap");
app.directive("camera", function() {
  return {
    restrict: "E",
    replace: "true",
    scope: {
      capture: "="
    },
    templateUrl: "app/components/camera/camera.view.html",  // Must use this relative path, as leading / breaks when on the device
    link: function($scope, elem, attrs) {
    }
  }
});
