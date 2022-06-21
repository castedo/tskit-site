module.exports = function (grunt) {

  grunt.initConfig({
    sass: {
      options: {
        implementation: require('sass'),
        importer: require('grunt-sass-tilde-importer')
      },
      dist: {
        files: {
          'assets/dist/css/style.min.css': 'assets/src/sass/style.scss'
        }
      }
    },
    browserify: {
      dist: {
        files: {
          'assets/dist/js/main.min.js': 'assets/src/js/main.js'
        },
        options: {
          transform: [['babelify', {
            presets: ["@babel/preset-env"],
            global: true,
            ignore: [/\/node_modules\/(?!gsap\/)/]
          }]],
          browserifyOptions: {
            debug: true
          }
        }
      }
    },
    uglify: {
      build: {
        src: 'assets/dist/js/main.min.js',
        dest: 'assets/dist/js/main.min.js'
      }
    },
    watch: {
      css: {
        files: ['assets/src/sass/**/*.*'],
        tasks: ['sass', 'postcss']
      },
      js: {
        files: ['assets/src/js/**/*.*'],
        tasks: ['browserify:dist', 'uglify']
      }
    },
    postcss: {
      autoprefixer: {
        options: {
          // TODO: Get sourcemaps working
          // True for inline sourcemaps
          map: false,
          processors: [
            // Please see 'browserslist' key in package.json for the browsers that autoprefixer will target
            require('autoprefixer')(),
          ]
        },
        src: 'assets/dist/css/*.css'
      },
      minifyCSS: {
        options: {
          processors: [
            require('cssnano')(),
          ]
        },
        src: 'assets/dist/css/*.css'
      }
    }
  });

  // Load the plug-ins (Node Modules) that are needed by the various tasks.
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('@lodder/grunt-postcss'); // grunt-postcss no longer maintained, hence the @lodder version
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task - runs when you type 'grunt' in the terminal.
  grunt.registerTask('default', ['watch']);

  // Dev task (leaves the compiled CSS and JS unminified for easier debugging, until sourcemaps are working)
  grunt.registerTask('dev', ['sass', 'postcss:autoprefixer', 'browserify:dist']);

  // Build task
  grunt.registerTask('build', ['sass', 'postcss', 'browserify:dist', 'uglify']);
}
