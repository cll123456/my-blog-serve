import validator from "validator";
import { ArticleModel } from "../../model/article";
import { IArticleListParam, IHotArticleListParam } from "../../types/article";
import sequelize from "../../utils/db";

class ArticleService {
  /**
   * 分页查询文章
   * @param param {IArticleListParam}
   * @returns 
   */
  async list(param: IArticleListParam) {
    let tagCloudsQL = ``;
    // 判断数据是否为空
    if (!param.pageNo || validator.isEmpty(param.pageNo) || isNaN(Number(param.pageNo))) {
      param.pageNo = '1';
    }
    if (!param.pageSize || validator.isEmpty(param.pageSize) || isNaN(Number(param.pageSize))) {
      param.pageSize = '12';
    }
    if (!param.title || validator.isEmpty(param.title)) {
      param.title = ''
    }
    if (param.tagCloudId && !validator.isEmpty(param.tagCloudId) && !isNaN(Number(param.tagCloudId))) {
      tagCloudsQL = `AND tca.tagCloudId = ${param.tagCloudId}`
    }
    // 查询总数
    const totalPage = await sequelize.query(`select COUNT(*) as count FROM articles as a where a.title like '%${param.title}%'`);
    // 查询分页数据
    const pageData = await sequelize.query(
      `
      SELECT
        a.id AS id,
        a.title AS title,
        a.imgUrl AS imgUrl,
        r.readNum AS readNum,
        a.createdAt AS createdAt,
        r.likeNum AS likeNum,
        mdt.NAMES AS tagNames,
        ( CASE WHEN c.comentNum IS NULL THEN 0 ELSE c.comentNum END ) comentNum 
      FROM
        articles AS a
        JOIN readlikes AS r ON a.id = r.articleId 
        AND a.title LIKE '%${param.title}%'
        JOIN (
        SELECT
          GROUP_CONCAT( tc.NAME ) AS NAMES,
          tca.articleId AS articleId 
        FROM
          tagclouds AS tc
          JOIN tagcloudarticles AS tca ON tc.id = tca.tagCloudId ${tagCloudsQL}
        GROUP BY
          tca.articleId 
        ) AS mdt ON mdt.articleId = a.id
        LEFT JOIN ( SELECT count( id ) AS comentNum, articleId AS carticleId FROM comments GROUP BY articleId ) AS c ON a.id = c.carticleId 
      ORDER BY
        a.createdAt DESC 
        LIMIT ${(Number(param.pageNo) - 1) * Number(param.pageSize)}, ${Number(param.pageSize)} ;`
    )

    return {
      rows: pageData[0],
      count: (totalPage[0][0] as any).count
    }
  }

  // 后序在写
  async add() {

  }

  /**
   * 获取热门文章
   * @param param 
   * @returns 
   */
  async getHotArticleList(param: IHotArticleListParam) {
    // 判断数据是否为空
    if (!param.pageNo || validator.isEmpty(param.pageNo)) {
      param.pageNo = '1';
    }
    if (!param.pageSize || validator.isEmpty(param.pageSize)) {
      param.pageSize = '5';
    }
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
      LIMIT ${(Number(param.pageNo) - 1) * Number(param.pageSize)}, ${Number(param.pageSize)} ;`
    )
    return {
      rows: pageData[0],
    }
  }

  /**
   * 获取文章详情
   * @param id {string}
   */
  async findArticleDetailById(id: string) {
    if (validator.isEmpty(id) || Number(id) === NaN) {
      throw Error('article id is not empty and must be a string number');
    }
    // 获取文章的点赞，文章阅读，标签等
    const articleDetail = await sequelize.query(`
    SELECT
    a.title as title,
    a.createdAt as createdAt,
    a.content AS content,
    mid.tags AS tags,
    r.readNum AS readNum,
    r.likeNum AS likeNum
  FROM
    articles AS a
    JOIN (
    SELECT
      GROUP_CONCAT( tc.NAME, '' ) AS tags,
      tca.articleId AS articleId 
    FROM
      tagclouds AS tc
       JOIN tagcloudarticles AS tca ON tc.id = tca.tagCloudId 
      AND tca.articleId = ${id} 
    ) AS mid ON mid.articleId = a.id
     JOIN readlikes AS r ON r.articleId = a.id
    `);
    // 获取文章的评论和用户
    const comments = await sequelize.query(`
      SELECT
      c.content AS content,
      c.pid AS pid,
      c.id AS id,
      u.nickName AS nickName,
      u.accounter AS accounter,
      u.email AS email,
      u.avatar AS avatar,
      u.createdAt as  createdAt
    FROM
      comments AS c,
      users AS u 
    WHERE
      c.userId = u.id 
      AND c.articleId = ${id} 
      AND ISNULL( c.deletedAt ) 
    ORDER BY
      c.createdAt DESC
    `)

    return {
      details: articleDetail[0][0],
      comments: comments[0]
    }

  }
}

export default new ArticleService();