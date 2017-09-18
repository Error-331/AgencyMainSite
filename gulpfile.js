const gulp = require('gulp');
const gutil = require('gulp-util');
const sass = require('gulp-sass');

const SRC_FOLDER_PATH = `./src_site`;
const IMAGES_FOLDER_PATH = `${SRC_FOLDER_PATH}/images`;

const PUBLIC_FOLDER_PATH = `./public`;

gulp.task('copy-html', () => {
    gutil.log('Copying html files...');
    return gulp.src(`${SRC_FOLDER_PATH}/*.html`).pipe(gulp.dest(`${PUBLIC_FOLDER_PATH}/pages`));
});

gulp.task('copy-images', () => {
    gutil.log('Copying image files...');
    return gulp.src(`${IMAGES_FOLDER_PATH}/**/*.*`).pipe(gulp.dest(`${PUBLIC_FOLDER_PATH}/resources/images`));
});

gulp.task('compile-scss', () => {
    gutil.log('Compiling scss files...');

    return gulp.src(`${SRC_FOLDER_PATH}/scss/**/*.scss`)
        .pipe(sass())
        .pipe(gulp.dest(`${PUBLIC_FOLDER_PATH}/resources`));
});

gulp.task('watch', ['copy-html', 'copy-images', 'compile-scss'], function() {
    gutil.log('Initializing watch task...');

    gulp.task('caller', ['copy-html', 'compile-scss']);
    gulp.watch(`${SRC_FOLDER_PATH}/index.html`, ['copy-html']);
    gulp.watch(`${SRC_FOLDER_PATH}/scss/**/*.scss`, ['compile-scss']);
});