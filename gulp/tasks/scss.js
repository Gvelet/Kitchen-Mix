import dartSass from 'sass'; //препроцессор
import gulpSass from 'gulp-sass'; //для запуска препроцессора
import rename from 'gulp-rename'; //Для изменения имени файла

import cleanCss from 'gulp-clean-css'; //Сжатие CSS файла
import webpcss from 'gulp-webpcss'; //Вывод WEBP изображений
import autoprefixer from 'gulp-autoprefixer'; //Добавление вендорных префиксов
import groupCssMediaQueries from 'gulp-group-css-media-queries'; //Группировка медиа запросов

const sass = gulpSass(dartSass); //Делаем вцызов с плагина 

export const scss = () => {
    return app.gulp.src(app.path.src.scss, {sourcemaps: app.isDev}) //{sourcemaps: true} - общий файл стилей из множества частей. В каком файле стиль написан
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "SCSS",
                message: "Error, <%= error.message %>"
            }))
        )
        .pipe(app.plugins.replace(/@img\//g, '../img/')) //обрезка путей картинок
        .pipe(sass({ //Вызываем компилятор 
            outputStyle: 'expanded' //
        }))
        .pipe(app.plugins.replace(/@img\//g, '../img/')) //обрезка путей картинок
        .pipe(
            app.plugins.if(
                app.isBuild,
                groupCssMediaQueries()
            )
        )
        .pipe(
            app.plugins.if(
                app.isBuild,
                webpcss( //если браузер поддреживает webp, то добавляем один класс, если нет то нет
                    {
                        webpClass: ".webp",
                        noWebpClass: ".no-webp"
                    }
                )
            )
        )
        .pipe(
            app.plugins.if(
                app.isBuild,
                autoprefixer({
                    grid: true,
                    overrideBrowserslist: ["last 3 versions"],
                    cascade: true
                })
            )
        )
        .pipe(app.gulp.dest(app.path.build.css)) //Раскоментировать, если нужен не сжатый дубль файла стилей
        .pipe(
            app.plugins.if(
                app.isBuild,
                cleanCss() //Сжатие CSS файла
            )
        )
        .pipe(rename({
            extname: ".min.css"
        }))
        .pipe(app.gulp.dest(app.path.build.css)) //выгрузка в папку
        .pipe(app.plugins.browsersync.stream()); //обновление локала
}