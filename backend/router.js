const { Router } = require("express");
const run = require("./geminiapi");
const router = Router();
router.post("/prompt-post", async (req, res) => {
  try {
    const { prompt } = req.body;
    const response = await run(prompt);
    return res.json(response);
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;