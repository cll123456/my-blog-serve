import Application from "koa";
import { dataFormate } from "../../utils/data";
import TestService from './../../service/test'
/**
 * 测试的控制层
 */
class Test {
  /**
   * 
   * @param ctx 查询
   */
  async index(ctx: Application.ParameterizedContext) {
    const res = await TestService.findAllData();
    ctx.body = dataFormate(res, 200);
  }

  /**
   * 插入数据
   * @param ctx 
   */
  async increase(ctx: Application.ParameterizedContext) {
    const { testName, testCode } = ctx.request.body as any;
    try {
      await TestService.insertData(testName, testCode);
      ctx.body = dataFormate('插入成功', 200)
    } catch (err) {
      ctx.body = dataFormate(err.message, 500);
    }
  }
  /**
   * 通过id 来查询
   * @param ctx 
   */
  async findById(ctx: Application.ParameterizedContext) {
    const paramObj = ctx.params;
    const res = await TestService.findById(paramObj.id);
    ctx.body = dataFormate(res, 200);
  }
  /**
   * 更新数据
   * @param ctx 
   */
  async updateDataById(ctx: Application.ParameterizedContext) {
    // 获取id
    const paramObj = ctx.params;
    //从body中获取其他更新的数据
    const data = ctx.request.body as any;
    try {
      const res = await TestService.updateData(paramObj.id, data);
      if (res[0] === 0) {
        ctx.body = dataFormate('id 不存在', 500);
      } else {
        ctx.body = dataFormate('更新成功', 200);
      }
    } catch (err) {
      ctx.body = dataFormate(err.message, 500);
    }
  }
/**
 * 删除数据
 * @param ctx 
 */
  async delDataById(ctx: Application.ParameterizedContext) {

    // 获取id
    const paramObj = ctx.params;
    try {
      const res = await TestService.delDataById(paramObj.id);
      if (res === 0) {
        ctx.body = dataFormate('id 不存在', 500);
      } else {
        ctx.body = dataFormate('删除成功', 200);
      }
    } catch (err) {
      ctx.body = dataFormate(err.message, 500);
    }
  }

}

export default new Test();