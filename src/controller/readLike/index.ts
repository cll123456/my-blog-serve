import Application from "koa";
import { IReadLikeAddParams } from "../../types/readLike";
import { dataFormate } from "../../utils/data";
import ReadLikeService from './../../service/readLike'

class ReadLikeController {
  /**
   * 添加一个阅读量或者是点赞量
   * @param ctx 
   */
  async add(ctx: Application.ParameterizedContext) {
    const bodyData = ctx.request.body as IReadLikeAddParams
    await ReadLikeService.add(bodyData)
    ctx.body = dataFormate('更新成功', 200);
  }
}


export default new ReadLikeController();