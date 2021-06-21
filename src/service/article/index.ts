import validator from "validator";
import { ArticleModel } from "../../model/article";
import { IArticleListParam } from "../../types/article";
import sequelize from "../../utils/db";

class ArticleService {
  /**
   * 分页查询文章
   * @param param {IArticleListParam}
   * @returns 
   */
  async list(param: IArticleListParam) {
    // 判断数据是否为空
    if (!param.pageNo || validator.isEmpty(param.pageNo)) {
      param.pageNo = '1';
    }
    if (!param.pageSize || validator.isEmpty(param.pageSize)) {
      param.pageNo = '6';
    }
    if(!param.title || validator.isEmpty(param.title)){
      param.title = ''
    }
    // 查询总数
    const totalPage = await sequelize.query(`select COUNT(*) as count FROM articles`);
    // 查询分页数据
    const pageData = await sequelize.query(
      `SELECT
      a.id AS id,
      a.title AS title,
      a.imgUrl AS imgUrl,
      r.readNum AS readNum,
      a.createdAt AS createdAt,
      r.likeNum AS likeNum,
      mdt.NAMES AS tagNames 
    FROM
      articles AS a
      JOIN readlikes AS r ON a.id = r.articleId 
      AND a.title LIKE '%${param.title}%'
      LEFT JOIN (
      SELECT
        GROUP_CONCAT( tc.NAME ) AS NAMES,
        tca.articleId AS articleId 
      FROM
        tagclouds AS tc
        LEFT JOIN tagcloudarticles AS tca ON tc.id = tca.tagCloudId 
      GROUP BY
        tca.articleId 
      ) AS mdt ON mdt.articleId = a.id 
    ORDER BY
      a.createdAt DESC 
      LIMIT ${(Number(param.pageNo) - 1) * Number(param.pageSize) }, ${Number(param.pageSize)} ;`
    )

    return {
      rows: pageData[0],
      count: (totalPage[0][0] as any).count
    }
  }

  // 后序在写
  async add(){

  }
}

export default new ArticleService();