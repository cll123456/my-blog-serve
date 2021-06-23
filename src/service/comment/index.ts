import validator from "validator";
import { CommentModel } from "../../model/comment";
import { ICommentAddParams, ICommentUpdateParams } from "../../types/comment";

class CommentService {
  /**
   * 新增评论
   * @param param {ICommentAddParams}
   */
  async add(param: ICommentAddParams) {
    // 判断参数是否存在
    if (validator.isEmpty(param.pid)) {
      param.pid = '0';
    }
    if (validator.isEmpty(param.content)) {
      throw Error('content is not empty');
    }
    if (validator.isEmpty(param.userId)) {
      throw Error('userId is not empty');
    }
    if (validator.isEmpty(param.articleId)) {
      throw Error('articleId is not empty');
    }
    return await CommentModel.create(param);
  }
  /**
   * 编辑评论
   * @param params 
   */
  async update(params: ICommentUpdateParams) {
    if (validator.isEmpty(params.id)) {
      throw Error('comment id is not empty');
    }
    if (validator.isEmpty(params.content)) {
      throw Error('content is not empty');
    }
    if (validator.isEmpty(params.userId)) {
      throw Error('userId is not empty');
    }
    if (validator.isEmpty(params.articleId)) {
      throw Error('articleId is not empty');
    }
    if (validator.isEmpty(params.pid)) {
      throw Error('pid is not empty');
    }

    return await CommentModel.update({
      content: params.content
    }, {
      where: {
        id: params.id
      }
    })
  }
  /**
   * 删除评论
   */
  async delete(id: string) {
    if (validator.isEmpty(id)) {
      throw Error('comment id is not empty');
    }
    return await CommentModel.destroy({
      where: {
        id
      }
    })
  }
}

export default new CommentService();