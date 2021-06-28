import Application from "koa";
import { IProjectListParam } from "../../types/project";
import { dataFormate } from "../../utils/data";
import ProjectService from './../../service/project'

class ProjectController {
  /**
   * 分页模糊查询项目
   * @param ctx 
   */
   async list(ctx: Application.ParameterizedContext){
     // 获取两个参数，当前是第几页，分页多少条
     const param = ctx.request.query as IProjectListParam;
     // 获取查询的数据
     const res = await ProjectService.list(param);

     ctx.body = dataFormate(res, 200)
   }

   /**
    * 获取热门项目
    * @param ctx 
    */
   async getHotProject(ctx: Application.ParameterizedContext){
      // 获取查询的数据
      const res = await ProjectService.getHotProject();
      ctx.body = dataFormate(res, 200)
   }
}

export default new ProjectController();