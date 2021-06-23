import Application from "koa";
import { ILoginGitUpCallbackParams, ILoginGitUpRes, ILoginGitUpTokenParam } from "../../types/login";
import loginJson from './../../config/login.json'
import qs from 'qs'
import { dataFormate } from "../../utils/data";
import validator from "validator";
import axios from 'axios';
import UserService from './../../service/user'

class LoginController {
  /**
   * 通过gitup来进行授权登录
   * @param ctx 
   */
  async loginByGitUp(ctx: Application.ParameterizedContext) {
    // 重定向到gitup授权登录
    ctx.redirect('https://github.com/login/oauth/authorize?client_id=' + loginJson.gitup_client_id);
  }
  /**
   * gitup的回调
   * @param ctx 
   */
  async gitUpCallBack(ctx: Application.ParameterizedContext) {
    // 获取code
    const { code } = ctx.request.query as ILoginGitUpCallbackParams;
    // 获取到code后，请求gitup服务获取access_token
    try {
      const accessToken = await axios({
        method: 'post',
        url: `https://github.com/login/oauth/access_token?client_id=${loginJson.gitup_client_id}&client_secret=${loginJson.gitup_client_secrets}&code=` + code,
        timeout: 1000 * 1200
      })
      const accessTokenObj = qs.parse(accessToken.data) as ILoginGitUpTokenParam;
      // 判断token是否存在，存在的话需要进行获取数据
      if (!validator.isEmpty(accessTokenObj.access_token)) {
        // 获取用户信息
        try {
        let user = await axios.get('https://api.github.com/user', {
          headers: {
            'Authorization': accessTokenObj.token_type + ' ' + accessTokenObj.access_token
          }
        })
        let userRes = user.data as ILoginGitUpRes;
        // // 将用户数据保存到数据库
        const serverRes = await UserService.add({ avatar: userRes.avatar_url, email: userRes.email, accounter: userRes.login, nickName: userRes.name })
        // console.log(serverRes, '-------serverRes');

        ctx.body = dataFormate(serverRes, 200)
        } catch (err) {
          ctx.body = dataFormate(err, 500)
        }
      }
    } catch (err) {
      console.log(err);
      
      ctx.body = dataFormate('您的电脑能打开gitup么？', 500)
    }

  }
}

export default new LoginController();