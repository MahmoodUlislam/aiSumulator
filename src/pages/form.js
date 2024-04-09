"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import styles from "./form.module.scss"; // Import the CSS module

export default function FormPage() {
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
    <div className={styles["form-container"]}>
      <div className={styles.title}>Draw Registration</div>
      <form className={styles.form} onSubmit={onSubmit}>
        <input
          className={`${styles.input} ${
            isLoading ? styles["input-loading"] : ""
          }`}
          type="text"
          name="organizationName"
          placeholder="Organization name"
        />
        <input
          className={`${styles.input} ${
            isLoading ? styles["input-loading"] : ""
          }`}
          type="text"
          name="yourName"
          placeholder="Your name"
        />
        <input
          className={`${styles.input} ${
            isLoading ? styles["input-loading"] : ""
          }`}
          type="text"
          name="contactPhoneNumber"
          placeholder="Contact phone number"
        />
        <input
          className={`${styles.input} ${
            isLoading ? styles["input-loading"] : ""
          }`}
          type="email"
          name="email"
          placeholder="E-mail"
        />
        <select
          className={`${styles.select} ${
            isLoading ? styles["input-loading"] : ""
          }`}
          name="role"
          defaultValue=""
        >
          <option value="">What is your role?</option>
          <option value="administrator">Daycare Owner</option>
          <option value="director">Daycare Director</option>
          <option value="director">Daycare Executive Director</option>
          <option value="teacher">Daycare Manager / Supervisor</option>
          <option value="assistant">Daycare Teacher</option>
        </select>
        <button
          className={`${styles.button} ${
            isLoading ? styles["button-loading"] : ""
          }`}
          type="submit"
          disabled={isLoading}
        >
          <Link className={styles["form-link"]} href="/confirmation">
            <div className={styles["buttonIcon"]}>
              <Image
                src="/login-rounded-right_blue.png"
                alt="enter button icon"
                width={500}
                height={500}
                layout="responsive"
              />
            </div>
            {isLoading ? "Loading..." : "Next"}
          </Link>
        </button>
      </form>
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
