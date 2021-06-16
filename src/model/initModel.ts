import  './test'
import sequelize from './../utils/db/index';

(async () => {
  await sequelize.sync();
})()