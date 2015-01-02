module.exports = function (grunt) {
    'use strict';

    require('load-grunt-tasks')(grunt);

    var BANNER = '/*! v<%= pkg.version %> — ' +
            '<%= grunt.template.today("yyyy-mm-dd") %> */' +
            '\n\n';

    var config = {};

    config.pkg = grunt.file.readJSON('package.json');

    config.concat = {
        options: {
          stripBanners: true,
          banner: BANNER
        },
        task: {
          src: ['bower_components/bem-naming/lib/bem-naming.js', 'lib/jquery.bem.js'],
          dest: '<%= pkg.name %>.js',
        }
    };

    config.uglify = {
      options: {
        banner: BANNER,
        compress: {
          drop_console: true
        },
        mangle: {
          except: ['exports']
        }
      },
      task: {
        src: ['<%= pkg.name %>.js'],
        dest: '<%= pkg.name %>.min.js'
      }
    };

    grunt.initConfig(config);

    grunt.registerTask('build', ['concat', 'uglify']);
};
