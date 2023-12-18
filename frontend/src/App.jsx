import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./screens/Home";
import Login from "./screens/Login";
import About from "./screens/About";
import Signup from "./screens/Signup";
import { CardProvider } from "./components/ContextReducer";
import MyOrders from "./screens/MyOrders";
// import Cart from "./screens/Cart";

function App() {
  return (
    <CardProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/myOrders" element={<MyOrders />} />

          {/* <Route path="/cart" element={<Cart />} /> */}
        </Routes>
      </BrowserRouter>
    </CardProvider>
  );
}

export default App;
