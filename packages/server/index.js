
const express = require("express");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const SourceMap = require("source-map");
const dayjs = require("dayjs");
const mysql = require("mysql");

const PORT = 3001;
// MySQL数据库连接
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "zoe123",
  database: "front-monitor",
});

const app = express();
//设置跨域访问  方案一，使用cors中间件
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//设置跨域访问 方案二，添加请求头
// app.all('*', function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
//   res.header("X-Powered-By",' 3.2.1')
//   res.header("Content-Type", "application/json;charset=utf-8");
//   next();
// });

// 将dist目录中的静态文件作为静态资源提供
app.use(express.static(path.join(__dirname, '../ui/dist')));

app.get("/", (req, res) => {
//   res.send("EPG Debug Server is running").status(200);
  res.sendFile(path.join('../ui/dist', 'index.html'));
});

app.post("/reportEpgLog", async (req, res) => {
  console.log("req.body", req.body);
  const reportData = req.body?.data;
  const reportType = req.body?.type;
  
  if (!reportData) {
    res
      .status(400)
      .send({
        message: "请求体中未包含data字段",
        status: 400,
      })
      .status(400);
  }
  const sql = `INSERT INTO epg_log (reportJson, type) VALUES (?, ?)`;
  connection.query(sql, [JSON.stringify(reportData), reportType], (err, results, fields) => {
    if (err) {
      res.send({
        data: "epg日志上报失败",
        status: 500,
        message: err,
      });
      return;
    } else {
      res
        .send({
          data: "epg日志上报成功",
          status: 200,
        })
        .status(200);
    }
  });
});

app.get("/getEpgLog", (req, res) => {
  connection.query("SELECT * FROM epg_log", (err, results, fields) => {
    if (err) throw err;
    res
      .send({
        data: results,
        status: 200,
        message: "ok",
      })
      .status(200);
  });
});
/**
 * 清空日志表
 */
app.post("/truncateTable", (req, res) => {
  const tableName = "epg_log"; // 表名
  const query = `TRUNCATE TABLE ${tableName}`;
  connection.query(query, (err, results) => {
    if (err) {
      res.send({ status: 500, err }).status(500);
      return;
    } else {
      res
        .send({ status: 200, message: "Table truncated successfully" })
        .status(200);
    }
  });
});

app.listen(PORT, () => {
  console.log(`服务启动成功，端口号为:${PORT}`);
});
