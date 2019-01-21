import gulp from 'gulp';
import { development as dev, production as prod } from 'gulp-environments';

import del from 'del';
import connect from 'gulp-connect';
import parcel from 'gulp-parcel';
import uglify from 'gulp-uglify-es';
import sass from 'gulp-sass';

const paths = {
	dist: 'dist',

	app: {
		main: 'src/app/main.js',
		src: 'src/app/**/*.js',
	},
	styles: {
		main: 'src/styles/main.scss',
		src: 'src/styles/**/*.scss',
	},
	scripts: {
		src: 'src/scripts/**/*.js',
	},
	misc: {
		src: [
			'src/assets/**/*',
			'src/manifest.json'
		]
	}
};

function app() {
	const appSettings = {
		publicURL: './',
		outDir: paths.dist
	};
	return gulp.src(paths.app.main, {read: false})
		.pipe(parcel(appSettings))
		.pipe(gulp.dest(paths.dist));
}

function styles() {
	const styleSettings = {
		outputStyle: (prod()) ? "compressed" : "nested"
	};

	return gulp.src(paths.styles.main)
		.pipe(sass(styleSettings).on('error', sass.logError))
		.pipe(gulp.dest(paths.dist));
}

function scripts() {
	return gulp.src(paths.scripts.src)
		.pipe(prod(uglify()))
		.pipe(gulp.dest(paths.dist + '/scripts'));
}

function misc() {
	return gulp.src(paths.misc.src)
	.pipe(gulp.dest(paths.dist));
}

const clean = () => (del([paths.dist, '.cache']));
const build = gulp.parallel(styles, app, scripts, misc);
const watch = function() {
	gulp.watch(paths.app.src, app);
	gulp.watch(paths.styles.src, styles);
	gulp.watch(paths.scripts.src, scripts);
	gulp.watch(paths.misc.src, misc);
};
const server = function() {
	connect.server({
		port: 8080
	});
};

gulp.task('server', server);
gulp.task('clean', clean);
gulp.task('build', build);
gulp.task('watch', gulp.parallel(watch, server));
