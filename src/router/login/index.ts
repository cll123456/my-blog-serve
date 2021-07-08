import { genOpenApiMark } from '../../utils/swagger/openApiDecorators';
import router from './../../utils/swagger';
import LoginController from './../../controller/login'

/**
 * 获取code
 */
genOpenApiMark('/login/gitup', {
  get: {
    description: '使用gitup进行登录!',
    summary: 'gitup进行登录',
    tags: ['登录模块'],
    responses: {
      200: {
        description: '重定向gitup获取code',
      }
    }
  }
})
router.get('/login/gitup', LoginController.loginByGitUp);


/**
 * 获取gitup  access_token
 */
router.get('/gitup/oauth/callback', LoginController.gitUpCallBack)


/**
 * 获取code
 */
genOpenApiMark('/login/gitee', {
  get: {
    description: '使用gitee进行登录!',
    summary: '使用gitee进行登录',
    tags: ['登录模块'],
    responses: {
      200: {
        description: '重定向gitee获取code',
      }
    }
  }
})
router.get('/login/gitee', LoginController.loginByGitee);
/**
 * gitee的回调
 */
router.get('/gitee/oauth/callback', LoginController.giteeCallBack)