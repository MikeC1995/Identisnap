"use strict";

var app = angular.module('identisnap');
app.factory('apiFactory', ["$http", function apiFactory($http) {
  var apiFactory = {};

  var urlBase = "http://139.59.169.128:5000";

  apiFactory.locate = function(imageURI) {
    return new Promise(function(resolve, reject) {
      var options = new FileUploadOptions();
      options.fileKey = "file";
      options.fileName = imageURI.substr(imageURI.lastIndexOf('/')+1);
      options.mimeType = "image/jpeg";
      options.params = new Object();
      options.chunkedMode = false;

      var ft = new FileTransfer();
      var url = urlBase + "/locate";
      ft.upload(imageURI, url, resolve, reject, options);
    });
  }

  return apiFactory;
}]);
