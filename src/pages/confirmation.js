"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./confirmation.module.scss"; // Import the CSS module

export default function ConfirmationPage() {
  const router = useRouter();
  const confirmationMessage = router.query.message;
  const isUserExists = router.query.exists // This is the query parameter that we passed from checkAccount.js
  return (
    <div className={styles["confirmation-container"]}>
      <div className={styles["messageContainer"]}>
        <div className={styles.title}>Thank You!</div>
        {console.log(new Date().getHours())}
        {
          (new Date().getHours() <= 17.5) ? (
            <>
              <div className={styles["message"]}>
                <div className={styles.confirmationImage}>
                  <Image
                    src="/confirmIcon.jpg"
                    alt="confirmation icon"
                    width={500}
                    height={500}
                    sizes="100vw"
                    style={{
                      width: "100%",
                      height: "auto"
                    }} />
                </div>
                <div className={styles.confirmationText}>
                  {confirmationMessage}
                </div>
                <div className={styles.confirmationText}>Wish you best of luck!</div>
              </div>
            </>
          ) : (
            <>
              <div className={styles["message"]}>
                <div className={styles.confirmationImage}>
                  <Image
                    src="/registrationOverIcon.png"
                    alt="registration over icon"
                    width={500}
                    height={500}
                    sizes="100vw"
                    style={{
                      width: "100%",
                      height: "auto"
                    }} />
                </div>
                <div className={styles.confirmationText}>
                  Registration for the lucky draw is closed.
                </div>
                <div className={styles.confirmationText}>But, Do not be disappointed! esiKidz has a complimentary free 2 months trial subscription. </div>
                <div className={styles.confirmationText}>esiKidz representative will contact soon to set up a free trial subscription after the conference.</div>
              </div>
            </>
          )
        }
        <Link className={styles["form-link"]} href="/aiSimulator">
          <div className={styles["buttonIcon"]}>
            <Image
              src="/login-rounded-right_blue.png"
              alt="enter button icon"
              width={200}
              height={200}
              sizes="100vw"
              style={{
                width: "100%",
                height: "auto"
              }} />
          </div>
          Try esikBot Now!
        </Link>
      </div>

      <div className={styles["form-footer"]}>
        <span>Welcome to the 2024 SECA Conference!</span>
        <span>Experience esikBot like never before.</span>
        <a target="_blank" href="https://www.esiKidz.com/">
          <Image
            src="/esikidz-logo.png"
            alt="enter button icon"
            width={204}
            height={70}
            style={{
              maxWidth: "100%",
              height: "auto"
            }} />
        </a>
      </div>
    </div>
  );
}
