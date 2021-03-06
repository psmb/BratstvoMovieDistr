var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sassGlob = require('gulp-sass-glob');
var browserSync = require('browser-sync').create();
var uglify = require('gulp-uglify');
var concatJs = require('gulp-concat');
var concatCss = require('gulp-concat-css');
var cssnano = require('gulp-cssnano');
var sourcemaps = require('gulp-sourcemaps');

// Input configuration
var inputAssets = [
];
var inputJsSync = [
	'./node_modules/mobile-detect/mobile-detect.min.js',
	'./js_sync/**/*.js'
];
var inputJs = [
	'./node_modules/jquery/dist/jquery.min.js',
	'./node_modules/scrollreveal/dist/scrollReveal.min.js',
	'./node_modules/owl-carousel-2/owl.carousel.min.js',
	'./vendor_js/**/*.js',
	'./js/**/*.js'
];
var inputVendorCss = [
	'./node_modules/owl-carousel-2/assets/owl.carousel.min.css',
	'./vendor_css/**/*.css'
];
var inputSass = ['./scss/**/*.scss'];

var allTasks = ['sass', 'js', 'jsSync', 'vendorCss', 'assets'];
var output = './built';

gulp.task('serve', allTasks, function () {
	browserSync.init({
		proxy: 'dev.bratstvo-movie.loc'
	});

	gulp.watch(inputSass, ['sass'])
		.on('change', function (event) {
			console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
		});
	gulp.watch(inputJs, ['js'])
		.on('change', function (event) {
			console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
		});
});

gulp.task('assets', function () {
	return gulp
		.src(inputAssets)
		.pipe(gulp.dest(output));
});
gulp.task('js', function () {
	return gulp
		.src(inputJs)
		.pipe(sourcemaps.init())
		.pipe(concatJs('index.js'))
		.pipe(uglify())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(output));
});
gulp.task('jsSync', function () {
	return gulp
		.src(inputJsSync)
		.pipe(sourcemaps.init())
		.pipe(concatJs('indexSync.js'))
		.pipe(uglify())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(output));
});
gulp.task('vendorCss', function () {
	return gulp
		.src(inputVendorCss)
		.pipe(sourcemaps.init())
		.pipe(concatCss('vendor.css'))
		.pipe(cssnano())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(output));
});
var sassOptions = {
	errLogToConsole: true,
	outputStyle: 'expanded'
};
gulp.task('sass', function () {
	return gulp
		.src(inputSass)
		.pipe(sassGlob())
		.pipe(sourcemaps.init())
		.pipe(sass(sassOptions).on('error', sass.logError))
		.pipe(autoprefixer())
		.pipe(cssnano())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(output))
		.pipe(browserSync.stream());
});

gulp.task('default', ['serve']);
gulp.task('build', allTasks);
