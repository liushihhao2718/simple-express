const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  res.send("rodo");
  // throw new Error("test");
});

router.get("/:id", async (req, res) => {
  const user_id = res.params.id;
});

module.exports = router;
