/* jshint node: true */
'use strict';
var gulp = require('gulp');
var args = require('yargs').argv;
var del = require('del');
var $ = require('gulp-load-plugins')();// jshint ignore:line
var stylish = require('gulp-tslint-stylish');
var config = require('./gulp.config')();
var wiredep = require('wiredep').stream;

gulp.task('vetjs', function () {
	log('Analysing javascript files');
	return gulp.src(config.jsScripts)
		.pipe($.print())
		.pipe($.jshint())
		.pipe($.jshint.reporter('jshint-stylish',{verbose:true}));
});

gulp.task('vetts', function () {
	log('Analysing typescript files');
	return gulp.src(config.tsScripts)
		.pipe($.if(args.verbose, $.print()))// jshint ignore:line
		.pipe($.tslint())
		.pipe($.tslint.report(stylish));
});

gulp.task('sass',['cleancss'], function() {
	log('Processing Sass files');
	return gulp.src(config.sassFiles)
		.pipe($.sass())
		.on('error', $.sass.logError)
		.pipe($.autoprefixer({ browsers: ['last 2 version', '> 5%'] }))
		.pipe($.minifyCss({ keepSpecialComments :0}))
		.pipe(gulp.dest(config.binPaths.css));
});

gulp.task('cleancss', function() {
	log('Cleaning Styles css from build');
	del(config.binPaths.css + '**/*.css');
});

gulp.task('sass-watcher', function() {
	gulp.watch([config.sassFiles], ['sass']);
});

gulp.task('typescript', function() {
	return gulp.src(config.tsScripts)
		.pipe($.sourcemaps.init())
		.pipe($.typescript({ target: 'ES5', sortOutput: true }))
		.pipe($.angularFilesort())
		.pipe($.concat('output.js'))
		.pipe($.jsvalidate())
		.pipe($.uglify())
		.pipe($.sourcemaps.write())
		.pipe(gulp.dest(config.binPaths.js));
});
gulp.task('lintjsOutput', function() {
	return gulp.src(config.binPaths.js + '*.js')
		.pipe($.print())
		.pipe($.jshint())
		.pipe($.jshint.reporter('jshint-stylish', { verbose: true }));
});

gulp.task('wiredep', function() {
	var options = config.getWiredepOptions();
	return gulp.src(config.indexTemplate)
		.pipe(wiredep(options))
		.pipe($.inject(gulp.src(config.binPaths.js)))
		.pipe(gulp.dest(config.binPaths.indexFile));
});

function log(msg) { // jshint ignore:line
	if (typeof (msg) === 'object') {
		for (var item in msg) {
			if (msg.hasOwnProperty(item)) {
				$.util.log($.util.colors.blue(msg[item]));
			}
		}
	} else {
		$.util.log($.util.colors.blue(msg));
	}
}

function errorLogger(error) { //jshint ignore:line
	log('** Error Start **');
	log(error);
	log('** Error End  **');
}