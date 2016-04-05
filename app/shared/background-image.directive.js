"use strict";

var app = angular.module('identisnap');
app.directive('backgroundImage', function() {
  return function(scope, element, attrs) {
    var url = attrs.backgroundImage;
    element.css({
      'background-image': 'url(' + url +')',
      'background-size' : 'cover',
      'background-position': 'center'
    });
  };
});
