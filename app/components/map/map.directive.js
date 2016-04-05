"use strict";

var app = angular.module('identisnap');
app.directive('map', ['loadGoogleMapAPI', function(loadGoogleMapAPI) {
  return {
    restrict: 'A',
    scope: {
      mapId: '@id',
      location: '@'
    },
    link: function($scope, element, attrs) {
      // Loads google map script
      loadGoogleMapAPI.then(function () {
          $scope.initialize();
      }, function () {
          console.error("Couldn't load Google Maps API!");
      });

      $scope.initialize = function() {
        $scope.map = new google.maps.Map(document.getElementById($scope.mapId), {
          zoom: 16,
          center: { lat: 51.455797, lng: -2.604160 },
          disableDefaultUI: true
        });

        $scope.$watch('location', function(newLoc) {
          var newLoc = JSON.parse(newLoc);
          if(!newLoc || !newLoc.lat || !newLoc.lng) return;
          if($scope.marker) $scope.marker.setMap(null);
          $scope.marker = new google.maps.Marker({
            position: newLoc,
            map: $scope.map
          });
          $scope.map.panTo($scope.marker.position);
        }, true);
      }
    }
  }
}]);
