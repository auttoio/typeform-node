'use strict'

// Dependencies
const gulp = require('gulp')
const sequence = require('run-sequence')

// Defined tasks
const { lint } = require('./gulp/lint')
const { unit } = require('./gulp/unit')
const { watch } = require('./gulp/watch')

// Single-run
gulp.task('test', [unit])
gulp.task('build', cb => {
  sequence(lint, unit, cb)
})

// Continous-run
gulp.task('default', [watch])
