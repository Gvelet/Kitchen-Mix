// Получаем имя папки проекта
import * as nodePath from 'path';
const rootFolder = nodePath.basename(nodePath.resolve());

const buildFolder = `./dist`; //Путь к папке с реультатом
const srcFolder = `./src`; //Путь к исходникам

// Общий объект path - хранится вся инфа о пути к файлам или папкам
export const path = { //export - что бы экспортировать в другие файлы
    build: {
        js: `${buildFolder}/js/`,
        css: `${buildFolder}/css/`,
        html: `${buildFolder}/`, //Сюда переносим из src
        images: `${buildFolder}/img/`,
        fonts: `${buildFolder}/fonts/`,
        files: `${buildFolder}/files/` //Сюда переносим из src
    },
    src: {
        js: `${srcFolder}/js/app.js`,
        images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp}`,
        svg: `${srcFolder}/img/**/*.svg`,
        scss: `${srcFolder}/scss/style.scss`,
        html: `${srcFolder}/*.html`, //путь html файлов
        files: `${srcFolder}/files/**/*.*`, //путь к папке с файлами которые мы хотим копировать
        svgicons: `${srcFolder}/svgicons/*.svg`,
    },
    watch: { //При изменении или создании файла - все копирование идет автоматически(Наблюдатель)
        js: `${srcFolder}/js/**/*.js`,
        scss: `${srcFolder}/scss/**/*.scss`,
        html: `${srcFolder}/**/*.html`,
        images: `${srcFolder}/img/**/*.{jpg,jpeg,png,svg,gif,ico,webp}`,
        files: `${srcFolder}/files/**/*.*`, //за какими файлами наблюдаем
    },
    clean: buildFolder,
    buildFolder: buildFolder,
    srcFolder: srcFolder,
    rootFolder: rootFolder,
    ftp: `test`
}