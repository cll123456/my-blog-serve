import sequelize from './../../utils/db/index';
import { DataTypes } from 'sequelize'
import { gunzipSync, gzipSync } from 'zlib';
import translate from '@vitalets/google-translate-api';
import {ArticleModel} from './../article'

export const TagCloudModel = sequelize.define('TagCloud', {
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
    type: DataTypes.STRING(40),
    comment: '标签的code,备用',
    // code是自动生成
    async set() {
      // 获取名字，翻译成英文作为code
      const name = this.getDataValue('name');
      const res = await translate(name, { from: 'zh-CN', to: 'en' });
      this.setDataValue('code', res)
    }
  },
  logo: {
    type: DataTypes.TEXT,
    comment: '云图标的logo,是一个base64位的的字符串',
    get() {
      // 获取数据进行解压
      const storedValue = this.getDataValue('logo');
      const gzippedBuffer = Buffer.from(storedValue, 'base64');
      const unzippedBuffer = gunzipSync(gzippedBuffer);
      return unzippedBuffer.toString();
    },
    set(value: string) {
      // 存入的数据进行压缩
      const gzippedBuffer = gzipSync(value);
      this.setDataValue('content', gzippedBuffer.toString('base64'));
    }
  }
}, {
  paranoid: true,
})

TagCloudModel.belongsToMany(ArticleModel, { through: 'TagCloudArticle' });
ArticleModel.belongsToMany(TagCloudModel, { through: 'TagCloudArticle' });
