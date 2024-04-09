"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import styles from "./aiSimulator.module.scss"; // Import the CSS module

export default function AiSimulatorPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [reportType, setReportType] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  async function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    try {
      // Simulating a fetch request
      setTimeout(() => {
        console.log("Report Type:", reportType);
        console.log("Title:", title);
        console.log("Content:", content);
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      console.error(error);
      // Handle error if necessary
    }
  }

  return (
    <div className={styles["aiSimulator-container"]}>
      <div className={styles["header"]}>
        <div className={styles.title}>esikBot Simulator</div>
        <div className={styles.subTitle}>
          <div className={styles["subTitle-icon"]}> &ldquo;</div>
          <div className={styles["subTitle-text"]}>
            Helps in creating professional content with rich vocabulary &
            grammar.
          </div>
        </div>
      </div>
      <form className={styles.form} onSubmit={onSubmit}>
        <select
          className={`${styles.select} ${
            isLoading ? styles["input-loading"] : ""
          }`}
          name="reportType"
          value={reportType}
          onChange={(e) => setReportType(e.target.value)}
        >
          <option value="">Write a report to parent(s)</option>
          <option value="summary">Send message to parent(s)</option>
        </select>
        <label htmlFor="content">Report Content</label>
        <textarea
          className={`${styles.textarea} ${
            isLoading ? styles["input-loading"] : ""
          }`}
          name="content"
          rows={6}
          placeholder={`Type some keywords that you want to write about.\n\nClick on "AI esikBot" and see the magic happen!`}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          className={`${styles.button} ${
            isLoading ? styles["button-loading"] : ""
          }`}
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "AI esikBot"}
        </button>
      </form>
      <div className={styles["form-footer"]}>
        <span>Welcome to the 2024 SECA Conference!</span>
        <span>Experience esikBot like never before.</span>
        <a target="_blank" href="https://www.esikidz.com/">
          <Image
            src="/esikidz-logo.svg"
            alt="enter button icon"
            width={150}
            height={70}
          />
        </a>
      </div>
    </div>
  );
}
