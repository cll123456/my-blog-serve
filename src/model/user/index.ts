import sequelize from './../../utils/db/index';
import { DataTypes } from 'sequelize'
import { gunzipSync, gzipSync } from 'zlib';
import { CommentModel } from '../comment';

// 用户模型
export const UserModel = sequelize.define('user', {
  // 在这里定义模型属性
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: '自增主键id',
    unique: true,
  },
  nickName: {
    type: DataTypes.STRING(100),
    comment: '用户的昵称'
  },
  accounter: {
    type: DataTypes.STRING(100),
    comment: '账号',
    allowNull: false,
  },
  avatar: {
    type: DataTypes.TEXT,
    comment: '用户头像',
    get() {
      // 获取数据进行解压
      const storedValue = this.getDataValue('avatar');
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
  paranoid: true
})


// 一个用户有多个评论
UserModel.hasMany(CommentModel);
CommentModel.belongsTo(UserModel, {
  foreignKey: 'userId'
})