var install = require("gulp-install");
var gulp = require('gulp');
var eslint = require('gulp-eslint');

gulp.src(['./package.json'])
    .pipe(install());
gulp.task('lint', () => {
    return gulp.src(['./app/*.jsx', '!node_modules/**'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('default', ['lint'], () => {
    gulp.watch('./container/main.js',['lint']);
});
