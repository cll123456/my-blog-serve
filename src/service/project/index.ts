import validator from "validator";
import { ProjectModel } from "../../model/project";
import { IProjectListParam } from "../../types/project";
import {Op} from 'sequelize' 

class ProjectService {
  /**
   * 分页获取项目
   * @param param 
   * @returns 
   */
  async list(param: IProjectListParam) {
    // 判断数据是否为空
    if (!param.pageNo || validator.isEmpty(param.pageNo)) {
      param.pageNo = '1';
    }
    if (!param.pageSize || validator.isEmpty(param.pageSize)) {
      param.pageSize = '6';
    }
    if(!param.title || validator.isEmpty(param.title)){
      param.title = ''
    }
    // 查询分页数据
    return await ProjectModel.findAndCountAll({
      where: {
        title: {
          [Op.like]: `%${param.title}%`
        }
      },
      limit: Number(param.pageSize),
      offset: (Number(param.pageNo) - 1) * Number(param.pageSize),
      order: [
        ['createdAt', 'DESC'],
      ]
    })
  }

  /**
   * 获取热门项目
   * @returns 
   */
  async getHotProject(){
   return await ProjectModel.findAndCountAll({
     limit: 5,
     order: [
      ['createdAt', 'DESC'],
    ]
   })
  }
}

export default new ProjectService();