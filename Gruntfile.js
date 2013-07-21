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
                files: ['js/**/*.js', 'js/templates/*.html'],
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

        jsdoc : {
            dist : {
                src: ['js/**/*.js'],
                options: {
                    destination: 'doc'
                }
            }
        },

        lmd: {
            index: 'index',
            index_pack: 'index+pack'
        }
    });

    // These plugins provide necessary tasks
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-csso');
    grunt.loadNpmTasks('grunt-lmd');
    grunt.loadNpmTasks('grunt-jsdoc');

    // Default task
    grunt.registerTask('default', ['js', 'css', 'watch']);
    grunt.registerTask('css', ['csso']);
    grunt.registerTask('js', ['jshint', 'lmd:index']);

    // Release task
    grunt.registerTask('release', ['jshint', 'lmd:index_pack', 'csso']);

};