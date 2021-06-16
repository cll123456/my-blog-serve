import Koa from 'koa';
import router from './router/index'
import './model/initModel'
import { koaSwagger } from 'koa2-swagger-ui';
import bodyParser  from 'koa-bodyparser'
import cors from '@koa/cors'

const app = new Koa();

// 解析body
app.use(bodyParser());
app.use(cors());

app.use(router.routes());
app.use(router.allowedMethods());




app.use(
  koaSwagger({
    routePrefix: '/swagger', // host at /swagger instead of default /docs
    swaggerOptions: {
      url: '/swagger.json', // example path to json
      showRequestHeaders: true,
      layout: 'BaseLayout'
    },
    exposeSpec: true,
    hideTopbar: true
  }),
);

app.listen(5001, () => {
  console.log('the server is listen 5001 port');
})

