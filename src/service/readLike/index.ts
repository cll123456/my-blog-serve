import { ReadLikeModel } from "../../model/readLike";
import { IReadLikeAddParams, IReadLikeQueryList } from "../../types/readLike";

/**
 * 点赞服务含有 新增点赞和取消点赞
 */
class ReadLikeService {
  /**
   * 添加一个阅读量或者是点赞量
   * @param param 
   * @returns 
   */
  async add(param: IReadLikeAddParams) {
    // 获取当前的实例
    const readLikeInstance: IReadLikeQueryList = await ReadLikeModel.findOne({
      where: {
        articleId: param.articleId
      }
    }) as any

    // 修改阅读量
    if (param.readNum) {
      const num = readLikeInstance.readNum + 1;
      await ReadLikeModel.update({ readNum: num }, {
        where: {
          articleId: param.articleId
        }
      })
      return
    }

     // 修改点赞量,这里只做点赞，不做取消点赞
     if (param.likeNum) {
      const likeNum = readLikeInstance.likeNum + 1;
      await ReadLikeModel.update({ likeNum: likeNum }, {
        where: {
          articleId: param.articleId
        }
      })
    }
  }

  
}

export default new ReadLikeService();