'use strict';

module.exports = function(grunt) {
  // Just in time Grunt plugin loading
  require('jit-grunt')(grunt);

  grunt.initConfig({
    // LESS CSS
    less: {
      development: {
        options: {
          compress: true,
          yuicompress: true,
          optimization: 2,
          strictMath: true,
          strictUnits: true
        },
        files: {
          "css/app.css": "less/app.less" // destination file and source file
        }
      }
    },
    // FILE WATCHING
    watch: {
      styles: {
        files: ['less/**/*.less'], // which files to watch
        tasks: ['less'],
        options: {
          nospawn: true
        }
      }
    }
  });

  grunt.registerTask('default', ['less', 'watch']);
};
