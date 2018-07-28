import gulp from 'gulp';

import parcel from 'gulp-parcel';
import uglify from 'gulp-uglify';
import del from 'del';
import sass from 'gulp-sass';

const paths = {
	dist: 'dist',

	app: {
		src: 'src/app/main.js',
	},
	styles: {
		src: 'src/styles/main.scss',
	},
	scripts: {
		src: 'src/scripts/**/*.js',
	},
	misc: {
		src: [
			'src/assets',
			'src/manifest.json'
		]
	}
};

function app() {
	const styleSettings = {
		publicURL: './',
		outDir: paths.dist
	};
	return gulp.src(paths.app.src, {read: false})
		.pipe(parcel(styleSettings))
		.pipe(gulp.dest(paths.dist));
}

function styles() {
	return gulp.src(paths.styles.src)
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest(paths.dist));
}

function scripts() {
	return gulp.src(paths.scripts.src)
		.pipe(gulp.dest(paths.dist + '/scripts'));
}

function misc() {
	return gulp.src(paths.misc.src)
	.pipe(gulp.dest(paths.dist));
}

const clean = () => (del([paths.dist]));
const build = gulp.parallel(styles, app, scripts, misc);
const watch = function() {
	gulp.watch(paths.app.src, app);
	gulp.watch(paths.styles.src, styles);
	gulp.watch(paths.scripts.src, scripts);
	gulp.watch(paths.misc.src, misc);
};

gulp.task('clean', clean);
gulp.task('build', build);
gulp.task('watch', watch);
