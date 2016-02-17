var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sassGlob = require('gulp-sass-glob');
var browserSync = require('browser-sync').create();
var uglify = require('gulp-uglify');
var concatJs = require('gulp-concat');
var concatCss = require('gulp-concat-css');
var cssnano = require('gulp-cssnano');

// Input configuration
var inputJs = [
	'./node_modules/jquery/dist/jquery.min.js',
	'./node_modules/owl-carousel-2/owl.carousel.min.js',
	'./node_modules/scrollreveal/dist/scrollReveal.min.js',
	'./node_modules/mobile-detect/mobile-detect.min.js',
	'./js/**/*.js'
];
var inputVendorCss = [
	'./node_modules/owl-carousel-2/assets/owl.carousel.min.css'
];
var inputMySass = ['./scss/**/*.scss'];

var allTasks = ['mySass', 'js', 'vendorCss'];
var output = './built';

gulp.task('serve', allTasks, function () {
	browserSync.init({
		proxy: 'dev.bratstvo-movie.loc'
	});

	gulp.watch(inputMySass, ['mySass'])
		.on('change', function (event) {
			console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
		});
	gulp.watch(inputJs, ['js'])
		.on('change', function (event) {
			console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
		});
});

gulp.task('js', function () {
	return gulp
		.src(inputJs)
		.pipe(concatJs('index.js'))
		.pipe(uglify())
		.pipe(gulp.dest(output));
});
gulp.task('vendorCss', function () {
	return gulp
		.src(inputVendorCss)
		.pipe(concatCss('vendor.css'))
		.pipe(cssnano())
		.pipe(gulp.dest(output));
});
var sassOptions = {
	errLogToConsole: true,
	outputStyle: 'expanded'
};
gulp.task('mySass', function () {
	return gulp
		.src(inputMySass)
		.pipe(sassGlob())
		.pipe(sass(sassOptions).on('error', sass.logError))
		.pipe(autoprefixer())
		.pipe(cssnano())
		.pipe(gulp.dest(output))
		.pipe(browserSync.stream());
});

gulp.task('default', ['serve']);
gulp.task('build', allTasks);
