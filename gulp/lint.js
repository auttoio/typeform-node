'use strict'

const gulp = require('gulp')
const jscs = require('gulp-jscs')

const { hint } = require('./hint')

const lintTask = 'lint'

gulp.task(lintTask, [hint], () => {
  return gulp.src(['./**/*.js', '!node_modules/**'])
    .pipe(jscs({ fix: true }))
    .pipe(jscs.reporter())
    .pipe(jscs.reporter('fail'))
    .pipe(gulp.dest('./'))
})

module.exports.lint = lintTask
