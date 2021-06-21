export interface IReadLikeAddParams extends Record<string, string |unknown> {
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


/**
 * 查询的阅读点赞的结果
 */
export interface IReadLikeQueryList {
  /**
   * 查询的id
   */
  id: string,
  /**
   * 阅读量
   */
  readNum: number,
  /**
   * 点赞量
   */
  likeNum: number
}