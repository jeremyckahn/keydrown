/*global module:false, require:true, console:true */

module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-yuidoc');

  var banner = [
        '/*! <%= pkg.name %> - v<%= pkg.version %> - ',
        '<%= grunt.template.today("yyyy-mm-dd") %> - <%= pkg.homepage %> */\n'
      ].join('');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      standard: {
        files: {
          'dist/keydrown.min.js': [
            'dist/keydrown.js'
          ]
        }
      },
      options: {
        banner: banner
      }
    },
    jshint: {
      all_files: [
        'grunt.js',
        'src/kd.!(intro|outro)*.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },
    concat: {
      options: {
        banner: banner
      },
      standard: {
        src: [
          'src/kd.intro.js',
          'src/kd.util.js',
          'src/kd.map.js',
          'src/kd.key.js',
          'src/kd.core.js',
          'src/kd.init.js',
          'src/kd.outro.js'
        ],
        dest: 'dist/keydrown.js'
      }
    },
    yuidoc: {
      compile: {
        name: 'Keydrown',
        description: '<%= pkg.description %>',
        version: '<%= pkg.version %>',
        url: '<%= pkg.homepage %>',
        options: {
          paths: ['dist'],
          recurse: false,
          outdir: 'dist/doc'
        }
      }
    }
  });

  grunt.registerTask('default', ['jshint']);
  grunt.registerTask('build',
    ['concat:standard', 'uglify:standard' , 'yuidoc']);

};
