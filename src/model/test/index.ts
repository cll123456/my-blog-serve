import sequelize from './../../utils/db/index';
import {DataTypes} from 'sequelize'


export const TestModel = sequelize.define('Test', {
  // 在这里定义模型属性
  id:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  testName: {
    type: DataTypes.STRING(100),
    allowNull: false,
    comment: '测试name'
  },
  testCode: {
    type: DataTypes.STRING(100),
    comment: '测试code'
  },
 
}, {
  // 这是其他模型参数
});