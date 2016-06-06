'use strict'

const gulp = require('gulp')

const { plumb } = require('./plumb')
const { unit } = require('./unit')
const { hint } = require('./hint')

const watchTask = 'watch'

gulp.task(watchTask, [plumb], () => {

  // Unit tests
  gulp.watch([
    './lib/**/*.*'
  ], [unit])

  // No other tests
  gulp.watch([
    './gulpfile.js',
    './gulp/*.js'
  ], [hint])

})

module.exports.watch = watchTask
