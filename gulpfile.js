let gulp = require('gulp'),
  nodemon = require('gulp-nodemon'),
 shell = require('gulp-shell');
//gulpMocha = require('gulp-mocha'),
//env = require('gulp-env'),
//supertest = require('supertest');

gulp.task('default', ['runApp', 'openBrowser']);

gulp.task('runApp', () => {
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

/*
gulp.task('test', () => {
  env({vars: {ENV: 'Test'}});
  gulp.src('tests/!*.js', {read: false})
    .pipe(gulpMocha({reporter: 'nyan'}))
});*/
