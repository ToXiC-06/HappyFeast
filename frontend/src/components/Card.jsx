import React, { useEffect, useRef, useState } from "react";
import Button from "./Button";
import styles from "./Card.module.css";
import { useDispatchCart, useCart } from "./ContextReducer";
import { useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

function Card({ filteredItems }) {
  const navigate = useNavigate();
  const dispatch = useDispatchCart();
  const data = useCart();
  const priceRef = useRef();
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleToCart = async () => {
    try {
      setIsLoading(true);
      if (!localStorage.getItem("authToken")) {
        alert("Sign In / Sign Up First! \nAnd Try Again!");
        return navigate("/login");
      }

      var food = [];
      for (var item of data) {
        if (item.id === filteredItems._id) {
          food = item;
          break;
        }
      }

      if (Object.keys(food).length > 0) {
        console.log(food.qty, qty);
        if (food.size === size) {
          await dispatch({
            type: "UPDATE",
            id: filteredItems._id,
            price: finalPrice,
            qty: qty,
          });

          return;
        } else if (food.size !== size) {
          await dispatch({
            type: "ADD",
            id: filteredItems._id,
            name: filteredItems.name,
            img: filteredItems.img,
            price: finalPrice,
            qty: qty,
            size: size,
          });

          return;
        }

        return;
      }
      await dispatch({
        type: "ADD",
        id: filteredItems._id,
        name: filteredItems.name,
        img: filteredItems.img,
        price: finalPrice,
        qty: qty,
        size: size,
      });
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const priceOptions = Object.keys(filteredItems.options[0]);
  const finalPrice = qty * parseInt(filteredItems.options[0][size]);

  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);
  return (
    <div
      className={`${styles.card} p-0 card m-auto my-4 bg-black text-white`}
      style={{ width: "16rem" }}
      data-aos="zoom-in"
    >
      <img
        src={filteredItems.img}
        className="card-img-top"
        alt="food dishes"
        height={150}
      />
      <div className="card-body py-3 px-2">
        <h5 className="card-title text-danger text-center fw-bold">
          {filteredItems.name}
        </h5>
        <hr className="mb-2 mt-3" />
        <p className={`card-text text-secondary ${styles.cardContent}`}>
          <small>{filteredItems.description}</small>
        </p>

        <div className="d-flex justify-content-around">
          <div>
            <select
              className="bg-white text-black rounded"
              onChange={(e) => setQty(e.target.value)}
            >
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                );
              })}
            </select>
            <select
              className="ms-1 bg-white text-black rounded"
              ref={priceRef}
              onChange={(e) => setSize(e.target.value)}
            >
              {priceOptions.map((el) => {
                return (
                  <option key={el} value={el}>
                    {el}
                  </option>
                );
              })}
            </select>
          </div>
          <div className=" text-warning">|| ₹{finalPrice}/- </div>
        </div>
        <hr className="mb-2 mt-3" />
        <Button
          onClick={handleToCart}
          css="text-black bi bi-cart w-100 me-1 btn btn-light d-block"
        >
          {isLoading ? (
            <Spinner variant="dark" animation="border" size="md" />
          ) : (
            "Add to Cart"
          )}
        </Button>
      </div>
    </div>
  );
}

export default Card;
