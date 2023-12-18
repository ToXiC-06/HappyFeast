import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Section from "../components/Section";

export default function Home() {
  const [foodItems, setFoodItems] = useState([]);
  const [foodCatagories, setFoodCatagories] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function () {
    async function loadData() {
      try {
        const res = await fetch(
          "https://happy-feast.onrender.com/api/foodData",
          {
            method: "POST",
            headers: {
              Accept: "application/json, text/plain, */*",
              "Content-Type": "application/json",
            },
          }
        );
        const data = await res.json();

        setFoodItems(data.foodItems);
        setFoodCatagories(data.foodCatagories);
      } catch (error) {
        console.log(error);
      }
    }
    loadData();
  }, []);

  return (
    <div>
      <Header />
      <Section
        search={search}
        setSearch={setSearch}
        foodItems={foodItems}
        foodCatagories={foodCatagories}
      />
      <Footer />
    </div>
  );
}
