const grunt = require('grunt');

// @Uglify Task
const uglify = {

    files: {
  
      src: [ './assets/libraries/js/jquery.min.js', './assets/libraries/js/*.js', 'assets/js/*.js', './assets/js/components/*.js' ],  
      dest: './assets/bundled/bundled.min.js'
  
    }
  
  };
  
  // @CSS Minification Task
  const cssmin = {
  
    options: {
  
      report: 'gzip',
  
      specialComments: 0
  
    },
  
    files: {
  
      src: [ './assets/css/*.css', './assets/libraries/css/*.css' ],
  
      dest: './assets/bundled/bundled.min.css'
  
    }
  
  }
  
  // @Copy Task
  const copy = {
  
    files: {
  
      src: './assets/css/fonts',
  
      dest: './assets/bundled/fonts'
  
    }
  
  }
  
// @Grunt Configuration
const configuration = { uglify, cssmin, copy }
  
  module.exports = function(grunt) {
  
    grunt.initConfig(configuration);
  
    // @Dependencies
    grunt.loadNpmTasks('grunt-contrib-uglify-es');
  
    grunt.loadNpmTasks('grunt-contrib-cssmin');
  
    grunt.loadNpmTasks('grunt-contrib-copy');

    // @Grunt Task Registration
    grunt.registerTask('default', ['uglify', 'cssmin', 'copy']);
  
  }
