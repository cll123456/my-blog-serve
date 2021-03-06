import sequelize from './../../utils/db/index';
import { DataTypes } from 'sequelize'
import { gunzipSync, gzipSync } from 'zlib';
import { ArticleModel } from './../article'

export const TagCloudModel = sequelize.define('tagCloud', {
  // 在这里定义模型属性
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: '自增主键id',
    unique: true,
  },
  name: {
    type: DataTypes.STRING(100),
    comment: '标签名称',
    allowNull: false,
  },
  code: {
    type: DataTypes.STRING(100),
    comment: '标签的code,备用',
  },
  logo: {
    type: DataTypes.TEXT,
    comment: '云图标的logo,是一个base64位的的字符串',
  }
}, {
  paranoid: true,
})

TagCloudModel.belongsToMany(ArticleModel, { through: 'TagCloudArticles' });
ArticleModel.belongsToMany(TagCloudModel, { through: 'TagCloudArticles' });
