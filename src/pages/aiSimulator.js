import Image from "next/image";
import { useState } from "react";
import hash from "../utils/textHash";
import styles from "./aiSimulator.module.scss"; // Import the CSS module

export default function AiSimulatorPage() {
  const [reportType, setReportType] = useState("");
  const [content, setContent] = useState("");
  const [reportTypeValid, setReportTypeValid] = useState(true);
  const [contentValid, setContentValid] = useState(true);
  const [reportTypeError, setReportTypeError] = useState("");
  const [contentError, setContentError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [handleStatus, setHandleStatus] = useState({
    background: "",
    color: "",
    text: "",
  });

  async function onSubmit(event) {
    event.preventDefault();

    // Check if reportType or content is empty
    if (!reportType.trim() || !content.trim()) {
      setReportTypeValid(!!reportType.trim());
      setContentValid(!!content.trim());
      setReportTypeError(
        !reportType.trim() ? "Please select a report type." : ""
      );
      setContentError(!content.trim() ? "Please enter report content." : "");
      return;
    }

    // Reset errors
    setReportTypeError("");
    setContentError("");

    // Proceed with submission to the AI API
    setIsLoading(true);
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_AI_POLISHER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          magic: hash(content),
          type: reportType,
          keywords: content
        })
      });
      const responseData = await res.json();

      switch (res.status) {
        case 200:
          setContent(responseData.content); // Update the content state with the organized content by the AI
          setHandleStatus({
            background: "#00b300",
            color: "#fff",
            text: "Report generated successfully!",
          });
          break;
        case 204:
          setHandleStatus({
            background: "#ff0000",
            color: "#fff",
            text: "No content found. Please try again.",
          });
          break;
        case 208:
          setHandleStatus({
            background: "#ff0000",
            color: "#fff",
            text: "Invalid report type. Please try again.",
          });
          break;
        case 403:
          setHandleStatus({
            background: "#ff0000",
            color: "#fff",
            text: "Forbidden. Please try again later.",
          });
          break;
        default:
          setHandleStatus({
            background: "#ff0000",
            color: "#fff",
            text: "An error occurred. Please try again later.",
          });
          break;
      }
    } catch (e) {
      if (e.toString().includes("timeout")) {
        alert("timeout-error");
      } else {
        alert("network-error");
      }
    } finally {
      setIsLoading(false);
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
          className={`${styles.select} ${isLoading ? styles["input-loading"] : ""
            }`}
          name="reportType"
          value={reportType}
          onChange={(e) => {
            setReportType(e.target.value);
            setHandleStatus({
              background: "",
              color: "",
              text: "",
            });
            setReportTypeValid(!!e.target.value.trim());
            setReportTypeError(
              !e.target.value.trim() ? "Please select a report type." : ""
            );
          }}
        >
          <option value="">Please select report type</option>
          <option value="classroom-notes">Classroom Notes</option>
          <option value="teacher-notice">Teacher Notice</option>
          <option value="child-report">Child Report</option>
        </select>
        {reportTypeError && (
          <div className={styles["error-message"]}>{reportTypeError}</div>
        )}
        <label htmlFor="content">Report Content</label>
        <textarea
          className={`${styles.textarea} ${isLoading ? styles["input-loading"] : ""
            }`}
          name="content"
          rows={6}
          placeholder={`Type some keywords that you want to write about.\n\nClick on "AI esikBot" and see the magic happen!`}
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
            setHandleStatus({
              background: "",
              color: "",
              text: "",
            });
            setContentValid(!!e.target.value.trim());
            setContentError(
              !e.target.value.trim() ? "Please enter report content." : ""
            );
          }}
        />
        {contentError && (
          <div className={styles["error-message"]}>{contentError}</div>
        )}
        <div className={styles.cta}>
          <div
            className={styles["handle-status"]}
            style={{
              background: handleStatus.background,
              color: handleStatus.color,
            }}
          >
            {handleStatus.text}
          </div>
          <button
            className={`${styles.button} ${isLoading ? styles["button-loading"] : ""
              }`}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "AI esikBot"}
          </button>
        </div>
      </form>
      <div className={styles["form-footer"]}>
        <span>Welcome to the 2024 SECA Conference!</span>
        <span>Experience esikBot like never before.</span>
        <a target="_blank" href="https://www.esikidz.com/">
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
