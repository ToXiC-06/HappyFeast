const express = require("express");
const router = express.Router();

const Order = require("../models/Orders");

router.post("/orderData", async (req, res) => {
  let data = req.body.order_data;
  await data.splice(0, 0, { OrderDate: req.body.orderDate });

  let eId = await Order.findOne({ email: req.body.email });
  console.log(eId);

  if (eId === null) {
    try {
      console.log(data);
      await Order.create({
        email: req.body.email,
        order_data: [data],
      }).then(() => {
        res.json({ success: true });
      });
    } catch (error) {
      console.log(error.message);
      res.send("Server Error", error.message);
    }
  } else {
    try {
      await Order.findOneAndUpdate(
        { email: req.body.email },
        { $push: { order_data: data } }
      ).then(() => {
        res.json({ success: true });
      });
    } catch (error) {
      console.log(error.message);
      res.send("Server Error", error.message);
    }
  }
});

router.post("/myOrderData", async (req, res) => {
  try {
    let myData = await Order.findOne({ email: req.body.email });
    if (myData === null) {
      return res.json({ orderData: null });
    }
    let myOrderData = myData.order_data.slice(0).reverse();
    console.log(myOrderData);

    res.json({ orderData: myOrderData });
  } catch (error) {
    console.log(error.message);
    res.send("Server Error", error.message);
  }
});

module.exports = router;
