

var gulp = require('gulp')
var gp_concat = require('gulp-concat');
var gp_rename = require('gulp-rename');
var gp_uglify = require('gulp-uglify');
var watch = require('gulp-watch');
var batch = require('gulp-batch');
var cleanCSS = require('gulp-clean-css');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var sassdoc = require('sassdoc');
var sassOptions = {
    errLogToConsole: true,
    outputStyle: 'expanded'
};
var plumber = require('gulp-plumber')
var autoprefixerOptions = {
    browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
};

var jsFiles = ['src/**/module.js', 'src/**/*.js'];
//If you use CSS instead of SASS
// var cssFiles = ['styles/bootstrap.css', 'styles/*.css'];
var sassFiles = ['sass/variables.scss', 'sass/bootswatch.scss', 'sass/*.scss'];


var bowerJsFiles = [
    'bower_components/angular/angular.js',
    'bower_components/angular-bootstrap/ui-bootstrap.js',
    'bower_components/angular-ui-router/release/angular-ui-router.js',

];
var bowerCssFiles = [];


var onError = function (err) {
    gutil.log(gutil.colors.green(err.message));
    this.emit('end');
};
gulp.task('js', function () {
    var stream = gulp.src(jsFiles)
        .pipe(plumber({
            handleError: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(gp_concat('app.js'))
        .pipe(gulp.dest('dist'))
        .pipe(gp_rename('app.min.js'))
        .pipe(gp_uglify())
        .pipe(gulp.dest('dist'))

    return stream;
})

gulp.task('watch', function () {
    watch(jsFiles, batch(function (events, done) {
        console.log("Minify JS!")
        gulp.start('js', done);


    }));

    // watch(cssFiles, batch(function (events, done) {
    //     console.log("Minify CSS!")
    //     gulp.start('css', done);
    // }));

    watch(sassFiles, batch(function (events, done) {
        console.log("Minify SASS!")
        gulp.start('sass', done);
    }));
});



// gulp.task('css', function () {
//     return gulp.src(cssFiles)
//         .pipe(gp_concat('style.css'))
//         .pipe(gulp.dest('dist'))
//         .pipe(cleanCSS({ compatibility: 'ie8' }))
//         .pipe(gp_rename('style.min.css'))
//         .pipe(gulp.dest('dist'))

// });



gulp.task('sass', function () {
    return gulp
        .src('sass/main.scss')
        //@Todo Sourcemaps work
        // .pipe(sourcemaps.init())
        .pipe(sass(sassOptions).on('error', sass.logError))
        // .pipe(sourcemaps.write())
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(gp_rename('app.css'))

        .pipe(gulp.dest('dist'))
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(gp_rename('app.min.css'))

        .pipe(gulp.dest('dist'))
    //@Todo Sassdoc work
    // .pipe(sassdoc())
    // // Release the pressure back and trigger flowing mode (drain)
    // // See: http://sassdoc.com/gulp/#drain-event
    // .resume();
});



gulp.task('bower', function () {
    gulp.start('bowercss');
    gulp.start('bowerjs');
});

//Concatenates bower components css into one file
gulp.task('bowercss', function () {
    return gulp.src(bowerCssFiles)
        .pipe(gp_concat('components.css'))
        .pipe(gulp.dest('dist'))
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(gp_rename('components.min.css'))
        .pipe(gulp.dest('dist'))

});

//Concatenates bowercomponents js into one file
gulp.task('bowerjs', function () {
    gulp.src(bowerJsFiles)
        .pipe(gp_concat('components.js'))
        .pipe(gulp.dest('dist'))
        .pipe(gp_rename('components.min.js'))
        .pipe(gp_uglify())
        .pipe(gulp.dest('dist'));
})

gulp.on('err', function (err) {
    console.log('Error:', err);
});