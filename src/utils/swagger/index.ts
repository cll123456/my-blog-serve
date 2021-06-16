import Router from '@koa/router'
import { swaggerJson } from './swaggerObj';
const router = new Router();

// 通过路由获取生成的注解文件
router.get('/swagger.json', async function (ctx) {
  ctx.set('Content-Type', 'application/json');
  ctx.body = swaggerJson;
})
export default router 