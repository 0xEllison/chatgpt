var express = require("express");
var router = express.Router();

const apiKey = "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";

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "ChatGPT" });
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
  const result = await chatGPTApi.sendMessage(req.body.msg, {
    // print the partial response as the AI is "typing"
    onProgress: (partialResponse) => {
      res.write(partialResponse.text+"<*>");
    },
  });
  res.end();
});
module.exports = router;
