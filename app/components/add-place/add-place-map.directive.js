'use strict';

var modals = angular.module('identisnap');
modals.directive('addPlaceMap', ['loadGoogleMapAPI', function(loadGoogleMapAPI) {
  return {
      restrict: 'A',
      scope: {
        mapId: '@id', // id of directive instance to register map to
        name: '=',
        address: '='
      },
      require: 'ngModel',
      link: function($scope, elem, attrs, model) {
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

          // Places Autocomplete code:
          // https://developers.google.com/maps/documentation/javascript/examples/places-autocomplete

          // Add the search box to the map as a control
          // input[0] has the raw DOM element
          var input = elem.parent().find('#add-place-search');
          $scope.map.controls[google.maps.ControlPosition.TOP_LEFT].push(input[0]);

          // Create a google Autocomplete for address lookup restricted to
          // geocode results only (i.e. exclude business results)
          var autocomplete = new google.maps.places.Autocomplete(input[0], { types : ['geocode'] });
          autocomplete.bindTo('bounds', $scope.map);

          // Create a marker object to pin on the location
          var marker = new google.maps.Marker({
            map: $scope.map,
            anchorPoint: new google.maps.Point(0, -29)
          });

          // When a place is selected
          function setPlace(place) {
            if(!place) {
              marker.setVisible(false);
              place = autocomplete.getPlace();
              $scope.name = place.name;
              $scope.address = place.formatted_address;
              if (!place.geometry) {
                window.alert("Autocomplete's returned place contains no geometry");
                return;
              }

              // If the place has a geometry, then present it on a map.
              if (place.geometry.viewport) {
                $scope.map.fitBounds(place.geometry.viewport);
              } else {
                $scope.map.setCenter(place.geometry.location);
                $scope.map.setZoom(17);  // Why 17? Because it looks good.
              }
              marker.setIcon(/** @type {google.maps.Icon} */({
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(35, 35)
              }));
            }
            if(place.geometry) {
              var location = place.geometry.location;
              place = {};
              place = location;
            }
            marker.setPosition(place);
            marker.setVisible(true);

            // Apply a listener to the Autocomplete so we can update the
            // input's ngModel with the autocompleted value!
            // See: http://www.oodlestechnologies.com/blogs/Google-Place-Autocomplete-Using-Angular-JS
            $scope.$apply(function() {
              input.controller('ngModel').$setViewValue(input.val());
              // update our the model with the location data so it is reflected in the controller
              model.$setViewValue({
                lat:  place.lat(),
                lng:  place.lng()
              });
            });
          }
          google.maps.event.addListener($scope.map, 'click', function(event) {
            setPlace(event.latLng);
          });
          autocomplete.addListener('place_changed', setPlace);
        }
      }
  };
}]);
