"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass")(require("sass"));
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();

gulp.task("style", async function () {
  gulp
    .src("src/styles/**/*.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([autoprefixer()]))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("html", async function () {
  gulp.src("src/*.html").pipe(plumber()).pipe(gulp.dest("build"));
});

gulp.task("svg", async function () {
  gulp.src("src/svg/*.svg").pipe(plumber()).pipe(gulp.dest("build/svg"));
});

gulp.task("img", async function () {
  gulp.src("src/img/*.*").pipe(plumber()).pipe(gulp.dest("build/img"));
});

gulp.task("js", async function () {
  gulp.src("src/js/*.*").pipe(plumber()).pipe(gulp.dest("build/js"));
});

gulp.task("assets", gulp.parallel("svg", "img", "js"));

gulp.task("production", gulp.parallel("html", "style", "assets"));

gulp.task(
  "dev",
  gulp.series(gulp.parallel("style", "html", "assets"), function () {
    server.init({
      server: "./build",
      notify: false,
      open: true,
      cors: true,
      ui: false,
    });

    gulp.watch("src/styles/**/*.scss", gulp.series("style"));
    gulp.watch("src/*.html").on("change", gulp.series("html", server.reload));
    gulp.watch("src/svg").on("add", gulp.series("svg", server.reload));
    gulp.watch("src/img").on("add", gulp.series("img", server.reload));
    gulp.watch("src/js").on("change", gulp.series("js", server.reload));
  })
);
