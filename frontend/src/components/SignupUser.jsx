import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

import Button from "./Button";
import Spinner from "react-bootstrap/Spinner";

function SignupUser() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function handleCheck() {
    setIsChecked((preValue) => !preValue);
  }
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await fetch("http://localhost:5000/api/createuser/", {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: await JSON.stringify({
          name: name,
          email: email,
          password: password,
          location: location,
        }),
      });

      const data = await res.json();

      if (data.success) {
        navigate("/login");
      } else if (data.errors) {
        data.errors.map((item) => {
          alert(item.msg);
        });
      } else if (data.message) {
        alert(data.message);
      } else {
        alert("Invalid Data. or User Aleardy exist.");
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }
  {
    return (
      <div
        className="w-50 container-fluid"
        style={{ marginTop: "40px", marginBottom: "55px" }}
      >
        <p className="fs-3 fw-bold text-center text-dak">Please Sign up here</p>
        <Form
          onSubmit={handleSubmit}
          className="border border-1 border-dark p-3 rounded bg-dark text-white"
        >
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Full Name"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicLocation">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter Location"
            />
          </Form.Group>

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

export default SignupUser;
