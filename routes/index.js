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
router.post("/", async function (req, res, next) {
  const { ChatGPTAPI } = await import("chatgpt");

  try {
    
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
  } catch (error) {
    
    res.write("erro try again");
    res.flush();
  }
  res.end();
});
module.exports = router;
