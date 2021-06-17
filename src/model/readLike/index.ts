import sequelize from '../../utils/db/index';
import { DataTypes } from 'sequelize'

// 阅读点赞表
export const ReadLikeModel = sequelize.define('readLike', {
  // 在这里定义模型属性
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: '自增主键id',
    unique: true,
  },
  readNum: {
    type: DataTypes.INTEGER,
    comment: '文章阅读量',
    set(value: number) {
      // 默认设置0
      this.setDataValue('readNum', value || 0)
    }
  },
  likeNum: {
    type: DataTypes.INTEGER,
    comment: '文章点赞量',
    set(value: number) {
      // 默认设置0
      this.setDataValue('readNum', value || 0)
    }
  },
}, {
  paranoid: true,
})