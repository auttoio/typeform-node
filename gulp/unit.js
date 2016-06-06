'use strict'

const { concat, pick, values, meanBy } = require('lodash')
const gulp = require('gulp')
const gutil = require('gulp-util')
const babel = require('gulp-babel')
const mocha = require('gulp-mocha')
const istanbul = require('gulp-babel-istanbul')
const injectModules = require('gulp-inject-modules')

const COVERAGE_THRESHOLD = 100

const unitTask = 'unit'

const IGNORE_COVERAGE = [
  '!./**/*.spec.js',
  '!./index.js',
  '!./gulpfile.js',
  '!./gulp/*.js',
  '!coverage/**',
  '!node_modules/**'
]

gulp.task(unitTask, cb => {
  gulp.src(concat(['./**/*.js'], IGNORE_COVERAGE))
    .pipe(istanbul({ includeUntested: true }))
    .pipe(istanbul.hookRequire())
    .on('finish', () => {
      gulp.src(['./**/*.spec.js', '!node_modules/**'])
        .pipe(babel())
        .pipe(injectModules())
        .pipe(mocha({
          reporter: 'spec'
        }))
        .pipe(istanbul.writeReports({
          dir: process.cwd(),
          reporters: ['text-summary', 'lcovonly']
        }))
        .on('end', () => {
          let err = null

          // Pull coverage metrics from code coverage summary
          let coverageMetrics = pick(istanbul.summarizeCoverage(), [
            'lines', 'statements', 'functions', 'branches'
          ])

          // Verify metrics against coverage threshold
          if (meanBy(values(coverageMetrics), 'pct') < COVERAGE_THRESHOLD) {

            err = new gutil.PluginError(
              'unit', `Code coverage not sufficient, expected ${COVERAGE_THRESHOLD}%`
            )
          }

          if (err) gutil.beep()
          return cb(err)
        })
    })
})

module.exports.unit = unitTask
