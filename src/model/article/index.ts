import sequelize from './../../utils/db/index';
import { DataTypes } from 'sequelize'
import { gunzipSync, gzipSync } from 'zlib';
import { ReadLikeModel } from './../readLike';

export const ArticleModel = sequelize.define('article', {
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
    comment: '文章标题',
    allowNull: false
  },
  subTitle: {
    type: DataTypes.STRING(255),
    comment: '文章副标题'
  },
  imgUrl: {
    type: DataTypes.STRING(255),
    allowNull: false,
    comment: '文章的图片，不能为空'
  },
  content: {
    type: DataTypes.TEXT,
    comment: '文章内容，存一个html文件',
    allowNull: true
  }
}, {
  paranoid: true,
});

// 文章和阅读点赞量是一一对应关系
ArticleModel.hasOne(ReadLikeModel);
ReadLikeModel.belongsTo(ArticleModel, {
  foreignKey: 'articleId'
})


