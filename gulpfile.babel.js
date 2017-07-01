import gulp from 'gulp';
import sourcemaps from 'gulp-sourcemaps';
import gutil from 'gulp-util';
import connect from 'gulp-connect';

import sass from 'gulp-sass';
import combinemq from 'gulp-combine-mq';
import cssnano from 'gulp-cssnano';

import browserify from 'browserify';
import watchify from 'watchify';
import babelify from 'babelify';
import uglify from 'gulp-uglify';
import eslint from 'gulp-eslint';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import glob from 'glob';
import path from 'path';
import notify from'gulp-notify';
import prettyTime from 'pretty-hrtime';

const internals = {
    isWatchify: false,
    deps: []
};

internals.static = __dirname;
internals.src = internals.static + '/src';

gulp.task('sass', () => {

    var sassOptions = {
        errLogToConsole: true,
        outputStyle: 'expanded'
    };

    return gulp
        .src([internals.src + '/sass/master.scss'])
        .pipe(sass(sassOptions).on('error', sass.logError))
        .pipe(combinemq())
        .pipe(cssnano({
            autoprefixer: { browsers: ['last 3 version'], add: true }
        }))
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest(internals.static + '/dist/css/'))
        .pipe(connect.reload());
});



gulp.task('watch', () => {

    internals.isWatchify = true;
    gulp.watch(internals.src + '/sass/**/*.scss',['sass']);
});

gulp.task('default', ['sass', 'watch']);