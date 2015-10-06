// Generated on 2014-11-18 using generator-angular 0.10.0
'use strict';

// jscs:disable
// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  grunt.registerTask('open_coverage', 'open coverage report in default browser', function() {
    var exec = require('child_process').exec;
    var cb = this.async();
    exec('open coverage/html-report/index.html', {cwd: './'}, function(err, stdout) {
      console.log(stdout);
      cb();
    });
  });

  // Configurable paths for the application
  var appConfig = {
    app: 'app',
    dist: 'dist',
    modules: 'node_modules'
  };

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    yeoman: appConfig,

    // Pull in the package.json file so we can read its metadata.
    pkg: grunt.file.readJSON('package.json'),

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      js: {
        files: ['<%= yeoman.app %>/scripts/{,*/}*.js', 'node_modules/hmda-rule-engine/{,*/}*.js'],
        tasks: ['newer:jscs:all', 'newer:jshint:all', 'browserify:dev'],
        options: {
          livereload: '<%= connect.options.livereload %>'
        }
      },
      jsTest: {
        files: ['test/spec/{,*/}*.js'],
        tasks: ['newer:jscs:test', 'newer:jshint:test', 'karma']
      },
      styles: {
        files: ['<%= yeoman.app %>/styles/{,*/}*.css'],
        tasks: ['newer:copy:styles', 'autoprefixer']
      },
      less: {
        files: ['<%= yeoman.app %>/styles/{,*/}*.less'],
        tasks: ['less:server', 'autoprefixer']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      markdown: {
        files: ['ABOUT.md', 'COMMON_QUESTIONS.md', 'TERMS_OF_SERVICE.md'],
        tasks: ['markdown']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= yeoman.app %>/{,*/}*.html',
          '.tmp/styles/{,*/}*.css',
          '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost',
        livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          middleware: function (connect) {
            return [
              connect.static('.tmp'),
              connect.static(appConfig.app)
            ];
          }
        }
      },
      test: {
        options: {
          port: 9001,
          middleware: function (connect) {
            return [
              connect.static('.tmp'),
              connect.static('test'),
              connect.static(appConfig.app)
            ];
          }
        }
      },
      dist: {
        options: {
          open: true,
          base: '<%= yeoman.dist %>'
        }
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish'),
        ignores: [
            '<%= yeoman.app %>/config/config.js'
        ]
      },
      all: {
        src: [
          'Gruntfile.js',
          '<%= yeoman.app %>/scripts/{,*/}*.js'
        ]
      },
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: [
          'test/spec/{,*/}*.js',
          'test/functional/cucumber/step_definitions/{,*/}*.js'
        ]
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jscs: {
        options: {
            config: '.jscsrc',
            reporter: require('jscs-stylish').path,
        },
        all: {
            src: [
              '<%= yeoman.app %>/scripts/{,*/}*.js'
            ]
        },
        test: {
            src: [
              'test/spec/{,*/}*.js',
              'test/functional/cucumber/step_definitions/{,*/}*.js'
            ]
        }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.dist %>/{,*/}*',
            '!<%= yeoman.dist %>/.git{,*/}*'
          ]
        }]
      },
      server: '.tmp',
      coverage: ['coverage/*'],
      docs: ['docs/*']
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      }
    },

    // Compile LESS files to CSS.
    // All of the cf-framework LESS files have been added to styles.css.
    less: {
      options: {
        paths: ['<%= yeoman.app %>/styles'],
        compress: false,
        sourceMap: true,
        sourceMapFilename: '<%= yeoman.dist %>/css/<%= pkg.name %>_sourcemap.css.map',
        sourceMapURL: '/static/css/<%= pkg.name %>_sourcemap.css.map'
      },
      server: {
        files: {
          '.tmp/styles/<%= pkg.name %>.css': ['<%= yeoman.app %>/styles/<%= pkg.name %>.less']
        }
      },
      dist: {
        options: {
          compress: true,
          sourceMap: false
        },
        files: {
          '<%= yeoman.dist %>/styles/<%= pkg.name %>.css': ['<%= yeoman.app %>/styles/<%= pkg.name %>.less']
        }
      }
    },

    // Renames files for browser caching purposes
    filerev: {
      dist: {
        src: [
          '<%= yeoman.dist %>/scripts/{,*/}*.js',
          '<%= yeoman.dist %>/styles/{,*/}*.css',
          '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
          '<%= yeoman.dist %>/fonts/*'
        ]
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: '<%= yeoman.app %>/index.html',
      options: {
        dest: '<%= yeoman.dist %>',
        flow: {
          html: {
            steps: {
              js: ['uglifyjs'],
              css: ['cssmin']
            },
            post: {}
          }
        }
      }
    },

    // Performs rewrites based on filerev and the useminPrepare configuration
    usemin: {
      html: ['<%= yeoman.dist %>/{,*/}*.html'],
      css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
      options: {
        assetsDirs: ['<%= yeoman.dist %>','<%= yeoman.dist %>/images']
      }
    },

    // The following *-min tasks will produce minified files in the dist folder
    // By default, your `index.html`'s <!-- Usemin block --> will take care of
    // minification. These next options are pre-configured if you do not wish
    // to use the Usemin blocks.
    // cssmin: {
    //   dist: {
    //     files: {
    //       '<%= yeoman.dist %>/styles/main.css': [
    //         '.tmp/styles/{,*/}*.css'
    //       ]
    //     }
    //   }
    // },
    uglify: {
      dist: {
        files: {
          '<%= yeoman.dist %>/scripts/scripts.js': [
            '<%= yeoman.dist %>/scripts/scripts.js'
          ]
        }
      }
    },
    // concat: {
    //   dist: {}
    // },

// Removed due to failure to build on alpine
// Currently only saves ~7kb    
// Could pre-minify images when they're checked in
//
//    imagemin: {
//      dist: {
//        files: [{
//          expand: true,
//          cwd: '<%= yeoman.app %>/images',
//          src: '{,*/}*.{png,jpg,jpeg,gif}',
//          dest: '<%= yeoman.dist %>/images'
//        }]
//      }
//    },
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.svg',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          conservativeCollapse: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>',
          src: ['*.html', 'views/{,*/}*.html', 'partials/{,*/}*.html'],
          dest: '<%= yeoman.dist %>'
        }]
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            '*.html',
            'views/{,*/}*.html',
            'partials/{,*/}*.html',
            'images/{,*/}*.{webp,png}',
            'fonts/{,*/}*.*',
            'data/{,*/}*.*'
          ]
        }, {
          expand: true,
          cwd: '.tmp/images',
          dest: '<%= yeoman.dist %>/images',
          src: ['generated/*']
        }, {
          expand: true,
          cwd: '<%= yeoman.modules %>/cf-icons/src/fonts',
          dest: '<%= yeoman.dist %>/fonts',
          src: '{,*/}*.{eot,svg,ttf,woff}'
        }]
      },
      styles: {
        expand: true,
        cwd: '<%= yeoman.app %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      },
      fonts: {
        expand: true,
        cwd: '<%= yeoman.modules %>/cf-icons/src/fonts',
        dest: '.tmp/fonts/',
        src: '{,*/}*.{eot,svg,ttf,woff}'
      }
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      server: [
        'copy:styles',
        'copy:fonts'
      ],
      test: [
        'copy:styles'
      ],
      dist: [
        'copy:dist',
        'svgmin'
      ]
    },

    browserify: {
      dev: {
        options: {
          browserifyOptions: {
            debug: true
          }
        },
        src: '<%= yeoman.app %>/scripts/app.js',
        dest: '<%= yeoman.app %>/bundle/bundle.js'
      },
      dist: {
        options: {
          browserifyOptions: {
            debug: false
          }
        },
        src: '<%= yeoman.app %>/scripts/app.js',
        dest: '<%= yeoman.app %>/bundle/bundle.js'
      }
    },

    // Test settings
    karma: {
      unit: {
        configFile: 'test/karma.conf.js',
        singleRun: true
      }
    },

    coveralls: {
      options: {
        debug: true,
        force: true,
        coverageDir: 'coverage/coveralls'
      }
    },

    compress: {
      'hmda-pilot': {
        options: {
          archive: './dist/hmda-pilot.zip',
          mode: 'zip',  //zip | gzip | deflate | tgz
          pretty: true
        },
        files: [
          {
            expand: true,
            dot: true,
            cwd: './dist',

            //zip dist directory
            src: ['**', '!hmda-pilot.zip']
          }
        ]
      },
      'codedeploy': {
        options: {
          archive: './dist/hmda-pilot-codedeploy.zip',
          mode: 'zip',  //zip | gzip | deflate | tgz
          pretty: true
        },
        files: [
          {
            expand: true,
            dot: true,
            cwd: './',

            //zip dist directory
            src: ['dist/hmda-pilot.zip', 'scripts/*', 'appspec.yml']
          }
        ]
      }
    },

    ngAnnotate: {
      options: {
        singleQuotes: true
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/bundle',
          src: '{,*/}*.js',
          dest: '<%= yeoman.app %>/bundle'
        }]
      }
    },
    replace: {
      local: {
        options: {
          patterns: [{
            json: grunt.file.readJSON('./config/environments/local.json')
          }]
        },
        files: [{
          expand: true,
          flatten: true,
          src: ['./config/config.js'],
          dest: '<%= yeoman.app %>/scripts/modules/'
        }]
      },
      development: {
        options: {
          patterns: [{
            json: grunt.file.readJSON('./config/environments/development.json')
          }]
        },
        files: [{
          expand: true,
          flatten: true,
          src: ['./config/config.js'],
          dest: '<%= yeoman.app %>/scripts/modules/'
        }]
      },
      docker: {
        options: {
          patterns: [{
            json: grunt.file.readJSON('./config/environments/docker.json')
          }]
        },
        files: [{
          expand: true,
          flatten: true,
          src: ['./config/config.js'],
          dest: '<%= yeoman.app %>/scripts/modules/'
        }]
      },
      production: {
        options: {
          patterns: [{
            json: grunt.file.readJSON('./config/environments/production.json')
          }]
        },
        files: [{
          expand: true,
          flatten: true,
          src: ['./config/config.js'],
          dest: '<%= yeoman.app %>/scripts/modules/'
        }]
      }
    },
    jsdoc : {
        dist : {
            src: ['<%= yeoman.app %>/scripts/{,*/}*.js', 'README.md'],
            options: {
                destination: 'docs',
                template : 'node_modules/grunt-jsdoc/node_modules/ink-docstrap/template',
                configure: '.jsdoc.conf.json'
            }
        }
    },
    markdown: {
        docs: {
            files: [{
                'app/partials/about.html': 'ABOUT.md',
                'app/partials/termsOfService.html': 'TERMS_OF_SERVICE.md'
            }],
            options: {
                template: 'config/md-to-html.jst'
            }
        },
        faq: {
            files: [{
                'app/views/common_questions.html': 'COMMON_QUESTIONS.md'
            }],
            options: {
                template: 'config/md-to-html.jst',
                postCompile: function(src) {
                    // Add a ending '-' to links in the TOC that end with a '?' because the markdown converter adds it
                    src.replace(/<a href="(#.*)">(.*)<\/a>/g, function(match, link, text) {
                        var suffix = '?';
                        if (text.indexOf(suffix, text.length - suffix.length) !== -1) {
                            src = src.replace(link, link + '-');
                        }
                    });
                    return src;
                }
            }
        }
    },
    protractor: {
        local: {
            options: {
                configFile: 'test/functional/conf.js'
            }
        },
        editChecks: {
            options: {
                configFile: 'test/functional/editCheck-conf.js'
            }
        },
        sauceLabs: {
            options: {
                configFile: 'test/functional/sauce-conf.js'
            }
        }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-ng-annotate');
  grunt.loadNpmTasks('grunt-replace');
  grunt.loadNpmTasks('grunt-karma-coveralls');

  grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build:local', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'jscs',
      'jshint',
      'replace:local',
      'browserify:dev',
      'less:server',
      'concurrent:server',
      'autoprefixer',
      'markdown',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('server', 'DEPRECATED TASK. Use the "serve" task instead', function (target) {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve:' + target]);
  });

  grunt.registerTask('test', [
    'clean:coverage',
    'clean:server',
    'jscs:test',
    'jshint:test',
    'replace:local',
    'concurrent:test',
    'autoprefixer',
    'connect:test',
    'karma'
  ]);

  grunt.registerTask('functional', function(type) {
    type = type || 'local'; // default to running the tests locally, if no other option is specified

    grunt.task.run([
      'jscs:test',
      'jshint:test',
      'protractor:' + type
    ]);
  });

  grunt.registerTask('travis-coveralls', [
    'test',
    'coveralls'
  ]);

  grunt.registerTask('coverage', [
    'test',
    'open_coverage'
  ]);

  grunt.registerTask('build', function (env) {
    env = env || 'development'; // default the build env to 'development', if not specified

    grunt.task.run([
      'clean:dist',
      'jscs',
      'jshint',
      'replace:' + env,
      'markdown',
      'browserify:dist',
      'ngAnnotate:dist',
      'less:dist',
      'useminPrepare',
      'concurrent:dist',
      'autoprefixer',
      'copy:dist',
      'cssmin',
      'uglify',
      'filerev',
      'usemin',
      'htmlmin'
    ]);
  });

  grunt.registerTask('zip', [
    'compress:hmda-pilot'
  ]);

  grunt.registerTask('codedeploy', [
    'compress:codedeploy'
  ]);

  grunt.registerTask('default', [
    'newer:jshint',
    'test',
    'build:development'
  ]);

  grunt.registerTask('generate-docs', [
      'clean:docs',
      'jsdoc:dist'
  ]);
};
