const mongoose = require("mongoose");
require("dotenv").config();

const mongoURI = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PW}@cluster0.mhaamym.mongodb.net/HappyFeastMernProject`;

const connectToDatabase = async () => {
  //DATABASE Integration
  await mongoose.connect(mongoURI).then(async (res) => {
    console.log("connected");
    const fetchedData = await mongoose.connection.db.collection("food_items");
    await fetchedData
      .find({})
      .toArray()
      .then(async (res) => {
        const foodCatagories = await mongoose.connection.db.collection(
          "food_catagories"
        );
        await foodCatagories
          .find({})
          .toArray()
          .then((catRes) => {
            global.foodCatagories = catRes;
            global.foodItems = res;
          })
          .catch((e) => console.log(e));
      })
      .catch((e) => console.log(e));
  });
};

module.exports = connectToDatabase;
