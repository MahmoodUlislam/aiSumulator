"use client";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "./form.module.scss"; // Import the CSS module

export default function FormPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const email = router.query.message;

  // Validation object to maintain state for each field
  const [validation, setValidation] = useState({
    organizationName: { value: "", error: "" },
    yourName: { value: "", error: "" },
    contactPhoneNumber: { value: "", error: "" },
    email: {
      value: `${email ? email : ""}`, error: ""
    },
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

      // Iterate over the form fields
      document.querySelectorAll('input, select, textarea').forEach(field => {
        // Check if the field is disabled
        if (field.disabled) {
          // Append the disabled field's name and value to the FormData object
          formData.append(field.name, field.value);
        }
      });

      // POST it to next.js API
      const response = await fetch("/api/formAPI", {
        method: "POST",
        body: JSON.stringify(Object.fromEntries(formData)),
        headers: {
          "Content-Type": "application/json",
        },
      });
      let responseData = await response.json();
      switch (response.status) {
        case 200:
          router.push({
            pathname: "/confirmation",
            query: responseData,
          });
          break;
        case 201:
          router.push({
            pathname: "/confirmation",
            query: responseData,
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
          type="email"
          name="email"
          placeholder="E-mail"
          value={email ? email : validation.email.value}
          disabled
        />
        {validation.email.error && (
          <div className={styles.error}>{validation.email.error}</div>
        )
        }
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
          type="number"
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



        <select
          className={isLoading ? styles["input-loading"] : ""}
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
              sizes="100vw"
              style={{
                width: "100%",
                height: "auto"
              }} />
          </div>
          {isLoading ? "Loading..." : "Next"}
        </button>
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
