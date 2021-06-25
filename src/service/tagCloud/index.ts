import { TagCloudModel } from "../../model/tagCloud";
import { ITagCloudAddParam } from "../../types/tagCloud";
import { pinyin, PINYIN_STYLE } from '@napi-rs/pinyin';
import validator from "validator";
import sequelize from "../../utils/db";
class TagCloudService {
  /**
   * 插入数据
   * @param data {ITagCloudAddParam}
   * @returns 
   */
  async add(data: ITagCloudAddParam) {
    if (validator.isEmpty(data.logo)) {
      throw Error('name not allow empty');
    }
    try {
      // 获取名字的code
      const code = pinyin(data.name, { style: PINYIN_STYLE.Plain }).join('-') + '-' + Math.random().toString(32).slice(2, 9);
      let addObj = { ...data, code: code };
      // 判断数据存不存在
      const tagCloudRes = await TagCloudModel.findOne({
        where: {
          name: addObj.name,
        }
      })
      if (tagCloudRes instanceof TagCloudModel) {
        return {
          msg: '当前数据已经存在'
        }
      } else {
        await TagCloudModel.create(addObj)
      }
    } catch (err) {
      throw Error(err.message);
    }
  }
  /**
   * 获取所有的标签
   * @returns 
   */
  async findAll() {
  const res =  await sequelize.query(`
    SELECT
      t.*,
      COUNT( tc.articleId ) AS articleCounts 
    FROM
      tagclouds AS t,
      tagcloudarticles tc 
    WHERE
      t.id = tc.tagCloudId 
    GROUP BY
      t.NAME
    `)
    return res[0]
  }

  /**
   * 通过标签来查询文章
   * @param tagCloudId 
   * @returns 
   */
  async findArticlesByTagCloudId(tagCloudId: string) {
    // 这里需要做防止sql注入
    if (Number(tagCloudId) === NaN) {
      throw Error('tagCloudId is a string number')
    }
    return await sequelize.query(`SELECT * FROM articles WHERE id in (SELECT articleId FROM tagcloudarticles WHERE tagCloudId = ${tagCloudId})`)
  }

}

export default new TagCloudService();

