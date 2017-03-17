var gulp = require('gulp'),
	gutil = require('gulp-util'),
	coffee = require('gulp-coffee'),
	browserify = require('gulp-browserify'),
	compass = require('gulp-compass'),
	//connect = require('gulp-connect'),
	concat = require('gulp-concat');
	browserSync = require('browser-sync').create();

var coffeeSource = ['components/coffee/tagline.coffee'];
var jsSources = [
	'components/scripts/rclick.js',
	'components/scripts/pixgrid.js',
	'components/scripts/tagline.js',
	'components/scripts/template.js'
];

var sassSources = ['components/sass/style.scss']

gulp.task('coffee', function(){
	gulp.src(coffeeSource)
		.pipe(coffee({ bare: true })
			.on('error', gutil.log))
		.pipe(gulp.dest('components/scripts'))
});


gulp.task('js', function(){
	gulp.src(jsSources)
		.pipe(concat('script.js'))
		.pipe(browserify())
		.pipe(gulp.dest('builds/development/js'))
		.pipe(browserSync.stream());
});

gulp.task('compass', function(){
	gulp.src(sassSources)
		.pipe(compass({
 			sass: 'components/sass',
 			image: 'builds/development/images',
 			style: 'expanded'
		}))
		.on('error', gutil.log)
		.pipe(gulp.dest('builds/development/css'))
		.pipe(browserSync.stream());
});

gulp.task('watch', function(){
	gulp.watch(coffeeSource, ['coffee']);
	gulp.watch(jsSources, ['js']);
	gulp.watch('components/sass/*.scss', ['compass']);
	gulp.watch('builds/development/*.html').on('change', browserSync.reload);
});


gulp.task('serve', function() {

    browserSync.init({
        server: "builds/development/"
    });

    gulp.watch("apps/scss/*.scss", ['sass']);
    gulp.watch("apps/*.html").on('change', browserSync.reload);
});



// gulp.task('connect', function(){
// 	connect.server({
// 		root: 'builds/development/',
// 		livereload: true
// 	});
// });

// gulp.task('html', function () {
//   gulp.src('builds/development/index.html')
//     .pipe(connect.reload());
// });



gulp.task('default', ['js', 'coffee', 'compass', 'serve', 'watch']);