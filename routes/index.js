const express = require("express");
const router = express.Router();



router.get("/", (req, res) => {
  return res.status(200).json({
    msg: "hello",
  });
});
// router.use("/scream", require("./scream"));
// router.use("/screams", require("./screams.js"));
router.use("/user", require("./user.js"));

module.exports = router;
