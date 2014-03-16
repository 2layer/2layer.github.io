'use strict'

module.exports = (grunt) ->
  # Project configuration.
  grunt.initConfig
    jshint:
      all:
        options:
          jshintrc: '.jshintrc'
        src: [
          'js/**/*.js',
          'js.admin/**/*.js',
          'Gruntfile.js'
        ]

    coffee:
      options:
        bare: true
      compile:
        files: [
          expand: true
          dest: 'temp/'
          cwd: 'lib'
          src: '**/*.coffee'
          ext: '.js'
        ]

    watch:
      js:
        files: [
          'js/**/*.js',
          'js.admin/**/*.js',
          'js/templates/*.html',
          'js.admin/templates/*.html'
        ]
        tasks: ['js']
      css:
        files: ['css/**/*.css']
        tasks: ['css']

    csso:
      index:
        options:
          report: 'min'
          banner: '/*! <%= pkg.name %> - v<%= pkg.version %>*/\n'
        files:
          './index.css': ['css/**/*.css']

    lmd:
      index: 'index'
      index_pack: 'index+pack'
      admin: 'admin'

  # These plugins provide necessary tasks
  grunt.loadNpmTasks 'grunt-contrib-jshint'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-csso'
  grunt.loadNpmTasks 'grunt-lmd'

  # Default task
  grunt.registerTask 'default', ['css', 'js', 'watch']
  grunt.registerTask 'css', ['csso']
  grunt.registerTask 'js', ['jshint', 'lmd:index']

  # Release task
  grunt.registerTask 'release', ['jshint', 'lmd:index_pack', 'csso']
