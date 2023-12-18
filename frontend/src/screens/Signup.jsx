import Header from "../components/Header";
import Footer from "../components/Footer";
import SignupUser from "../components/SignupUser";

function Signup() {
  const styles = {
    position: "fixed",
    bottom: "0",
    width: "100%",
  };
  return (
    <div>
      <Header />
      <SignupUser />

      <div style={styles}>
        <Footer />
      </div>
    </div>
  );
}

export default Signup;
