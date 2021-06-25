import sequelize from '../../utils/db/index';
import { DataTypes } from 'sequelize'

export const MyselfInfoModel = sequelize.define('myself', {
  // 在这里定义模型属性
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: '自增主键id',
    unique: true,
  },
  enName: {
    type: DataTypes.STRING(100),
    comment: '英文名字'
  },
  znName: {
    type: DataTypes.STRING(100),
    comment: '中文名字'
  },
  sex: {
    type: DataTypes.BOOLEAN,
    comment: '性别',
    get() {
      const value = this.getDataValue('sex');
      return value ? '男' : '女'
    }
  },
  selfIntroduce: {
    type: DataTypes.STRING(255),
    comment: '个人简介'
  },
  birthday: {
    type: DataTypes.STRING(100),
    comment: '出生日期'
  },
  startWork: {
    type: DataTypes.STRING(100),
    comment: '开始工作'
  },
  schoolName: {
    type: DataTypes.STRING(100),
    comment: '学校名称'
  },
  mayjor: {
    type: DataTypes.STRING(100),
    comment: '专业'
  },
  education: {
    type: DataTypes.STRING(100),
    comment: '学历'
  },
  companyName: {
    type: DataTypes.STRING(100),
    comment: '所属公司名称'
  },
  postName: {
    type: DataTypes.STRING(100),
    comment: '岗位名称'
  },
  industry: {
    type: DataTypes.STRING(100),
    comment: "所属行业"
  },
  skill: {
    type: DataTypes.STRING(255),
    comment: '个人的技能'
  },
  hobby: {
    type: DataTypes.STRING(255),
    comment: '兴趣爱好'
  }
})