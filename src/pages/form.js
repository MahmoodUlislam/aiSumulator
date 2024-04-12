"use client";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "./form.module.scss"; // Import the CSS module

export default function FormPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Validation object to maintain state for each field
  const [validation, setValidation] = useState({
    organizationName: { value: "", error: "" },
    yourName: { value: "", error: "" },
    contactPhoneNumber: { value: "", error: "" },
    email: { value: "", error: "" },
    role: { value: "", error: "" },
  });

  // Validation Functions
  const validateField = (fieldName) => {
    let error = "";
    switch (fieldName) {
      case "organizationName":
        if (!validation.organizationName.value.trim()) {
          error = "Organization name is required";
        }
        break;
      case "yourName":
        if (!validation.yourName.value.trim()) {
          error = "Your name is required";
        }
        break;
      case "contactPhoneNumber":
        const phonePattern =
          /^(\+?1)?[-. ]?\(?[2-9][0-9]{2}\)?[-. ]?[0-9]{3}[-. ]?[0-9]{4}$/; // Canadian phone number pattern
        if (!validation.contactPhoneNumber.value.trim()) {
          error = "Phone number is required";
        } else if (!phonePattern.test(validation.contactPhoneNumber.value)) {
          error = "Invalid phone number";
        }
        break;
      case "email":
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!validation.email.value.trim()) {
          error = "Email is required";
        } else if (!emailPattern.test(validation.email.value)) {
          error = "Invalid email address";
        }
        break;
      case "role":
        if (!validation.role.value) {
          error = "Role selection is required";
        }
        break;
      default:
        break;
    }

    setValidation((prevValidation) => ({
      ...prevValidation,
      [fieldName]: {
        ...prevValidation[fieldName],
        error: error,
      },
    }));

    return error === "";
  };

  const handleInputChange = (fieldName, value) => {
    setValidation((prevValidation) => ({
      ...prevValidation,
      [fieldName]: {
        ...prevValidation[fieldName],
        value: value,
      },
    }));
  };

  async function onSubmit(event) {
    event.preventDefault();

    let isFormValid = true;

    // Validate each field
    for (const fieldName of Object.keys(validation)) {
      const isValid = validateField(fieldName);
      if (!isValid) {
        isFormValid = false;
      }
    }

    if (!isFormValid) {
      return;
    }

    setIsLoading(true);

    try {
      // Submit the form data
      const formData = new FormData(event.currentTarget);
      // POST it to next.js API
      const response = await fetch("/api/formAPI", {
        method: "POST",
        body: JSON.stringify(Object.fromEntries(formData)),
        headers: {
          "Content-Type": "application/json",
        },
      });
      let responseData;
      switch (response.status) {
        case 200:
          responseData = await response.json();
          // Redirect to confirmation page with confirmation message as query parameter
          router.push({
            pathname: "/confirmation",
            query: { confirmationMessage: responseData.message },
          });
          break;
        case 201:
          responseData = await response.json();
          // Redirect to confirmation page with confirmation message as query parameter
          router.push({
            pathname: "/confirmation",
            query: { confirmationMessage: responseData.message },
          });
          break;
        case 400:
          console.error("Form submission failed");
          break;
        default:
          console.error("An unexpected error occurred");
          break;
      }
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
          className={`${styles.input} ${isLoading ? styles["input-loading"] : ""
            }`}
          type="text"
          name="organizationName"
          placeholder="Organization name"
          value={validation.organizationName.value}
          onChange={(e) =>
            handleInputChange("organizationName", e.target.value)
          }
        />
        {validation.organizationName.error && (
          <div className={styles.error}>
            {validation.organizationName.error}
          </div>
        )}

        <input
          className={`${styles.input} ${isLoading ? styles["input-loading"] : ""
            }`}
          type="text"
          name="yourName"
          placeholder="Your name"
          value={validation.yourName.value}
          onChange={(e) => handleInputChange("yourName", e.target.value)}
        />
        {validation.yourName.error && (
          <div className={styles.error}>{validation.yourName.error}</div>
        )}

        <input
          className={`${styles.input} ${isLoading ? styles["input-loading"] : ""
            }`}
          type="text"
          name="contactPhoneNumber"
          placeholder="Contact phone number"
          value={validation.contactPhoneNumber.value}
          onChange={(e) =>
            handleInputChange("contactPhoneNumber", e.target.value)
          }
        />
        {validation.contactPhoneNumber.error && (
          <div className={styles.error}>
            {validation.contactPhoneNumber.error}
          </div>
        )}

        <input
          className={`${styles.input} ${isLoading ? styles["input-loading"] : ""
            }`}
          type="email"
          name="email"
          placeholder="E-mail"
          value={validation.email.value}
          onChange={(e) => handleInputChange("email", e.target.value)}
        />
        {validation.email.error && (
          <div className={styles.error}>{validation.email.error}</div>
        )}

        <select
          className={`${styles.select} ${isLoading ? styles["input-loading"] : ""
            }`}
          name="role"
          value={validation.role.value}
          onChange={(e) => handleInputChange("role", e.target.value)}
        >
          <option value="">What is your role?</option>
          <option value="Daycare Owner">Daycare Owner</option>
          <option value="Daycare Director">Daycare Director</option>
          <option value="Daycare Executive Director">
            Daycare Executive Director
          </option>
          <option value="Daycare Manager / Supervisor">
            Daycare Manager / Supervisor
          </option>
          <option value="Daycare Teacher">Daycare Teacher</option>
        </select>
        {validation.role.error && (
          <div className={styles.error}>{validation.role.error}</div>
        )}

        <button
          className={`${styles.button} ${isLoading ? styles["button-loading"] : ""
            }`}
          type="submit"
          disabled={isLoading}
        >
          <div className={styles["buttonIcon"]}>
            <Image
              src={isLoading ? "/login-rounded-right_black.png" : "/login-rounded-right_blue.png"}
              alt="enter button icon"
              width={200}
              height={200}
              layout="responsive"
            />
          </div>
          {isLoading ? "Loading..." : "Next"}
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
