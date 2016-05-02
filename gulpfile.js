let gulp = require('gulp')
  , nodemon = require('gulp-nodemon')
  , shell = require('gulp-shell');

gulp.task('default', ['run', 'openBrowser']);

gulp.task('run', () => {
  nodemon({
    script: 'app.js',
    ext: 'js',
    env: {
      PORT: 8000
    },
    ignore: ['./node_modules/**']
  })
    .on('restart', () => {
      console.log('Restarting');
    });
});

gulp.task('openBrowser', shell.task([
  'open http://localhost:8000'
]));
