import './test'
import sequelize from './../utils/db/index';
import { syncImportByDir } from '../utils/file';
import path from 'path';


(async () => {
  syncImportByDir(path.resolve(__dirname, `./../model/`));
  await sequelize.sync();
})()