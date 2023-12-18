import Button from "./Button";
import styles from "./Header.module.css";
import { Link, NavLink, useNavigate } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import Badge from "react-bootstrap/Badge";
import { useState } from "react";
// import Modal from "../Modal";
// import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import Cart from "../screens/Cart";
import { useCart, useDispatchCart } from "./ContextReducer";

function Header() {
  const [cartView, setCartView] = useState(false);
  const data = useCart();

  const navigate = useNavigate();
  function handleLogOut() {
    localStorage.removeItem("authToken");
    navigate("/login");
  }
  function handlemodal() {
    setCartView((p) => !p);
  }

  return (
    <>
      {["md"].map((expand) => (
        <Navbar
          key={expand}
          expand="md"
          className={`${styles.header} sticky-top`}
        >
          <Container fluid>
            <Navbar.Brand href="#">
              <Link to="/">
                <div className="ps-5 d-flex align-items-center justify-content-center">
                  <img
                    src="../../public/images/logo.png"
                    height={50}
                    width={50}
                  />
                  <h1 className="m-0 p-0">Happy Feast.</h1>
                </div>
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle
              className="bg-warning"
              aria-controls={`offcanvasNavbar-expand-md`}
            />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-md`}
              aria-labelledby={`offcanvasNavbarLabel-expand-md`}
              placement="end"
              className="bg-dark p-2"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title
                  className="text-info text-center w-100 fw-bold fs-2"
                  id={`offcanvasNavbarLabel-expand-md`}
                >
                  Menu
                  <hr />
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav
                  className={`justify-content-center align-items-center flex-grow-1 pe-3 ${styles.nav}`}
                >
                  <Link to="/" className={styles.home}>
                    Home
                  </Link>

                  <Link to="/about">About</Link>

                  {localStorage.getItem("authToken") && (
                    <Link to="/myOrders">My Orders</Link>
                  )}
                </Nav>
                <div className=" d-flex justify-content-center">
                  {localStorage.getItem("authToken") ? (
                    <>
                      <Button
                        onClick={() => setCartView((p) => !p)}
                        css="btn btn-outline-warning bi bi-cart4"
                      >
                        Cart
                        {data.length !== 0 && (
                          <Badge style={{ left: "5px" }} pill bg="danger">
                            {data.length}
                          </Badge>
                        )}
                      </Button>

                      <Modal
                        {...handlemodal}
                        show={cartView}
                        size="xl"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                      >
                        <Modal.Header className="bg-secondary text-white">
                          <Modal.Title id="contained-modal-title-vcenter">
                            Your Cart
                          </Modal.Title>
                          <Button
                            css="btn btn-close text-white"
                            onClick={handlemodal}
                          ></Button>
                        </Modal.Header>
                        <Modal.Body className="bg-dark">
                          <Cart />
                        </Modal.Body>
                        <Modal.Footer className="bg-dark text-white">
                          <Button onClick={handlemodal}>Close</Button>
                        </Modal.Footer>
                      </Modal>

                      <Link to="/">
                        <Button
                          onClick={handleLogOut}
                          css="ms-2 btn btn-danger"
                        >
                          Log Out
                        </Button>
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link to="/signup">
                        <Button>Sign Up</Button>
                      </Link>
                      <Link to="/login">
                        <Button css="me-3 ms-3 btn btn-outline-warning">
                          Log In
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default Header;

// function MyVerticallyCenteredModal(props) {
//   return (

//   );
// }

// function App() {
//   const [modalShow, setModalShow] = React.useState(false);

//   return (
//     <>
//       <Button variant="primary" onClick={() => setModalShow(true)}>
//         Launch vertically centered modal
//       </Button>

//       <MyVerticallyCenteredModal
//         show={modalShow}
//         onHide={() => setModalShow(false)}
//       />
//     </>
//   );
// }

// render(<App />);
