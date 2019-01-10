/*
 * @Author: fan.li 
 * @Date: 2019-01-10 15:54:52 
 * @Last Modified by: fan.li
 * @Last Modified time: 2019-01-10 16:26:34
 * 
 * 相关配置项
 */

require('dotenv').config();

module.exports = {
  END_POINT: 'imm.cn-hangzhou.aliyuncs.com',
  ACCESS_KEY_ID: process.env.ACCESS_KEY_ID,
  ACCESS_KEY_SECRET: process.env.ACCESS_KEY_SECRET,
  API_VERSION: '2017-09-06',
};