# my-blog-serve
个人博客的服务端，采用的是 `node + koa + ts `等来实现 主要实现了`swagger`, 方便api进行管理。使用了` GitHub `和 `gitee` 进行第三方的授权登录对文章进行评论。

# use
- `npm install` 安装代码库
- `npm run dev` 启动开放环境
- `npm run build` 打包生成dist

## 数据库配置
> 修改 `src/config` 下面的`dbconfig.json` 

```typescript
"host": "", // 你的数据库地址
  "port": "", // 你的端口号
  "username": "root", // 你的用户名
  "password": "", // 你的密码
  "database": "", // 你的数据库名称
  "dialect": "mysql"
```
> 修改 `src/config` 下面的`loginjson` 

```typescript
"gitup_client_id": "", // gitup 授权登录的clientid
  "gitup_client_secrets": "", // gitup 授权登录的 secrets
  "gitee_client_id": "", // gitee 授权登录的clientid
  "gitee_client_secrets": "", // gitee 授权登录的  secrets
  "gitee_redirect_url": ""  // gitee 授权登录的回调
```


# 技术说明
> 改后台主要的`web`框架使用的是` koa2,` 集成了`swagger`, 方便api进行管理。使用了 GitHub 和 gitee 进行第三方的授权登录

使用`sequelize`进行操作数据库， 使用 `log4js` 进行日志记录， 使用 `validate.js` 来进行数据的校验等。

> 对于一个学习者来说，该代码很适合哦
