'use strict'

const gulp = require('gulp')
const eslint = require('gulp-eslint')

const hintTask = 'hint'

gulp.task(hintTask, () => {
  return gulp.src(['./**/*.js', '!node_modules/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
})

module.exports.hint = hintTask
