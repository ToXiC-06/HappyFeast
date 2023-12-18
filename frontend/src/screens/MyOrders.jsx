import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { v4 as uuidv4 } from "uuid";
function MyOrder() {
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchMyOrder() {
      try {
        setLoading(true);
        const fetchedData = await fetch(
          "https://happy-feast.onrender.com/api/myOrderData",
          {
            method: "POST",
            headers: {
              Accept: "application/json, text/plain, */*",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: localStorage.getItem("userEmail"),
            }),
          }
        );
        const res = await fetchedData.json();
        await setOrderData(res.orderData);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchMyOrder();
  }, []);
  console.log(localStorage.getItem("userEmail"));
  console.log(orderData);
  const styles = {
    position: "fixed",
    bottom: "0",
    width: "100%",
  };
  return (
    <div>
      <Header />
      <section>
        <div className="container row">
          <div>
            {orderData ? (
              orderData.map((item) => {
                return item.map((arrayData) => {
                  return (
                    <div key={uuidv4()}>
                      {arrayData.OrderDate ? (
                        <div className="m-auto mt-5">
                          {arrayData.OrderDate}
                          <hr />
                        </div>
                      ) : (
                        <div className="col-6">
                          <div
                            className="card mt-3"
                            style={{
                              width: "16rem",
                              maxHeight: "360px",
                            }}
                          >
                            <img
                              src={arrayData.img}
                              className="card-img-top"
                              alt="..."
                              style={{
                                height: "120px",
                                objectFit: "fill",
                              }}
                            />
                            <div className="card-body">
                              <h5 className="card-title">{arrayData.name}</h5>
                              <div
                                className="container w-100 p-0"
                                style={{ height: "38px" }}
                              >
                                <span className="m-1">{arrayData.qty}</span>
                                <span className="m-1">{arrayData.size}</span>
                                <span className="m-1">
                                  {arrayData.OrderDate}
                                </span>
                                <div className=" d-inline ms-2 h-100 w-20 fs-5">
                                  ₹{arrayData.price}/-
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                });
              })
            ) : (
              <div className="text-danger fw-bold fs-2">
                You Haven&apos;t Ordered Anything.😔
              </div>
            )}
          </div>
        </div>
      </section>
      {orderData ? (
        <Footer />
      ) : (
        <div style={styles}>
          <Footer />
        </div>
      )}
    </div>
  );
}

export default MyOrder;
