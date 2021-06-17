import { MyselfInfoModel } from "../../model/myselfInfo";

class MyselfService {
  /**
   * 获取个人信息
   */
  async list() {
    const res = await MyselfInfoModel.findAll();
    if (res.length === 1) {
      return res[0];
    } else {
      return res;
    }
  }
}

export default new MyselfService();