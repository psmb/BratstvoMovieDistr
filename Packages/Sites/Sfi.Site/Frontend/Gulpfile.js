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
var inputVendorJs = [
	'./node_modules/owl-carousel-2/owl.carousel.min.js',
	'./node_modules/scrollreveal/dist/scrollreveal.min.js'
];
var inputVendorCss = [
	'./node_modules/owl-carousel-2/assets/owl.carousel.min.css',
	'./node_modules/owl-carousel-2/assets/owl.theme.default.min.css'
];
var inputMyJs = ['./js/**/*.js'];
var inputMySass = ['./scss/**/*.scss'];

var allInputs = [].concat(inputVendorJs, inputMyJs, inputVendorCss, inputMySass);
var allTasks = ['vendorJs', 'myJs', 'vendorCss', 'mySass'];
var output = './built';

gulp.task('serve', allTasks, function () {
	browserSync.init({
		proxy: 'dev.bratstvo-movie.loc'
	});

	gulp.watch(allInputs, allTasks)
		.on('change', function (event) {
			console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
		});
});

gulp.task('vendorJs', function () {
	return gulp
		.src(inputVendorJs)
		.pipe(concatJs('vendor.js'))
		.pipe(uglify())
		.pipe(gulp.dest(output))
		.pipe(browserSync.stream());
});
gulp.task('myJs', function () {
	return gulp
		.src(inputMyJs)
		.pipe(concatJs('index.js'))
		.pipe(uglify())
		.pipe(gulp.dest(output))
		.pipe(browserSync.stream());
});
gulp.task('vendorCss', function () {
	return gulp
		.src(inputVendorCss)
		.pipe(concatCss('vendor.css'))
		.pipe(cssnano())
		.pipe(gulp.dest(output))
		.pipe(browserSync.stream());
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
