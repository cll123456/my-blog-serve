# my-blog-serve
个人博客的服务端，采用的是 node + koa + ts 等来实现
# cruddev 分支说明：

> 突然发现自己在一段时间都没有写博客了，最近杂七杂八的事情比较多。一直搞个不停，最近在写个人博客后台，决定使用`koa`，然后自己肯定需要先搭建一个小`demo`方便代码的实现。
# 效果
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210616131138662.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQxNDk5Nzgy,size_16,color_FFFFFF,t_70)
> 这么些api接口，然后把`swagger`也给加上，方便测试和维护api的文档，这也是后端一直需要做的事情，作为前端工程师，咋们虽然写后台代码不多，但是需要知道人家的工作内容是咋样的，参数怎么传递的，这样有利于联调。

# 源码地址
[https://github.com/cll123456/my-blog-serve.git](https://github.com/cll123456/my-blog-serve.git)

# 项目搭建过程
## 包配置
| dependencies |  devDependencies|
|--|--|
|  `"@koa/cors": "^3.1.0"` 处理koa跨域| `"@types/koa__cors": "^3.0.2"` cors类型检查包 |
|  `""@koa/router": "^10.0.0"` koa路由|  `"@types/koa__router": "^2.13.3" ` 路由的类型检查包  |
|  ` "koa": "^2.13.1"` koa本身包|  `"@types/koa": "^2.13.3" ` koa的类型检查包  |
|  `"koa-bodyparser": "^4.3.0"` 解析koa body传参方式|  `"@types/koa-bodyparser": "^4.3.1"` koa处理body传参的类型检查包  |
|   `"koa2-swagger-ui": "^5.1.0"` swagger 的ui展示包|  `"@types/node": "^15.12.1" ` node的类型检查包  |
|  `"log4js": "^6.3.0"` 日志处理|  `"nodemon": "^2.0.7" ` 使用nodemon 来便捷开发  |
|  `"mysql2": "^2.2.5"` 处理mysql|  `"ts-node": "^10.0.0" ` ts代码编译直接在内存中进行编译  |
|  `"sequelize": "^6.6.2"` mysql的orm包|   `"typescript": "^4.3.2" ` 使用ts提供类型检查|
|  `"validator": "^10.11.0"` 数据验证|   `"@types/validator": "^13.1.4" ` validator的类型检查包 |
## 脚本配置

|build ，最终打包成一个`dist`,(这是windows的指令) | dev 启动nodemon 然后在`ts-node`中来编译代码|
|--|--|
| rd /s /q dist & tsc |  nodemon --watch src -e ts --exec ts-node src/index.ts|

## tsconfig 配置

```typescript
{
  "compilerOptions": {
    "target": "es5",                              
    "module": "commonjs",                          
    "lib": ["es2016","ESNext"],                                  
    "removeComments": true,                     
    "importHelpers": true,                      
    "isolatedModules": true,                   
    "strict": true,                               
    "esModuleInterop": true,      
    "resolveJsonModule":true,                 
    "experimentalDecorators": true,             
    "emitDecoratorMetadata": true,               
    "skipLibCheck": true,                          
    "forceConsistentCasingInFileNames": true,      
    "outDir": "./dist",  
  },
  "include": ["src", "utils/db", "utils/logger/logger.ts"], 
  "exclude": [
    "node_modules"
  ]
}
```
## 项目结构
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210616154055204.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQxNDk5Nzgy,size_16,color_FFFFFF,t_70)

|目录|  作用|
|--|--|
|  config|  项目配置文件 |
|  controller|  项目的控制层，默认是一个koa的中间件，主要的作用是精细化路由的中间件 |
|  model|  模型，主要是用来配置数据的字段和数据字段的验证等 |
|  router|  路由，对外暴露的路由层，这里用来配置swagger和路由的路径等 |
|  service| 业务逻辑层，主要用来操作模型，并且验证数据是否合理 |
|  util| 工具包，里面主要包含连接数据库，日志，swagger等 |
|  index.ts| 项目的主要入口，初始化操作和启动一个koa服务 |

> 本来想在这里写一个基本的流程，但是感觉每个层里面的东西有点多，写起来工作量有点大，这里只记录项目的核心，感兴趣的直接看源码就行。
