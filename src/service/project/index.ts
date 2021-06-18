import validator from "validator";
import { ProjectModel } from "../../model/project";
import { IProjectListParam } from "../../types/project";

class ProjectService {
  /**
   * 分页获取文章
   * @param param 
   * @returns 
   */
  async list(param: IProjectListParam) {
    // 判断数据是否为空
    if (!param.pageNo || validator.isEmpty(param.pageNo)) {
      param.pageNo = '1';
    }
    if (!param.pageSize || validator.isEmpty(param.pageSize)) {
      param.pageNo = '6';
    }
    // 查询分页数据
    return await ProjectModel.findAndCountAll({
      limit: Number(param.pageSize),
      offset: (Number(param.pageNo) - 1) * Number(param.pageSize),
      order: [
        ['createdAt', 'DESC'],
      ]
    })
  }
}

export default new ProjectService();