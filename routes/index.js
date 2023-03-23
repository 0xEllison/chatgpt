var express = require("express");
var compression = require('compression')
var router = express.Router();

const apiKey = "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";

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "ChatGPT" });
});

/* GET home page. */
router.get("/chat", function (req, res, next) {
  res.render("chat", { title: "ChatGPT" });
});

/* GET home page. */
router.post("/sendMsg", async function (req, res, next) {
  const { ChatGPTAPI } = await import("chatgpt");

  const chatGPTApi = new ChatGPTAPI({
    apiKey,
  });
  // const result = await chatGPTApi.sendMessage(req.body.msg);
  // res.send(result.text);
  let dataList = [];
  res.setHeader("Content-type", "application/octet-stream");
  let dataIndex = 0;
  const result = await chatGPTApi.sendMessage(req.body.msg, {
    // print the partial response as the AI is "typing"
    onProgress: (partialResponse) => {
      let currenData = partialResponse.text.substring(dataIndex,partialResponse.text.length-1);
      dataIndex = partialResponse.text.length-1;
      res.write(currenData);
      res.flush();
    },
  });
  res.end();
});
module.exports = router;
