/*
 * @Author: fan.li
 * @Date: 2019-01-10 16:18:10
 * @Last Modified by: fan.li
 * @Last Modified time: 2019-01-11 16:49:21
 */

const express = require("express");
const router = express.Router();
const multer = require("multer");
const { isEmpty } = require("../utils");
const client = require("../utils/AliClient");
const {
  IMM_PROJECT_NAME,
  IMM_TARGET_URI_BASE,
  OSS_BUCKET_NAME,
  OSS_SRC_URI_BASE,
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

router.post("/upload_and_create_convert_task/:classname", uploader.single("file"), async function(req, res) {
    try {
      const { buffer, originalname, mimetype } = req.file;
      const { classname } = req.params;

      const sessionName = classname + "_" + Date.now();
      const fileName = classname + "_" + Date.now() + "_" + originalname;

      const ossResult = await client.oss.put(fileName, buffer);

      const immCreateParams = {
        Project: IMM_PROJECT_NAME,
        SrcUri: OSS_SRC_URI_BASE + fileName,
        TgtType: "jpg",
        TgtUri: IMM_TARGET_URI_BASE + sessionName,
      };

      const immCreateResult = await client.imm.request("createOfficeConversionTask", immCreateParams);

      const immQueryParams = {
        Project: IMM_PROJECT_NAME,
        TaskId: immCreateResult.TaskId
      };
      console.log(client.oss.get(fileName));

      const task = setInterval(async () => {
        const immQueryResult = await client.imm.request("GetOfficeConversionTask", immQueryParams);
        if (immQueryResult.Status !== "Running") {
          clearInterval(task);
          const code = immQueryResult.Status === "Finished" ? 0 : -1;
          res.status(200).json({
            code: code,
            meg: "ok",
            des: "ok",
            result: immQueryResult
          });
        }
      }, 2000);

    } catch (err) {
      console.log(err);
      res.status(500).json({
        code: 2,
        msg: "unknow error",
        des: "unknow error",
        result: err
      });
    }
  }
);

module.exports = router;
