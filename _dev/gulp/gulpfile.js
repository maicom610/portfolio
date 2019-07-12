//
// npm module
//===============================================
var gulp = require('gulp');
var sass = require('gulp-sass')
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var autoprefixer = require('gulp-autoprefixer');
var cmq = require('gulp-group-css-media-queries');
var rename = require('gulp-rename');
var cleancss = require('gulp-clean-css');


//
// config
//===============================================
var SUPPORT_BROWSERS = ['last 2 versions', 'ie 11', 'ios >= 10', 'last 2 ChromeAndroid versions'];
var srcDir = {
  'sass': '../sass/**/*.scss',
};
var destDir = {
  'css': '../../include/css/',
};


//
// Task
//===============================================
//CSS関連タスク
gulp.task('sass', function () {
  return gulp.src(srcDir['sass'])
    .pipe(plumber())
    .pipe(sass({style : 'expanded'}).on('error', notify.onError( error => { return error.message; })))
    .pipe(cmq())
    .pipe(autoprefixer({
      browsers:SUPPORT_BROWSERS,
      cascade: false
    }))

    //リネーム・圧縮
    .pipe(rename({suffix: '.min'}))
    .pipe(cleancss())
    .pipe(gulp.dest(destDir['css']))
});


//ファイル監視タスク
gulp.task('watch', function() {
    // scssファイル監視
    gulp.watch(srcDir['sass'], ['sass']);
});

//デフォルトタスク
gulp.task('default', ['watch']);
