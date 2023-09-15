// Задача для ощищения rest после кадого обновления
import del from 'del';
export const reset = () => {
  return del(app.path.clean);
};