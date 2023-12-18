import Button from "../components/Button";
import { useCart, useDispatchCart } from "../components/ContextReducer";
import styles from "./Cart.module.css";

function Cart() {
  const data = useCart();
  const dispatch = useDispatchCart();

  if (data.length === 0) {
    return (
      <div className={styles.cart}>
        <div className="text-danger p-5 w-100 text-center h1 fw-bold">
          The Cart Is Empty! 😥
        </div>
      </div>
    );
  }

  async function handleCheckOut() {
    let userEmail = localStorage.getItem("userEmail");
    let response = await fetch("http://localhost:5000/api/orderData", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        orderDate: new Date().toDateString(),
      }),
    });
    console.log(response.status);
    if (response.status === 200) {
      dispatch({ type: "DROP" });
      alert("Order Placed Succesfully!  ");
    }
  }

  const totalPrice = data.reduce((total, food) => total + food.price, 0);
  console.log(totalPrice);
  return (
    <div className={`${styles.cart}`}>
      <div className="container m-auto pt-5 table-responsive table-responsive-sm table-responsive-md">
        <table className="table table-dark table-hover">
          <thead className="bg-warning fs-4">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Image</th>
              <th scope="col">Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Option</th>
              <th scope="col">Amount</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody className="table-group-divider text-center">
            {data.map((food, index) => {
              return (
                <tr key={food.id}>
                  <th scope="row">{index + 1}</th>
                  <td>
                    <img src={food.img} alt="..." height={50} width={50} />
                  </td>
                  <td>{food.name}</td>
                  <td>{food.qty}</td>
                  <td>{food.size}</td>
                  <td>{food.price}</td>
                  <td>
                    <button
                      type="button"
                      className="bi bi-trash btn btn-danger"
                      onClick={() => dispatch({ type: "REMOVE", index: index })}
                    ></button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div>
          <h1 className="text-info mt-5 fw-bold fs-3">
            Total Price: ₹{totalPrice}/-
          </h1>
        </div>
        <div>
          <Button onClick={handleCheckOut} css="mb-4 btn btn-success mt-3">
            Check Out
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
