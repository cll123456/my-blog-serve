import { TagCloudModel } from "../../model/tagCloud";
import { ITagCloudAddParam } from "../../types/tagCloud";
import { pinyin, PINYIN_STYLE } from '@napi-rs/pinyin';
import validator from "validator";
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
  async findAll(){
   return await TagCloudModel.findAll()
  }
}

export default new TagCloudService();

