import sequelize from '../../utils/db/index';
import { DataTypes } from 'sequelize'

export const ProjectModel = sequelize.define('project', {
  // 在这里定义模型属性
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: '自增主键id',
    unique: true,
  },
  title: {
    type: DataTypes.STRING(255),
    comment: '项目的标题',
    allowNull: false
  },
  desc: {
    type: DataTypes.TEXT,
    comment: '项目描述'
  },
  projectUrl: {
    type: DataTypes.STRING(100),
    comment: '项目地址',
    allowNull: false
  },
  gitupUrl: {
    type: DataTypes.STRING(100),
    comment: 'gitup 地址',
  }
})