

var gulp = require("gulp");
var uglify = require("gulp-uglify");
var babel = require("gulp-babel");


gulp.task("jsTask", function(){
	gulp.src('src/js/*.js')
	.pipe(babel({"presets": ["es2015"]})) //es6转es5
	.pipe(uglify()) //js压缩
	.pipe(gulp.dest('dest/js'));

})

gulp.task("default", ["jsTask"]);















