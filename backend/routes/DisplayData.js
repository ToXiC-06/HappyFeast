const express = require("express");
const router = express.Router();

router.post("/foodData", (req, res) => {
  try {
    res.send({
      foodItems: global.foodItems,
      foodCatagories: global.foodCatagories,
    });
  } catch (error) {
    console.error(error.message);
    res.send("Server Error!");
  }
});

module.exports = router;
