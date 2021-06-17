import { genOpenApiMark } from '../../utils/swagger/openApiDecorators';
import router from './../../utils/swagger';
import MyselfController from './../../controller/myself'


genOpenApiMark('/myself/list', {
  get: {
    description: '查询关于我的全部信息!',
    summary: '查询关于我的全部信息',
    tags: ['关于我'],
    responses: {
      200: {
        description: '返回查询的list结果.'
      }
    }
  },
})
router.get('/myself/list', MyselfController.list)