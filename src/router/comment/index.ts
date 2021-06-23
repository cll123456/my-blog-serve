import { genOpenApiMark } from '../../utils/swagger/openApiDecorators';
import router from './../../utils/swagger';
import CommentController from './../../controller/comment'


/**
 * 插入评论
 */
 genOpenApiMark('/comment/add', {
  post: {
    description: '添加评论!',
    summary: '添加评论',
    tags: ['评论'],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            properties: {
              pid: {
                description: '评论的父级节点',
                type: 'string',
                require: true
              },
              content: {
                description: '评论的内容',
                type: 'string',
                require: true
              },
              userId: {
                description: '所属用户',
                type: 'string',
                require: true
              },
              articleId: {
                description: '所属文章',
                type: 'string',
                require: true
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
router.post('/comment/add', CommentController.add)

/**
 * 修改评论
 */
 genOpenApiMark('/comment/update', {
  put: {
    description: '修改评论!',
    summary: '修改评论',
    tags: ['评论'],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            properties: {
              id: {
                description: '当前评论的id',
                type: 'string',
                require: true
              },
              pid: {
                description: '评论的父级节点',
                type: 'string',
                require: true
              },
              content: {
                description: '评论的内容',
                type: 'string',
                require: true
              },
              userId: {
                description: '所属用户',
                type: 'string',
                require: true
              },
              articleId: {
                description: '所属文章',
                type: 'string',
                require: true
              }
            }
          }
        }
      }
    },
    responses: {
      200: {
        description: '修改成功.'
      }
    }
  }
})
router.put('/comment/update', CommentController.update)

/**
 * 删除评论
 */
genOpenApiMark('/comment/delete/{id}', {
  delete: {
    description: '删除评论!',
    summary: '删除评论',
    tags: ['评论'],
    parameters: [
      {
        name: 'id',
        description: '评论的id',
        in: 'path',
        required: true
      }
    ],
    responses: {
      200: {
        description: '删除成功.'
      }
    }
  }
})
router.delete('/comment/delete/:id', CommentController.delete)