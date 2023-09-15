import svgSprite from "gulp-svg-sprite";

export const svgSprive = () => {
    return app.gulp.src(`${app.path.src.svgicons}`, {}) //{sourcemaps: true} - общий файл стилей из множества частей. В каком файле стиль написан
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "SCSS",
                message: "Error, <%= error.message %>"
            }))
        )
        .pipe(svgSprite({
            mode: {
                stack: {
                    sprite: `../icons/icons.svg`,
                    // Создавать страницу с перечнем иконок
                    example: true
                }
            },
        }
        ))
        .pipe(app.gulp.dest(`${app.path.build.images}`))
}