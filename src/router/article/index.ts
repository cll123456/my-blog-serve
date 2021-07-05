import { genOpenApiMark } from '../../utils/swagger/openApiDecorators';
import router from './../../utils/swagger';
import ArticleController from './../../controller/article'

/**
 * 分页获取文章
 */
genOpenApiMark('/article/list', {
  get: {
    description: '分页获取文章数据!',
    summary: '分页获取文章数据',
    tags: ['文章'],
    parameters: [
      {
        name: 'pageNo',
        in: 'query',
        description: '当前第几页',
      },
      {
        name: 'pageSize',
        in: 'query',
        description: '每页多少条，默认一页12条',
      },
      {
        name: 'title',
        in: 'query',
        description: '文章的标题，通过标题来模糊查询',
      },
      {
        name: 'tagCloudId',
        in: 'query',
        description: '文章的标签，通过标签查询',
      },
    ],
    responses: {
      200: {
        description: '全部的list数据或者null.'
      }
    }
  }
})
router.get('/article/list', ArticleController.list)



/**
 * 获取5条热门文章
 */
 genOpenApiMark('/article/getHotArticleList', {
  get: {
    description: '获取热门文章数据!',
    summary: '获取热门文章数据',
    tags: ['文章'],
    parameters: [
      {
        name: 'pageNo',
        in: 'query',
        description: '当前第几页',
      },
      {
        name: 'pageSize',
        in: 'query',
        description: '每页多少条，默认5条',
      },
    ],
    responses: {
      200: {
        description: '全部的list数据或者null.'
      }
    }
  }
})
router.get('/article/getHotArticleList', ArticleController.getHotArticleList)


/**
 * 获取文章详情
 */
 genOpenApiMark('/article/findArticleDetailById/{id}', {
  get: {
    description: '获取文章详情!',
    summary: '获取文章详情',
    tags: ['文章'],
    parameters: [
      {
        name: 'id',
        in: 'path',
        description: '文章id',
      }
    ],
    responses: {
      200: {
        description: '全部的list数据或者null.'
      }
    }
  }
})
router.get('/article/findArticleDetailById/:id', ArticleController.findArticleDetailById)