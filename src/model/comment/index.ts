import sequelize from './../../utils/db/index';
import { DataTypes } from 'sequelize'
import { gunzipSync, gzipSync } from 'zlib';
import { ArticleModel } from '../article';

export const CommentModel = sequelize.define('comment', {
  // 在这里定义模型属性
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: '自增主键id',
    unique: true,
  },
  content:{
    type: DataTypes.TEXT,
    comment: '评论内容',
  },
  pid: {
    type: DataTypes.INTEGER,
    comment: '父级id,用于处理评论的父级节点'
  }
}, {
  paranoid: true,
})

// 文章与评论是一对多的关系
ArticleModel.hasMany(CommentModel);
CommentModel.belongsTo(ArticleModel, {
  foreignKey: 'articleId'
})