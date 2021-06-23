import validator from "validator";
import { UserModel } from "../../model/user";
import { IUserAddParams } from "../../types/user";

class UserService {
  /**
   * 添加用户
   * @param param {IUserAddParams}
   */
  async add(param: IUserAddParams) {
    // 判断库里面是否存在数据，存在直接返回，不存在则新增数据
    let mid = {
      nickName: param.nickName,
      accounter: param.accounter,
      email: param.email,
      avatar: param.avatar
    };
    const findOneRes = await UserModel.findOne({
      where: mid
    })
    if (findOneRes instanceof UserModel) {
      return {
        msg: '当前数据已经存在',
        data: findOneRes
      }
    } else {
      const res = await UserModel.create(mid);
      return {
        msg: '查询成功',
        data: res
      }
    }
  }
}

export default new UserService();