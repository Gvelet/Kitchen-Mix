// Файл для задач(копирвоание файлов)
export const copy = () => {
    return app.gulp.src(app.path.src.files) //свойство src у gulp получает доступ к файлам и папкам(получили файлы)
    .pipe(app.gulp.dest(app.path.build.files)) //Куда копируем(перенесли файлы)
}