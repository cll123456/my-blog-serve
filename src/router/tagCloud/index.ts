import TagCloudController from './../../controller/tagCloud';
import { genOpenApiMark } from '../../utils/swagger/openApiDecorators';
import router from './../../utils/swagger';


/**
 * 插入标签
 */
genOpenApiMark('/tagCloud/add', {
  post: {
    description: '插入数据!',
    summary: '插入数据',
    tags: ['标签云'],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            properties: {
              name: {
                description: '标签的名字',
                type: 'string'
              },
              logo: {
                description: '标签的图标，一个base64位的字符串',
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
  }
})
router.post('/tagCloud/add', TagCloudController.add)


/**
 * 获取标签云的所有数据
 */
genOpenApiMark('/tagCloud/findAll', {
  get: {
    description: '获取所有数据!',
    summary: '获取所有数据',
    tags: ['标签云'],
    responses: {
      200: {
        description: '全部的list数据或者null.'
      }
    }
  }
})
router.get('/tagCloud/findAll', TagCloudController.findAll);

/**
 * 通过标签获取改标签下面的所有文章
 */
genOpenApiMark('/tagCloud/findArticlesByTagCloudId/{id}', {
  get: {
    description: '通过标签获取改标签下面的所有文章!',
    summary: '通过标签获取改标签下面的所有文章',
    tags: ['标签云'],
    parameters: [{
      name: 'id',
      in: 'path',
      description: '文章的id'
    }],
    responses: {
      200: {
        description: '标签下面的文章数据.'
      }
    }
  }
})
router.get('/tagCloud/findArticlesByTagCloudId/:id', TagCloudController.findArticlesByTagCloudId)