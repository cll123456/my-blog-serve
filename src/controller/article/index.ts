import Application from 'koa'
import { IArticleListParam, IHotArticleListParam } from '../../types/article'
import { dataFormate } from '../../utils/data';
import ArticleService from './../../service/article'
class ArticleController {
  /**
   * 条件查询文件列表
   * @param ctx 
   */
  async list(ctx: Application.ParameterizedContext) {
    // 获取查询参数
    const params = ctx.request.query as IArticleListParam
    const res = await ArticleService.list(params);
    ctx.body = dataFormate(res, 200)
  }

  /**
   * 获取热门文章
   * @param ctx 
   */
  async getHotArticleList(ctx: Application.ParameterizedContext) {
    // 获取查询参数
    const params = ctx.request.query as IHotArticleListParam
    const res = await ArticleService.getHotArticleList(params)
    ctx.body = dataFormate(res, 200)
  }
  /**
   * 查询文章的详情
   * @param ctx 
   */
  async findArticleDetailById(ctx: Application.ParameterizedContext) {
    const paramObj = ctx.params as { id: string };
    // 获取id
    try {
      const res = await ArticleService.findArticleDetailById(paramObj.id);
      ctx.body = dataFormate(res, 200)
    } catch (err) {
      ctx.body = dataFormate(err, 500)
    }
  }
  /**
   * 添加文章
   * @param ctx 
   */
  async add(ctx: Application.ParameterizedContext) {
    const param = ctx.request.body;
  }
}

export default new ArticleController()