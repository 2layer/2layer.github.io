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
                src: ['js/**/*.js', 'js.admin/**/*.js', 'Gruntfile.js']
            }
        },

        watch: {
            js: {
                files: ['js/**/*.js', 'js.admin/**/*.js', 'js/templates/*.html', 'js.admin/templates/*.html'],
                tasks: ['js']
            },

            css: {
                files: ['css/**/*.css'],
                tasks: ['css']
            }
        },

        browser_sync: {
            dev: {
                bsFiles: {
                    src : ['index.css', 'index.js', 'index.html']
                },
                options: {
                    debugInfo: true,
                    ghostMode: {
                        clicks: true,
                        links: true,
                        forms: true,
                        scroll: true
                    },
                    watchTask: true,
                    server: {
                        host : 'localhost',
                        baseDir: '.'
                    },
                    ports: {
                        min: 8000,
                        max: 8080
                    }
                }
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
            index: 'index',
            index_pack: 'index+pack',
            admin: 'admin'
        }
    });

    // These plugins provide necessary tasks
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-csso');
    grunt.loadNpmTasks('grunt-lmd');
    grunt.loadNpmTasks('grunt-browser-sync');

    // Default task
    grunt.registerTask('default', ['browser_sync', 'watch']);
    grunt.registerTask('css', ['csso']);
    grunt.registerTask('js', ['jshint', 'lmd:index', 'lmd:admin']);

    // Release task
    grunt.registerTask('release', ['jshint', 'lmd:index_pack', 'csso']);

};