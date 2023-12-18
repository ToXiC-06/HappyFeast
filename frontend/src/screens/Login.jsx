import Header from "../components/Header";
import Footer from "../components/Footer";
import LoginUser from "../components/LoginUser";

function Login() {
  const styles = {
    position: "fixed",
    bottom: "0",
    width: "100%",
  };
  return (
    <div>
      <Header />
      <LoginUser />
      <div style={styles}>
        <Footer />
      </div>
    </div>
  );
}

export default Login;
