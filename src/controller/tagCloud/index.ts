import Application from "koa";
import { ITagCloudAddParam } from "../../types/tagCloud";
import { dataFormate } from "../../utils/data";
import TagCloudService from './../../service/tagCloud'

class TagCloudController {
  /**
   * 添加云标签的方法
   * @param ctx 
   */
  async add(ctx: Application.ParameterizedContext) {
    const data: ITagCloudAddParam = ctx.request.body as ITagCloudAddParam;
    try {
      // 调用插入数据
      const res = await TagCloudService.add(data);
      ctx.body = dataFormate(res || '插入成功', 200)
    } catch (err) {
      ctx.body = dataFormate(err.message, 500);
    }
  }

  /**
   * 查询所有的标签
   * @param ctx 
   */
  async findAll(ctx: Application.ParameterizedContext) {
    const res = await TagCloudService.findAll();
    ctx.body = dataFormate(res, 200)
  }

  /**
   * 通过标签获取文章
   * @param ctx 
   */
  async findArticlesByTagCloudId(ctx: Application.ParameterizedContext) {
    // 获取标签id
    const paramsObj = ctx.params
    const res = await TagCloudService.findArticlesByTagCloudId(paramsObj.id);
    ctx.body = dataFormate(res[0], 200);
  }
}

export default new TagCloudController();