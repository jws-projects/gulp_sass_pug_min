/* =========================================================
 Import
========================================================= */
/* ---------------------------------------------------------
 common
--------------------------------------------------------- */
const gulp = require('gulp');
const browser = require('browser-sync');
const ssi = require('browsersync-ssi');
const del = require('del');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const runSequence = require('run-sequence');

/* ---------------------------------------------------------
 pug
--------------------------------------------------------- */
const pug = require('gulp-pug');

/* ---------------------------------------------------------
 sass
--------------------------------------------------------- */
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const gcmq = require('gulp-group-css-media-queries');
const sassGlob = require('gulp-sass-glob');
const purgecss = require('gulp-purgecss');

/* ---------------------------------------------------------
 image
--------------------------------------------------------- */
const imagemin = require('gulp-imagemin');
const changed = require('gulp-changed');

/* =========================================================
 settings
========================================================= */
const paths = {
  sass: [
    './_src/assets/sass/*.scss',
    './_src/assets/sass/**/*.scss',
    './_src/assets/sass/**/**/*.scss'
  ],
  sassDev: './_dev/assets/css/',
  sassDist: './_dist/assets/css/',
  css: ['./_dist/assets/css/*.css'],
  pug: [
    './_src/*.pug',
    './_src/**/*.pug',
    './_src/**/**/*.pug',
    '!./_src/_*.pug',
    '!./_src/**/_*.pug',
    '!./_src/**/**/_*.pug'
  ],
  html: ['./_src/*.html', './_src/**/*.html'],
  htmlDist: ['./_dist/*.html', './_dist/**/*.html'],
  pugDev: '_dev',
  pugDist: './_dist/',
  js: ['./_src/assets/js/*.js', './_src/assets/js/**/*.js'],
  jsDev: '_dev/assets/js/',
  jsDist: './_dist/assets/js/',
  image: ['./_src/assets/images/**/*'],
  imageDev: './_dev/assets/images/',
  imageDist: './_dist/assets/images/',
  dist: './_dist/'
};

/* =========================================================
 Task
========================================================= */
/* ---------------------------------------------------------
 pug src
--------------------------------------------------------- */
gulp.task('pug', function () {
  const option = {
    pretty: true
  };
  gulp
    .src(paths.pug)
    .pipe(
      plumber({
        errorHandler: notify.onError('Error: <%= error.message %>')
      })
    )
    .pipe(pug(option))
    .pipe(gulp.dest(paths.pugDev))
    .pipe(browser.reload({ stream: true }));
});
/* ---------------------------------------------------------
 pug dist
--------------------------------------------------------- */
gulp.task('pug_dist', function () {
  const option = {
    pretty: true
  };
  gulp
    .src(paths.pug)
    .pipe(
      plumber({
        errorHandler: notify.onError('Error: <%= error.message %>')
      })
    )
    .pipe(pug(option))
    .pipe(gulp.dest(paths.pugDist));
});
/* ---------------------------------------------------------
 sass src
--------------------------------------------------------- */
gulp.task('sass', function () {
  gulp
    .src(paths.sass)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sassGlob())
    .pipe(sass())
    .pipe(cleanCSS())
    .pipe(autoprefixer({ browsers: ['last 3 versions'], cascade: false }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.sassDev))
    .pipe(browser.reload({ stream: true }));
});
/* ---------------------------------------------------------
 sass dist
--------------------------------------------------------- */
gulp.task('sass_dist', function () {
  gulp
    .src(paths.sass)
    .pipe(plumber())
    .pipe(sassGlob())
    .pipe(sass())
    .pipe(cleanCSS())
    .pipe(autoprefixer({ browsers: ['last 3 versions'], cascade: false }))
    .pipe(gcmq())
    .pipe(gulp.dest(paths.sassDist));
});
/* ---------------------------------------------------------
 sass purgecss
--------------------------------------------------------- */
// gulp.task('purgecss', () => {
//   return gulp
//     .src(paths.css)
//     .pipe(purgecss({ content: paths.htmlDist }))
//     .pipe(cleanCSS())
//     .pipe(gulp.dest(paths.sassDist));
// });
/* ---------------------------------------------------------
 image src
--------------------------------------------------------- */
gulp.task('imagemin', function () {
  gulp
    .src(paths.image)
    .pipe(changed(paths.imageDev))
    // .pipe(
    //   imagemin([
    //     imagemin.optipng({ optimizationLevel: 7 }),
    //     ,
    //     imagemin.jpegtran({
    //       quality: 85,
    //       progressive: true
    //     }),
    //     imagemin.svgo(),
    //     imagemin.optipng(),
    //     imagemin.gifsicle()
    //   ])
    // )
    .pipe(gulp.dest(paths.imageDev))
    .pipe(browser.reload({ stream: true }));
});
/* ---------------------------------------------------------
 image dist
--------------------------------------------------------- */
gulp.task('imagemin_dist', function () {
  gulp
    .src(paths.image)
    // .pipe(
    //   imagemin([
    //     imagemin.optipng({ optimizationLevel: 7 }),
    //     ,
    //     imagemin.jpegtran({
    //       quality: 85,
    //       progressive: true
    //     }),
    //     imagemin.svgo(),
    //     imagemin.optipng(),
    //     imagemin.gifsicle()
    //   ])
    // )
    .pipe(gulp.dest(paths.imageDist));
});
/* ---------------------------------------------------------
  js src
--------------------------------------------------------- */
gulp.task('js', function () {
  gulp.src(paths.js)
    .pipe(gulp.dest(paths.jsDev))
    .pipe(browser.reload({ stream: true }));
});
/* ---------------------------------------------------------
  js dist
--------------------------------------------------------- */
gulp.task('js_dist', function () {
  gulp.src(paths.js).pipe(gulp.dest(paths.jsDist));
});
/* ---------------------------------------------------------
 server
--------------------------------------------------------- */
gulp.task('server', function () {
  browser({
    server: {
      baseDir: paths.pugDev,
      middleware: [
        ssi({
          baseDir: __dirname + '/src',
          ext: '.html'
        })
      ]
    },
    ghostMode: {
      clicks: false,
      forms: false,
      scroll: false
    }
  });
});
/* ---------------------------------------------------------
 reload
--------------------------------------------------------- */
gulp.task('reload', function () {
  browser.reload({ stream: true });
});
/* ---------------------------------------------------------
 clean
--------------------------------------------------------- */
gulp.task('clean', function () {
  return del.sync(['./_dist']);
});
/* ---------------------------------------------------------
 clean Dev
--------------------------------------------------------- */
gulp.task('cleanD', function () {
  return del.sync(['./_dev']);
});


/* =========================================================
 Task main
========================================================= */
/* ---------------------------------------------------------
 gulp default
--------------------------------------------------------- */
gulp.task(
  'default',
  ['server', 'sass', 'pug', 'js', 'imagemin', 'reload'],
  function () {
    gulp.watch(paths.sass, ['sass']);
    gulp.watch(paths.pug, ['pug']);
    gulp.watch(paths.image, ['imagemin']);
    gulp.watch(paths.js, ['js']);
    // gulp.watch([paths.html, paths.js], ['reload']);
  }
);
/* ---------------------------------------------------------
 gulp dist
--------------------------------------------------------- */
gulp.task('dist', function (callback) {
  return runSequence(
    'clean',
    ['sass_dist', 'pug_dist', 'js_dist', 'imagemin_dist'],
    // 'purgecss',
    callback
  );
});
