module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default', ['clean', 'copy']);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      lib: {
        src: ['public/js/lib/*']
      }
    },
    copy: {
      main: {
        files: [
          {expand: true, cwd: 'node_modules/angular-ui-router/release', src: 'angular-ui-router.js',
           dest: 'public/js/lib/', filter: 'isFile'}
        ]
      }
    },
    watch: {
      files: 'js/*',
      tasks: ['default']
    }
  });
}
