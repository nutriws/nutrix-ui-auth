var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};
module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.registerTask('serve', ['connect:serve', 'watch']);

    grunt.registerTask('dev', [
        'clean',
        'ngTemplateCache',
        'concat',
        'less',
        'copy'
    ]);

    grunt.registerTask('default', [
        'dev',
        'uglify',
        'cssmin'
    ]);

    grunt.initConfig({
        cmpnt: grunt.file.readJSON('bower.json'),
        banner: '/*! ngTable v<%= cmpnt.version %> by Vitalii Savchuk(esvit666@gmail.com) - ' +
            'https://github.com/esvit/nutrix-ui-auth - New BSD License */\n',
        clean: {
            working: {
                src: ['nutrix-ui-auth.*', './.temp/views', './.temp/']
            }
        },
        copy: {
            styles: {
                files: [
                    {
                        src: './src/styles/nutrix-ui-auth.less',
                        dest: './dist/nutrix-ui-auth.less'
                    }
                ]
            }
        },
        uglify: {
            js: {
                src: ['./dist/nutrix-ui-auth.js'],
                dest: './dist/nutrix-ui-auth.min.js',
                options: {
                    banner: '<%= banner %>',
                    sourceMap: function (fileName) {
                        return fileName.replace(/$/, '.map');
                    }
                }
            }
        },
        concat: {
            js: {
                src: [
                    'src/scripts/nutrix-ui-auth.js',
                    './.temp/scripts/views.js'
                ],
                dest: './dist/nutrix-ui-auth.js'
            }
        },
        less: {
            css: {
                files: {
                    './dist/nutrix-ui-auth.css': 'src/styles/nutrix-ui-auth.less'
                }
            }
        },
        cssmin: {
            css: {
                files: {
                    './dist/nutrix-ui-auth.min.css': './dist/nutrix-ui-auth.css'
                },
                options: {
                    banner: '<%= banner %>'
                }
            }
        },
        watch: {
            css: {
                files: 'src/styles/*.less',
                tasks: ['less'],
                options: {
                    livereload: true
                }
            },
            js: {
                files: 'src/scripts/*.js',
                tasks: ['concat'],
                options: {
                    livereload: true
                }
            },
            html: {
                files: ['src/tmpl/*.html'],
                tasks: ['ngTemplateCache', 'concat'],
                options: {
                    livereload: true
                }
            }
        },
        connect: {
            options: {
                port: 8800,
                hostname: 'localhost'
            },
            serve: {
                options: {
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, '.')
                        ];
                    }
                }
            }
        },
        ngTemplateCache: {
            views: {
                files: {
                    './.temp/scripts/views.js': ['src/tmpl/*.html']
                },
                options: {
                    trim: 'src/',
                    module: 'nutrixUiAuth'
                }
            }
        }
    });
};
