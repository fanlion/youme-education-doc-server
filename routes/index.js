/*
 * @Author: fan.li 
 * @Date: 2019-01-10 16:18:10 
 * @Last Modified by: fan.li
 * @Last Modified time: 2019-01-10 16:23:04
 */

const express = require('express');
const router = express.Router();

const { END_POINT, ACCESS_KEY_ID, ACCESS_KEY_SECRET, API_VERSION } = require('../config');

router.get('/test', function(req, res, next) {
  res.json({ END_POINT, ACCESS_KEY_ID, ACCESS_KEY_SECRET, API_VERSION });
});

module.exports = router;
