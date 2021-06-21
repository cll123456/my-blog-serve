import Application from 'koa'
import { IArticleListParam } from '../../types/article'
import { dataFormate } from '../../utils/data';
import ArticleService from './../../service/article'
class ArticleController {
  /**
   * 条件查询文件列表
   * @param ctx 
   */
  async list(ctx:Application.ParameterizedContext){
    // 获取查询参数
    const params = ctx.request.query as IArticleListParam
    const res = await ArticleService.list(params);
    ctx.body = dataFormate(res, 200)
  }
}

export default new ArticleController()