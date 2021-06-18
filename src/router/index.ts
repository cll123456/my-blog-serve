import router from './../utils/swagger'
import './Test'
import { syncImportByDir } from '../utils/file';
import path from 'path'
// 动态收集路由
syncImportByDir(path.resolve(__dirname, './../router'));

export default router;