/*
 * @Author: fan.li 
 * @Date: 2019-01-10 15:54:52 
 * @Last Modified by: fan.li
 * @Last Modified time: 2019-01-11 16:40:23
 * 
 * 相关配置项
 */

require('dotenv').config();

module.exports = {
  ACCESS_KEY_ID: process.env.ACCESS_KEY_ID,
  ACCESS_KEY_SECRET: process.env.ACCESS_KEY_SECRET,
  IMM_END_POINT: 'https://imm.cn-beijing.aliyuncs.com/', // 文档转图片
  IMM_API_VERSION: '2017-09-06',
  IMM_PROJECT_NAME: 'ym-edu-demo',
  IMM_TARGET_URI_BASE: 'oss://ym-edu-demo/docs/',
  OSS_SRC_URI_BASE: 'oss://ym-edu-demo/',
  OSS_END_POINT: 'https://oss-cn-beijing.aliyuncs.com/', // 云存储
  OSS_BUCKET_NAME: "ym-edu-demo",
  OSS_REGION: "oss-cn-beijing",
};