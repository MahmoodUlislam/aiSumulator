import Link from "next/link";
import styles from "./404.module.scss";

const Custom404 = () => {
  return (
    <div className={styles["page-container"]}>
      <h1>404 - Page Not Found</h1>
      <p>
        The page you are looking for might have been removed or is temporarily
        unavailable.
      </p>
      <p>
        <Link href="/">
          Go back to Home
        </Link>
      </p>
    </div>
  );
};

export default Custom404;
