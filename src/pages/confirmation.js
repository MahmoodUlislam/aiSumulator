"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import styles from "./confirmation.module.scss"; // Import the CSS module

export default function ConfirmationPage() {
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(event.currentTarget);
      const response = await fetch("/api/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      // Handle response if necessary
    } catch (error) {
      // Handle error if necessary
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={styles["confirmation-container"]}>
      <div className={styles["messageContainer"]}>
        <div className={styles.title}>Thank You!</div>
        <div className={styles["message"]}>
          <div className={styles.confirmationImage}>
            <Image
              src="/confirmIcon.jpg"
              alt="confirmation icon"
              width={500}
              height={500}
              layout="responsive"
            />
          </div>
          <div className={styles.confirmationText}>
            Your registration for the lucky draw is received.
          </div>
          <div className={styles.confirmationText}>Wish you best of luck!</div>
        </div>
        <Link className={styles["form-link"]} href="/aiSimulator">
          <div className={styles["buttonIcon"]}>
            <Image
              src="/login-rounded-right_blue.png"
              alt="enter button icon"
              width={500}
              height={500}
              layout="responsive"
            />
          </div>
          Try esikBot Now!
        </Link>
      </div>

      <div className={styles["form-footer"]}>
        <span>Welcome to the 2024 SECA Conference!</span>
        <span>Experience esikBot like never before.</span>
        <Link href="/login">
          <Image
            src="/esikidz-logo.svg"
            alt="enter button icon"
            width={150}
            height={70}
          />
        </Link>
      </div>
    </div>
  );
}
