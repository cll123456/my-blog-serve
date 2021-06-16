import Test from './../controller/test/index'
import { genOpenApiMark } from '../utils/swagger/openApiDecorators';
import router from './../utils/swagger'
/**
 * 生成测试模块查询全部接口的swagger
 */
genOpenApiMark('/findAll', {
  get: {
    description: '查询列表所有的数据!',
    summary: '查询列表所有的数据',
    tags: ['默认模块'],
    responses: {
      200: {
        description: '返回查询的list结果.'
      }
    }
  },
})
router.get('/findAll', Test.index)

/**
 * 生成测试模块按需查询接口的swagger
 */
genOpenApiMark('/findById/{id}', {
  get: {
    description: '通过id来查询!',
    summary: '通过id来查询',
    tags: ['默认模块'],
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true
      }
    ],
    responses: {
      200: {
        description: '返回查询的list结果.'
      }
    }
  },
})
router.get('/findById/:id', Test.findById)

/**
 * 生成测试模块新增接口的swagger
 */
genOpenApiMark('/increase', {
  post: {
    description: '插入数据!',
    summary: '插入数据',
    tags: ['默认模块'],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            properties: {
              testName: {
                description: '测试名字',
                type: 'string'
              },
              testCode: {
                description: '测试code',
                type: 'string'
              }
            }
          }
        }
      }
    },
    responses: {
      200: {
        description: '插入成功.'
      }
    }
  },
})
router.post('/increase', Test.increase);

/**
 * 生成测试模块更新接口的swagger
 */
genOpenApiMark('/updateDataById/{id}', {
  put: {
    description: '更新数据!',
    summary: '更新数据',
    tags: ['默认模块'],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            properties: {
              testName: {
                description: '测试名字',
                type: 'string'
              },
              testCode: {
                description: '测试code',
                type: 'string'
              }
            }
          }
        }
      }
    },
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true
      }
    ],
    responses: {
      200: {
        description: '更新成功.'
      }
    }
  },
})
router.put('/updateDataById/:id', Test.updateDataById);


/**
 * 生成测试模块删除接口的swagger
 */
genOpenApiMark('/delDataById/{id}', {
  delete: {
    description: '删除数据!',
    summary: '删除数据',
    tags: ['默认模块'],
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true
      }
    ],
    responses: {
      200: {
        description: '删除成功.'
      }
    }
  },
})
router.delete('/delDataById/:id', Test.delDataById);

