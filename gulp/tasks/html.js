import fileInclude from "gulp-file-include"; //импортируем библиотку для работы с частями html
import webpHtmlNosvg from "gulp-webp-html-nosvg"; //импортируем библиотку для обработки картинок в webp
import versionNumber from "gulp-version-number"; //для кеширования. После сборки будет добавлятся ключ не позволяю кешироваться

export const html = () => {
    return app.gulp.src(app.path.src.html) //свойство src у gulp получает доступ к файлам и папкам(получили файлы)
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "HTML",
                message: "Error, <%= error.message %>"
            }))
        )
        .pipe(fileInclude())
        .pipe(app.plugins.replace(/@img\//g, 'img/')) //обрезка путей картинок
        .pipe(
            app.plugins.if(
                // Если режим продакшена, то выполняем
                app.isBuild,
                webpHtmlNosvg() //вызов библиотеки webpHtmlNosvg
            )
        )
        .pipe(
            app.plugins.if(
                // Если режим продакшена, то выполняем
                app.isBuild,
                versionNumber({
                    'value': '%DT%',
                    'append': {
                        'key': '_v',
                        'cover': 0,
                        'to': [
                            'css',
                            'js',
                        ]
                    },
                    'output': {
                        'file': 'gulp/version.json'
                    }
                })
            )
        )
        .pipe(app.gulp.dest(app.path.build.html)) //Куда копируем(перенесли файлы)
        .pipe(app.plugins.browsersync.stream()); //Что бы данные обновлялись на сервере
}