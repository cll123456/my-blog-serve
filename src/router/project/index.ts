import { genOpenApiMark } from '../../utils/swagger/openApiDecorators';
import router from './../../utils/swagger';
import ProjectController from './../../controller/project'


genOpenApiMark('/project/list', {
  get: {
    description: '查询项目列表!',
    summary: '查询项目列表',
    tags: ['项目'],
    parameters: [
      {
        name: 'pageNo',
        in: 'query',
        required: true
      },
      {
        name: 'pageSize',
        in: 'query',
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

router.get('/project/list', ProjectController.list)