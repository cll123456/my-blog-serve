import Application from "koa";
import { dataFormate } from "../../utils/data";
import MyselfService from './../../service/myself'

class MyselfController {
  /**
   * 获取关于我的信息
   * @param ctx 
   */
  async list(ctx: Application.ParameterizedContext){
    const res = await MyselfService.list();
    ctx.body = dataFormate(res, 200);
  }
}

export default new MyselfController();