(() => {
    'use strict';
    const { src, dest } = require('gulp');
    var gulp = require('gulp');
    var sass = require('gulp-sass');
    var prefix = require('gulp-autoprefixer');
    var imagemin = require('gulp-imagemin');
    var pngquant = require('imagemin-pngquant');
    var cache = require('gulp-cache');
    var cp = require('child_process');
    var browserSync = require('browser-sync');

    var jekyll = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';

    // Build the Jekyll Site
    // gulp.task('jekyll-build', function (done) {
    //     return cp.spawn( jekyll , ['build'], {stdio: 'inherit'})
    //         .on('close', done);
    // });

    // Rebuild Jekyll and page reload
    // gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
    //     browserSync.reload();
    // });
    function jekyllRebuild() {
        browserSync.reload();
    }
    exports.jekyllRebuild = jekyllRebuild;

    // Wait for jekyll-build, then launch the Server
    // gulp.task('browser-sync', ['sass', 'img', 'jekyll-build'], function() {
    //     browserSync({
    //         server: {
    //             baseDir: '_site'
    //         },
    //         notify: false
    //     });
    // });
    function syncBrowser() {
        browserSync({
            server: {
                baseDir: '_site'
            },
            notify: false
        });
    }
    exports.syncBrowser = syncBrowser;

    // Compile files
    // gulp.task('sass', function () {
    //     return gulp.src('assets/css/scss/main.scss')
    //         .pipe(sass({
    //             outputStyle: 'expanded',
    //             onError: browserSync.notify
    //         }))
    //         .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
    //         .pipe(gulp.dest('_site/assets/css'))
    //         .pipe(browserSync.reload({ stream: true }))
    //         .pipe(gulp.dest('assets/css'));
    // });

    // async function sass(){
    //     return src('assets/css/scss/main.scss')
    //     .pipe(sass({
    //         outputStyle: 'expanded',
    //         onError: browserSync.notify
    //     }))
    //     .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
    //     .pipe(dest('_site/assets/css'))
    //     // .pipe(browserSync.reload({ stream: true }))
    //     .pipe(dest('assets/css'));
    // }


    gulp.task('sass', function () {
        return gulp.src('assets/css/scss/main.scss')
          .pipe(sass.sync().on('error', sass.logError))
          .pipe(gulp.dest('._site/assets/css'))
          .pipe(dest('assets/css'));
      });
    // exports.sass = sass;

    // Compression images
    // gulp.task('img', function () {
    //     return gulp.src('assets/img/**/*')
    //         .pipe(cache(imagemin({
    //             interlaced: true,
    //             progressive: true,
    //             svgoPlugins: [{ removeViewBox: false }],
    //             use: [pngquant()]
    //         })))
    //         .pipe(gulp.dest('_site/assets/img'))
    //         .pipe(browserSync.reload({ stream: true }));
    // });

    function images(){
        return gulp.src('assets/img/**/*')
        .pipe(cache(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('_site/assets/img'))
        .pipe(browserSync.reload({ stream: true }));
    }
    exports.images = images;

    // Watch scss, html, img files
    // gulp.task('watch', function () {
    //     gulp.watch('assets/css/scss/**/*.scss', ['sass']);
    //     gulp.watch('assets/js/**/*.js', ['jekyll-rebuild']);
    //     gulp.watch('assets/img/**/*', ['img']);
    //     gulp.watch(['*.html', '_layouts/*.html', '_includes/*.html', '_pages/*.html', '_posts/*'], ['jekyll-rebuild']);
    // });

    function watch(){
            gulp.watch('assets/css/scss/**/*.scss', ['sass']);
            gulp.watch('assets/js/**/*.js', ['jekyll-rebuild']);
            gulp.watch('assets/img/**/*', ['img']);
            gulp.watch(['*.html', '_layouts/*.html', '_includes/*.html', '_pages/*.html', '_posts/*'], ['jekyll-rebuild']);
    }
    exports.watch = watch;

    //  Default task
    // gulp.task('default', ['browser-sync', 'watch']);
    exports.default = gulp.task('default',sass);
})();