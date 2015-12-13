module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        sass: {
            options: {

            },
            dist: {
                options: {
                    outputStyle: 'expanded'
                },
                files: [{
                    'css/style.css': ['scss/style.scss']
                }]
            }
        },

        watch: {
            grunt: { files: ['Gruntfile.js'] },
            sass: {
                files: 'scss/**/*.scss',
                tasks: ['sass:dist', 'autoprefixer']
            },
            options: {

            }
        },

        autoprefixer: {
            options: {
                browsers: ['last 3 versions']
            },
            dist: { // Target
                files: {
                    'css/style.css': 'css/style.css'
                }
            },
        },

        cssmin: {
            combine: {
                files: [{
                    'css/style.min.css': ['css/style.css']
                }]
            }
        },

        uglify: {
            my_target: {
                options: {
                    mangle: false
                },
                files: [
                    {
                        'js/script.min.js': [
                            'js/functions.js'
                        ]
                    }
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('js', ['uglify'] );
    grunt.registerTask('css', ['sass:dist', 'autoprefixer', 'cssmin']);
    grunt.registerTask('build', ['sass:dist', 'autoprefixer', 'cssmin', 'js' ]);
    grunt.registerTask('watch', ['sass:dist', 'watch']);
    grunt.registerTask('default', ['sass:dist']);
}
