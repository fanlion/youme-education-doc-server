/*
 * @Author: fan.li
 * @Date: 2019-01-10 16:18:10
 * @Last Modified by: fan.li
 * @Last Modified time: 2019-01-10 22:08:28
 */

const express = require("express");
const router = express.Router();
const multer = require("multer");
const { isEmpty } = require("../utils");
const client = require("../utils/AliClient");
const {
  IMM_PROJECT_NAME,
  IMM_TARGET_URI,
  OSS_BUCKET_NAME
} = require("../config");

const storage = multer.memoryStorage();
const uploader = multer({ storage: storage });

router.post("/list_projects", async function(req, res, next) {
  try {
    const { maxKeys, marker } = req.body;
    if (isEmpty(maxKeys) || isEmpty(marker)) {
      return res.status(400).json({
        code: 1,
        msg: "params error",
        des: "maxKeys, marker be empty!"
      });
    }

    const params = {
      MaxKeys: maxKeys,
      Marker: marker
    };

    const result = await client.imm.request("ListProjects", params);
    res.status(200).json({
      code: 0,
      msg: "ok",
      des: "ok",
      result: result
    });
  } catch (err) {
    res.status(500).json({
      code: 2,
      msg: "unknow error",
      des: "unknow error"
    });
  }
});

router.post("/convert_office_format", async function(req, res, next) {
  try {
    const {} = req.body;
  } catch (err) {
    res.status(500).json({
      code: 2,
      msg: "unknow error",
      des: "unknow error"
    });
  }
});

router.post("/upload", uploader.single("file"), async function(req, res) {
  try {
    const { buffer, originalname, mimetype } = req.file;
    const fileName = Date.now() + "_" + originalname;
    const result = await client.oss.put(originalname, buffer);
    res.json({
      code: 0,
      msg: "ok",
      des: "ok",
      result: result
    });
  } catch (err) {
    res.status(500).json({
      code: 2,
      msg: "unknow error",
      des: "unknow error"
    });
  }
});

router.post("/upload_and_parse", uploader.single("file"), async function(req, res) {
  try {
    const { buffer, originalname, mimetype } = req.file;
    const fileName = Date.now() + "_" + originalname;
    const ossResult = await client.oss.put(fileName, buffer);

    const params = {
      Project: IMM_PROJECT_NAME,
      SrcUri: 'oss://ym-edu-demo/' + fileName,
      TgtType: "jpg",
      TgtUri: IMM_TARGET_URI
    };

    const immResult = await client.imm.request("ConvertOfficeFormat", params);
    res.json({
      code: 0,
      msg: "ok",
      des: "ok",
      result: immResult
    });
  } catch (err) {
    res.status(500).json({
      code: 2,
      msg: "unknow error",
      des: "unknow error",
      result: err
    });
  }
});

module.exports = router;
