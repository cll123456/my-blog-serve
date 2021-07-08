import { ParsedUrlQuery } from "querystring";

/**
 * gitup 回调的地址栏上的参数
 */
export interface ILoginGitUpCallbackParams extends ParsedUrlQuery {
  /**
   * gitup回调后的code
   */
  code: string, 
}

/**
 * 获取gitup access_token的类似
 */
export interface ILoginGitUpTokenParam extends qs.ParsedQs {
  /**
   * token
   */
  access_token: string,
  /**
   * 作用域
   */
  scope: string,
  /**
   * token的类型
   */
  token_type: string
}

/**
 * gitup 获取的用户信息
 */
export interface ILoginGitUpRes {
  /**
   * 用户名
   */
  name: string,
  /**
   * 头像地址
   */
  avatar_url: string,
  /**
   * 账号
   */
  login: string,
  /**
   * 邮箱
   */
  email: string
}
