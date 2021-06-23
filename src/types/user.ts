/**
 * 添加用户所需要的信息
 */
export interface IUserAddParams {
  /**
   * 用户名
   */
   nickName: string,
   /**
    * 头像地址
    */
   avatar: string,
   /**
    * 账号
    */
   accounter: string,
   /**
    * 邮箱
    */
   email: string
}