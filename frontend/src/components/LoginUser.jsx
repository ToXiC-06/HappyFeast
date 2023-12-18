import { useState } from "react";

import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import Button from "./Button";

function LoginUser() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function handleCheck() {
    setIsChecked((preValue) => !preValue);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await fetch("http://localhost:5000/api/loginuser/", {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: await JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const data = await res.json();
      console.log(data);
      if (!data.success) {
        alert(`${data.errors} \nPlease..., TRY AGAIN!`);
      } else {
        localStorage.setItem("authToken", data.authToken);
        localStorage.setItem("userEmail", email);
        console.log(localStorage.getItem("authToken"));
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  {
    return (
      <div
        className="w-50 container-fluid"
        style={{ marginTop: "60px", marginBottom: "185px" }}
      >
        <p className="fs-3 fw-bold text-center text-dak">Please Login here</p>
        <Form
          onSubmit={handleSubmit}
          className="border border-1 border-dark p-3 rounded bg-dark text-white"
        >
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
            />
            <Form.Text className="text-warning">
              We&apos;ll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type={`${isChecked ? "text" : "password"}`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </Form.Group>
          <Form.Group
            className="mb-3 text-warning"
            controlId="formBasicCheckbox"
          >
            <Form.Check
              type="checkbox"
              value={isChecked}
              onClick={handleCheck}
              label="Check me out"
            />
          </Form.Group>
          <Button css="w-50 btn btn-success" type="submit">
            {isLoading ? (
              <Spinner animation="grow" size="sm" variant="warning" />
            ) : (
              "Submit"
            )}
          </Button>
        </Form>
      </div>
    );
  }
}

export default LoginUser;
