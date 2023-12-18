import { Link } from "react-router-dom";
import styles from "./Title.module.css";
import * as Icon from "react-bootstrap-icons";

function Title() {
  return (
    <header className={`text-center ${styles.title}`}>
      <Link to="/">
        <span className={styles.homeLogo}>
          <Icon.HouseHeartFill size="35" color="orange" />
        </span>
      </Link>
      <i className="cursor-pointer">Happy Feast.</i>
    </header>
  );
}

export default Title;
