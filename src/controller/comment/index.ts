import Application from "koa";
import { ICommentAddParams, ICommentUpdateParams } from "../../types/comment";
import { dataFormate } from "../../utils/data";
import CommentService from './../../service/comment'

/**
 *  评论有添加评论，修改评论和删除评论，评论没有查询
 */
class CommentController {
  /**
   * 添加评论
   * @param ctx 
   */
  async add(ctx: Application.ParameterizedContext) {
    // 获取新增的参数
    const params = ctx.request.body as ICommentAddParams;
    // 调用模块来进行新增
    try {
      await CommentService.add(params);
      ctx.body = dataFormate('留言成功！', 200)
    } catch (err) {
      ctx.body = dataFormate(err, 500)
    }
  }
  /**
   * 编辑评论
   * @param ctx 
   */
  async update(ctx: Application.ParameterizedContext) {
    // 获取参数
    const params = ctx.request.body as ICommentUpdateParams;
    try {
      await CommentService.update(params);
      ctx.body = dataFormate('修改成功！', 200);
    } catch (err) {
      ctx.body = dataFormate(err, 500)
    }
  }
  /**
   * 删除评论
   * @param ctx 
   */
  async delete(ctx: Application.ParameterizedContext) {
    // 获取/ 后面的参数
    const paramObj = ctx.params as { id: string };
    // 调用删除
    try {
      await CommentService.delete(paramObj.id)
      ctx.body = dataFormate('删除成功！', 200);
    } catch (err) {
      ctx.body = dataFormate(err, 500)
    }
  }
}

export default new CommentController();