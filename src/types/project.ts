import { ParsedUrlQuery } from "querystring";

export interface IProjectListParam extends ParsedUrlQuery {
  /**
   * 当前第几页
   */
  pageNo: string,
  /**
   * 每页多少条
   */
  pageSize: string,
}