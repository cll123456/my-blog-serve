export interface IReadLikeAddParams {
  /**
   * 是否是阅读量
   */
  readNum?: boolean,
  /**
   * 是否是点赞
   */
  likeNum?: boolean,
  /**
   * 文章的id
   */
  articleId: string,
}