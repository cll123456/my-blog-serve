/**
 * 标签云插入的数据类型
 */
export interface ITagCloudAddParam extends Record<string, string> {
  /**
   * 标签的名字
   */
  name: string,
  /**
   * 标签的logo,一个base64位的字符串
   */
  logo: string,
}