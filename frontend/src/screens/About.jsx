// import Header from "../components/Header";
import styles from "./About.module.css";
import Title from "../components/Title";
import Footer from "../components/Footer";

function About() {
  return (
    <div className={styles.about}>
      <Title />
      <section style={{ marginBottom: "113px" }}>
        Welcome to <span className={styles.logo}>Happy Feast. </span>, where
        culinary delights meet doorstep convenience! We are passionate about
        bringing the finest dining experiences to your fingertips, making every
        meal an unforgettable affair. Our mission is to redefine food delivery
        by seamlessly connecting you with a diverse array of local restaurants
        and culinary artisans. Whether you crave the comforting flavors of home
        or wish to embark on a gastronomic adventure,
        <span className={styles.logo}> Happy Feast. </span> is your trusted
        companion. We pride ourselves on a user-friendly interface,
        lightning-fast deliveries, and a curated selection of delectable dishes
        that cater to every palate. Join us on a journey of culinary
        exploration, where every order is not just a meal but a celebration of
        flavors. Experience the future of food delivery with
        <span className={styles.logo}> Happy Feast. </span> – your passport to a
        world of culinary delights, delivered straight to your door.
      </section>
      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
}

export default About;
