module.exports = function(grunt) {

  var SOURCE_FILES = [
    'src/ts/**/*.ts'
  ]

  grunt.initConfig({

    /**
     * 1 - Transpile all TypeScript sources to ES6.
     */
    ts: {
      lib: {
        src: SOURCE_FILES,
        outDir: '_build/es6',
        options: {
          target: 'es6',
          comments: true,
          declaration: true,
          sourceMap: true
        }
      }
    },

    /**
     * 2 - Transpile the ES6 sources to ES5.
     */
    babel: {
      lib: {
        options: {
          sourceMap: true
        },
        files: [{
          expand: true,
          cwd: '_build/es6',
          src: '**/*.js',
          dest: '_build/es5'
        }]
      }
    },

    /**
     * 3 - Bundle the ES5 sources to a single file.
     */
    browserify: {
      /** Use browserify to bundle the library, excluding 3rd party dependencies. */
      lib: {
        files: {
          '_build/stasher.js' : [
            '_build/es5/**/*.js'
          ]
        },
        options: {
          exclude: [
            'hyperquest',
            'querystring',
            'URIjs',
            'bluebird'
          ]
        }
      },
      /** Use browserify to bundle the library, include 3rd party dependencies, for browser testing. */
      bundle: {
        files: {
          '_build/stasher-bundle.js' : [
            '_build/es5/js/client.js'
          ]
        }
      }
    },

    /**
     * 4 - Minify the bundle for distribution.
     */
    uglify: {
      dist: {
        options: {
          sourceMap: true
        },
        files: {
          'dist/stasher.min.js' : '_build/stasher.js'
        }
      }
    },

    copy: {
      dist: {
        files: [
          { expand: true, flatten: true, cwd: '_build/', src: 'stasher.js*', dest: 'dist/' }
        ]
      }
    },

    clean: {
        src: [
          '_build/'
        ]
    }

  })

  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-contrib-copy')
  grunt.loadNpmTasks('grunt-contrib-clean')
  grunt.loadNpmTasks('grunt-contrib-uglify')
  grunt.loadNpmTasks('grunt-babel')
  grunt.loadNpmTasks('grunt-browserify')
  grunt.loadNpmTasks('grunt-ts-1.5')

  grunt.registerTask('lib', [
    'ts:lib', 'babel:lib', 'browserify:lib'
  ])

  grunt.registerTask('dist', [
    'lib', 'uglify:dist', 'copy:dist'
  ])

  grunt.registerTask('default', [
    'lib'
  ])
}
