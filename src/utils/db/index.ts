import { Sequelize } from 'sequelize';
import dbConfig from '../../config/dbConfig.json';
import { sqlLogger } from '../logger/logger'

// 使用 sequelize 关系型数据库
const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  dialect: 'mysql',
  logging: (msg) => {
    return sqlLogger.debug(msg) // 记录日志
  }
});

// 测试连接
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

export default sequelize