import styles from "./Footer.module.css";
import * as Icons from "react-bootstrap-icons";

function Footer() {
  return (
    <footer
      className={` ${styles.footer}
    `}
    >
      <div className={styles.data}>
        <h6>©Copyright 2023 - Happy Feast.Inc (IlluMinati_dev.io)</h6>
        Contact us at:
        <p>91+ 6372099466</p>
        <p>happyfeast_go@gmail.com</p>
      </div>
      <div className={styles.logo}>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.instagram.com/_._.animesh_pradhan_._/"
        >
          <Icons.Instagram size={20} color="#ffba0d" />
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://twitter.com/Ani_MesH_14"
        >
          <Icons.Twitter size={20} color="#ffba0d" />
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.facebook.com/profile.php?id=100016801113356"
        >
          <Icons.Facebook size={20} color="#ffba0d" />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
