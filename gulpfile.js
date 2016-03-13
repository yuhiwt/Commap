// gulpfile.js
var gulp = require('gulp');
var coffee = require('gulp-coffee');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cssmin = require('gulp-cssmin');
var webserver = require('gulp-webserver');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');
 
var paths = {
  scripts: ['app/js/**/*.coffee', '!app/external/**/*.coffee']
};
 
// Webサーバ
gulp.task('webserver', function() {
  gulp.src('./')
    .pipe(webserver({
      livereload: true,
    }));
});
 
// JSの結合&配置
gulp.task('scripts', function() {
  return gulp.src([
      './bower_components/angular/angular.min.js',
      './bower_components/OnsenUI/js/onsenui.min.js',
      './bower_components/jquery/dist/jquery.min.js'
  ])
    .pipe(concat('lib.js'))
    .pipe(gulp.dest('./js/'));
});

//CSSの結合&配置&minimize
gulp.task('cssmin', function () {
  return gulp.src([
      './bower_components/OnsenUI/css/onsenui.css',
      './bower_components/OnsenUI/css/onsen-css-components-blue-theme.css'
  ])
    .pipe(concat('lib.css'))
    .pipe(cssmin())
/*    .pipe(rename({
      suffix: '.min'
    }))*/
    .pipe(gulp.dest('./css/'));
});
 
// ファイルの変更監視
gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['scripts']);
});
 
gulp.task('default', ['webserver', 'scripts', 'cssmin', 'watch']);
