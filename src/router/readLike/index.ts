import ReadLikeController from './../../controller/readLike';
import { genOpenApiMark } from '../../utils/swagger/openApiDecorators';
import router from './../../utils/swagger';

/**
 * 添加阅读访问量和点赞量
 */
genOpenApiMark('/readLike/add', {
  post: {
    description: '添加阅读访问量和点赞量!',
    summary: '添加阅读访问量和点赞量',
    tags: ['阅读点赞'],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            properties: {
              articleId: {
                description: '文章id',
                type: 'string'
              },
              readNum: {
                description: '是否是阅读量',
                type: 'boolean'
              },
              likeNum: {
                description: '是否是点赞量',
                type: 'boolean'
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
router.post('/readLike/add', ReadLikeController.add)