/**
 * 评论新增的参数
 */
export interface ICommentAddParams extends Record<string, string> {
  /**
   * 评论的父级节点
   */
  pid: string,
  /**
   * 评论的内容
   */
  content: string,
  /**
   * 文章id
   */
  articleId: string,
  /**
   * 用户id
   */
  userId: string,
}
/**
 * 编辑的参数
 */
export interface ICommentUpdateParams extends ICommentAddParams{
  id: string
}