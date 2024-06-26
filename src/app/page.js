"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.scss"; // Import local styles

export default function Home() {
  return (
    <div className={styles.homePage}>
      <div className={styles.container}>
        <h2 className={styles["text-box1"]}>Try</h2>

        <div className={styles["text-box2"]}>
          <h1>esik</h1>
          <h1>Bot</h1>
        </div>
        <h2 className={styles["text-box3"]}>now!</h2>
      </div>

      <Link className={styles["form-link"]} href="/checkAccount">
        <Image
          src="/login-rounded-right_blue.png"
          alt="enter button icon"
          width={320}
          height={320}
          sizes="100vw"
          style={{
            width: "100%",
            height: "auto"
          }} />
        Enter
      </Link>
    </div>
  );
}
