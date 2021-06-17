import './test'
import sequelize from './../utils/db/index';
import fs from 'fs';
import path from 'path';


(async () => {
  // 获取目录文件夹
  const fileRes = fs.readdirSync(path.resolve(__dirname, './../model/'));
  // 读取文件夹，然后动态导入
  fileRes.forEach(path => {
    import('./' + path)
  });
  await sequelize.sync();
})()