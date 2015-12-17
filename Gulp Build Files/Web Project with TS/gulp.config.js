/* jshint node: true */
'use strict';

module.exports = function() {
	var config = {
		jsScripts: ['app/*.js', 'app/**/**/*.js', 'app/**/*.js'],
		tsScripts: ['app/*.ts', 'app/**/**/*.ts', 'app/**/*.ts'],
		sassFiles: ['sass/**/*.scss'],
		indexTemplate: 'index.template.html',
		binPaths: (function() {
			var root = 'build/';
			return {
				root: root,
				js: root + 'js/',
				css: root + 'css/',
				fonts: root + 'content/fonts/',
				glyphFonts: root + 'fonts/bootstrap/',
				all: root + '*',
				indexFile: root+'index.html',
				maps:'maps/'
			};
		}()),
		getWiredepOptions:(function() {
			var options = {
				//bowerJson: require('bower.json'),
				directory: './bower_components/',
				ignorePath: '../..'
			};
			return options;
		})
	};
	return config;
};