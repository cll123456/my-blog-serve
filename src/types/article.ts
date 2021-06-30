import { ParsedUrlQuery } from "querystring";

export interface IArticleListParam extends ParsedUrlQuery {
  /**
   * 当前第几页
   */
  pageNo: string,
  /**
   * 每页多少条
   */
  pageSize: string,
  /**
   * 通过标题模糊查询
   */
  title: string,
}

/**
 * 热门文章
 */
export interface IHotArticleListParam extends ParsedUrlQuery {
  /**
   * 当前第几页
   */
  pageNo: string,
  /**
   * 每页多少条
   */
  pageSize: string,
}

export interface IArticleAddParam {
  
}