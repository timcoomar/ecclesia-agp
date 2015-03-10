var gulp          = require('gulp'),
    ftp           = require('gulp-ftp'),
    stylus        = require('gulp-stylus'),
    rename        = require('gulp-rename'),
    uglify        = require('gulp-uglify'),
    plumber       = require('gulp-plumber'),
    jade          = require('gulp-jade'),
    livereload    = require('gulp-livereload'),
    imagemin      = require('gulp-imagemin'),
    concat        = require('gulp-concat'),
    prefix        = require('gulp-autoprefixer'),
    uncss         = require('gulp-uncss'),
    pixrem        = require('gulp-pixrem'),
    marked        = require('marked'),
    rupture       = require('rupture');


// Scripts Task
gulp.task('scripts', function(){
  return gulp.src(['src/js/scripts/site.js'])
    .pipe(plumber())
    .pipe(uglify())
    .pipe(concat('site.min.js'))
    .pipe(gulp.dest('build/'))
    .pipe(livereload());
});

gulp.task('vendors', function(){
  return gulp.src(['src/js/jquery.js'])
    .pipe(plumber())
    .pipe(concat('vendors.min.js'))
    .pipe(gulp.dest('build/'))
    .pipe(livereload());
});

// Styles Task
gulp.task('styles', function(){
  return gulp.src('src/stylus/main.styl')
    .pipe(plumber())
    .pipe(stylus({use:[rupture()]}))
    .pipe(pixrem())
    .pipe(prefix("last 1 version", "> 1%", "ie 8"))
    //.pipe(uncss({html:'build/*.html'}))
    .pipe(gulp.dest('build/'))
    .pipe(livereload());
});

// Jade Task
gulp.task('templates', function(){
  var YOUR_LOCALS = {};

  return gulp.src('src/*.jade')
    .pipe(jade({locals: YOUR_LOCALS, pretty: true }))
    .pipe(gulp.dest('build/'))
    .pipe(livereload());
});

// Image Task
// Compresses images
gulp.task('images', function(){
  return gulp.src('src/img/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('build/img/'));
});

// Move files that don't need any processing
gulp.task('move', function(){
  return gulp.src('src/files/**/*.*', { base: 'src/' })
    .pipe(gulp.dest('build/'));
});

// Watch Task
// Watches JS, Stylus and Jade files
gulp.task('watch', function(){
  livereload.listen();
  gulp.watch('src/js/scripts/*.js', ['scripts']);
  gulp.watch('src/js/vendors/*.js', ['vendors']);
  gulp.watch('src/stylus/**/*.styl', ['styles']);
  gulp.watch('src/*.jade', ['templates']);
  gulp.watch('src/img/*', ['images']);
});


gulp.task('default', ['vendors', 'scripts', 'styles', 'templates', 'images', 'move', 'watch']);


// FTP Task

gulp.task('ftp', function () {
  return gulp.src('build/**/*')
    .pipe(ftp({
      host: 'ftp.s65194.gridserver.com',
      user: 'tim@prototypedesign.org.uk',
      pass: '4409cynth',
      remotePath: '/prototypedesign.org.uk/html/test/agp/'
    }));
});
