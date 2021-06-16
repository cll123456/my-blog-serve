import { TestModel } from "../../model/test";
import validator from 'validator';

class TestService {
  /**
   * 插入数据
   * @param testName 
   * @param testCode 
   */
  async insertData(testName: string, testCode: string) {
    if (validator.isEmpty(testName)) {
      throw Error('testName is not empty')
    }
    else if (validator.isEmpty(testCode)) {
      throw Error('testCode is not empty')
    } else {
      await TestModel.create({ testName, testCode });
    }
  }

  /**
   * 查询所有的数据
   * @returns 
   */
  async findAllData() {
    return await TestModel.findAll();
  }
  /**
   * 通过id来查询
   * @param id 
   */
  async findById(id: string) {
    return await TestModel.findOne({
      where: {
        id: id
      }
    })
  }
  /**
   * 更新数据
   * @param id  
   * @param data 
   */
  async updateData(id: string, data: { testName?: string, testCode?: string }) {
    if (validator.isEmpty(id)) {
      throw Error('id is not empty')
    } else {
      let obj: { testName?: string, testCode?: string } = {};
      if (data.testName && !validator.isEmpty(data.testName)) {
        obj.testName = data.testName;
      }
      if (data.testCode && !validator.isEmpty(data.testCode)) {
        obj.testCode = data.testCode;
      }
      // 更新数据
     return TestModel.update(obj, {
        where: {
          id,
        }
      })
    }
  }
  /**
   * 通过id来删除数据
   * @param id 
   */
  async delDataById(id: string) {
    if (validator.isEmpty(id)) {
      throw Error('id is not empty')
    } else {
     return await TestModel.destroy({
        where: {
          id
        }
      });
    }
  }
}

export default new TestService()