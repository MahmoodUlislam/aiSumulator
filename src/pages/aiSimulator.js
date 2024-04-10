"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./aiSimulator.module.scss"; // Import the CSS module

export default function AiSimulatorPage() {
  const [reportType, setReportType] = useState("");
  const [content, setContent] = useState("");
  const [reportTypeValid, setReportTypeValid] = useState(true);
  const [contentValid, setContentValid] = useState(true);
  const [reportTypeError, setReportTypeError] = useState("");
  const [contentError, setContentError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

    // Proceed with form submission
    setIsLoading(true);
    try {
      const res = await request.put(
        api.reminder,
        {
          centerId: center.id,
          timezone: center.timezone,
          operation: "create",
          opInfo: {
            classroomId: await AsyncStorage.getItem("classroomId"),
            logData: {
              teacherId: teacher.id,
              teacherName: `${teacher.firstName} ${teacher.lastName}`,
              content: notes,
            },
          },
        },
        globalState.jwtToken
      );
      switch (res.status) {
        case 200:
          onClose();
          initData();
          break;

        case 403:
          setUnauthorized();
          break;

        default:
          prompt("system-error");
      }
    } catch (e) {
      prompt("network-error");
    } finally {
      setLoading(false);
    }
  }

  const esikidzAi = async () => {
    try {
      setLoading(true);
      const res = await request.post(
        api.esikidzAi,
        {
          centerId: center.id,
          teacherName: teacher.firstName + " " + teacher.lastName,
          type: "classroom-notes",
          operation: "polishing",
          opInfo: notes,
        },
        globalState.jwtToken
      );

      switch (res.status) {
        case 200:
          setHandleStatus({
            color: colors.green,
            text: t("classroomManagement.esikidzAiSuccess"),
          });
          setNotes(res.data.content || "");
          break;

        case 204:
          prompt("ai-subscription");
          break;

        case 208:
          setHandleStatus({
            color: colors.yellow,
            text: res.data.message,
          });
          break;

        case 403:
          setUnauthorized();
          break;

        default:
          prompt("system-error");
      }
    } catch (e) {
      if (e.toString().includes("timeout")) {
        prompt("ai-timeout");
      } else {
        prompt("network-error");
      }
    } finally {
      setAiLoading(false);
    }
  };

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
          onChange={(e) => {
            setReportType(e.target.value);
            setReportTypeValid(!!e.target.value.trim());
            setReportTypeError(
              !e.target.value.trim() ? "Please select a report type." : ""
            );
          }}
        >
          <option value="">Please select report type</option>
          <option value="reportType">Write a report to parent(s)</option>
          <option value="content">Send message to parent(s)</option>
        </select>
        {reportTypeError && (
          <div className={styles["error-message"]}>{reportTypeError}</div>
        )}
        <label htmlFor="content">Report Content</label>
        <textarea
          className={`${styles.textarea} ${
            isLoading ? styles["input-loading"] : ""
          }`}
          name="content"
          rows={6}
          placeholder={`Type some keywords that you want to write about.\n\nClick on "AI esikBot" and see the magic happen!`}
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
            setContentValid(!!e.target.value.trim());
            setContentError(
              !e.target.value.trim() ? "Please enter report content." : ""
            );
          }}
        />
        {contentError && (
          <div className={styles["error-message"]}>{contentError}</div>
        )}
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
