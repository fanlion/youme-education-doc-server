/*
 * @Author: fan.li
 * @Date: 2019-01-10 17:12:57
 * @Last Modified by: fan.li
 * @Last Modified time: 2019-01-11 15:54:22
 *
 * 阿里云OSS请求工具
 */

const { RPCClient } = require("@alicloud/pop-core");
const OSSClient = require("ali-oss");
const MNSClient = require("ali-mns");

const {
  ACCESS_KEY_ID,
  ACCESS_KEY_SECRET,
  IMM_END_POINT,
  IMM_API_VERSION,
  OSS_REGION,
  OSS_BUCKET_NAME,
  OSS_END_POINT,
} = require("../config");

function AliClient() {
  if (AliClient._instance) {
    return AliClient._instance;
  }

  this.imm = new RPCClient({
    accessKeyId: ACCESS_KEY_ID,
    accessKeySecret: ACCESS_KEY_SECRET,
    endpoint: IMM_END_POINT,
    apiVersion: IMM_API_VERSION
  });

  this.oss = new OSSClient({
    accessKeyId: ACCESS_KEY_ID,
    accessKeySecret: ACCESS_KEY_SECRET,
    bucket: OSS_BUCKET_NAME,
    region: OSS_REGION
  });

  return AliClient._instance || (AliClient._instance = this);
}

AliClient._instance = null;

Object.defineProperty(AliClient, "instance", {
  enumerable: false,
  configurable: false,
  get: function() {
    return AliClient._instance || (AliClient._instance = new AliClient());
  }
});

module.exports = AliClient.instance;
