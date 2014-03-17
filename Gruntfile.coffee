'use strict'

module.exports = (grunt) ->
  # Project configuration.
  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'

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
      lib:
        files: [
          'lib/**/*.js',
          'lib/templates/*.html',
          'lib/admin/templates/*.html'
        ]
        tasks: ['scripts']
      css:
        files: ['css/**/*.css']
        tasks: ['styles']

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

    clean:
      coffee:
       src: ['temp']

  # These plugins provide necessary tasks
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-clean'
  grunt.loadNpmTasks 'grunt-csso'
  grunt.loadNpmTasks 'grunt-lmd'

  # Default task
  grunt.registerTask 'default', ['styles', 'scripts', 'watch']
  grunt.registerTask 'styles', ['csso']
  grunt.registerTask 'scripts', ['clean', 'coffee', 'lmd:index']

  # Release task
  grunt.registerTask 'release', ['coffee', 'lmd:index_pack', 'csso']

  # Bin task
  grunt.registerTask 'bin', ['coffee', 'lmd:index_pack', 'csso']
