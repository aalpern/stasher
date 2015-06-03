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

    copy: {
      dist: {
        files: [
          { expand: true, cwd: '_build/es5', src: '**/*.js', dest: 'dist/node' }
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
  grunt.loadNpmTasks('grunt-babel')
  grunt.loadNpmTasks('grunt-ts-1.5')

  grunt.registerTask('lib', [
    'ts:lib', 'babel:lib'
  ])

  grunt.registerTask('dist', [
    'lib', 'copy:dist'
  ])

  grunt.registerTask('default', [
    'lib'
  ])
}
