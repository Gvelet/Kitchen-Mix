import webp from "gulp-webp";
import imagemin from "gulp-imagemin";

export const images = () => {
    return app.gulp.src(app.path.src.images)
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "IMAGES",
                message: "Error, <%= error.message %>"
            }))
        )
        .pipe(app.plugins.newer(app.path.build.images)) //Проверяем картинки в папке с результатом  
        .pipe(
            app.plugins.if(
                app.isBuild,
                webp()
            )
        )
        .pipe(
            app.plugins.if(
                app.isBuild,
                app.gulp.dest(app.path.build.images)
            )
        )   
        .pipe(
            app.plugins.if(
                app.isBuild,
                app.gulp.src(app.path.src.images)
            )
        )
        .pipe(
            app.plugins.if(
                app.isBuild,
                app.gulp.dest(app.path.build.images)
            )
        )
        .pipe(
            app.plugins.if(
                app.isBuild,
                imagemin({
                    progressive: true,
                    svgoPlugins: [{removeViewBox: false}],
                    interlaced: true,
                    optimizationLevel: 3 //От 0 до 7
                })
            )
        )
        .pipe(app.gulp.dest(app.path.build.images)) //выгрузка в папку
        .pipe(app.gulp.src(app.path.src.svg))
        .pipe(app.gulp.dest(app.path.build.images))
        .pipe(app.plugins.browsersync.stream()); //обновление локала
}