import validator from "validator";
import { CommentModel } from "../../model/comment";
import { ICommentAddParams, ICommentUpdateParams } from "../../types/comment";
import sequelize from "../../utils/db";

class CommentService {
  /**
   * 新增评论
   * @param param {ICommentAddParams}
   */
  async add(param: ICommentAddParams) {
    // 判断参数是否存在

    if (isNaN(Number(param.pid)) || Number(param.pid) === 0) {
      Promise.reject('pid is not empty');
    }
    if (validator.isEmpty(param.content)) {
      Promise.reject('content is not empty');
    }
    if (isNaN(Number(param.userId))) {
      Promise.reject('userId is not empty');
    }
    if (isNaN(Number(param.articleId))) {
      Promise.reject('articleId is not empty');
    }

    try {
      // 增加文章的评论
      const res = await CommentModel.create(param);
      console.log(res, '增加结果res');

      // 查询所有的评论
      return await this.findByArticleId(param.articleId);
    } catch (err) {
      console.log(err, '-----err');

      return err;
    }
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

  /**
   * 通过文章id查询评论
   * @param articleId 
   * @returns 
   */
  async findByArticleId(articleId: string) {
    // 获取文章的评论和用户
    return await sequelize.query(`
     SELECT
     c.content AS content,
     c.pid AS pid,
     c.id AS id,
     u.nickName AS nickName,
     u.accounter AS accounter,
     u.email AS email,
     u.avatar AS avatar,
     u.createdAt as  createdAt
   FROM
     comments AS c,
     users AS u 
   WHERE
     c.userId = u.id 
     AND c.articleId = ${articleId} 
     AND ISNULL( c.deletedAt ) 
   ORDER BY
     c.createdAt DESC
   `)
  }
}

export default new CommentService();