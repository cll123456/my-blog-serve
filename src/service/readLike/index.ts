import { ReadLikeModel } from "../../model/readLike";
import { IReadLikeAddParams } from "../../types/readLike";

/**
 * 点赞服务含有 新增点赞和取消点赞
 */
class ReadLikeService{
  async add(param: IReadLikeAddParams){
    // 获取当前的实例
    const readLikeInstance = await ReadLikeModel.findOne({
      where: {
        articleId: param.articleId
      }
    })

    // 修改当前的阅读量
    if(param.readNum){
    // ReadLikeModel.update({readNum: readLikeInstance?.getDataValue('readNum')})
    }
  }
}

export default new ReadLikeService();