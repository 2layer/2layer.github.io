'use strict';

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            all: {
                options: {
                    jshintrc: '.jshintrc'
                },
                src: ['js/**/*.js', 'Gruntfile.js']
            }
        },

        watch: {
            js: {
                files: ['js/**/*.js'],
                tasks: ['js']
            },

            css: {
                files: ['css/**/*.css'],
                tasks: ['css']
            }
        },

        csso: {
            index: {
                options: {
                    report: 'min',
                    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                        '<%= grunt.template.today("yyyy-mm-dd") %> */\n'
                },
                files: {
                    './index.css': ['css/**/*.css']
                }
            }
        },

        lmd: {
            index: 'index'
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-csso');
    grunt.loadNpmTasks('grunt-lmd');

    // Default task.
    grunt.registerTask('default', ['watch']);
    grunt.registerTask('css', ['csso']);
    grunt.registerTask('js', ['jshint', 'lmd']);

};