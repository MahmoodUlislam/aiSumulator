// checkAccountWithEmailPage.js
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "./checkAccount.module.scss";

export default function CheckAccountWithEmailPage() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");

        if (!email) {
            setError("Email is required");
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch("/api/checkEmailAPI", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                const data = await response.json();
                if (data.exists) {
                    router.push({
                        pathname: "/confirmation",
                        query: { confirmationMessage: response.message, isUserExists: true },
                    });
                } else {
                    router.push("/form");
                }
            } else {
                throw new Error("Failed to check email existence");
            }
        } catch (error) {
            console.error("Error:", error.message);
            setError("Failed to check email existence");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.checkAccountContainer}>
            <div className={styles.title}>Draw Registration</div>
            <form onSubmit={handleSubmit} className={styles.checkAccountForm}>
                <label htmlFor="email">Email</label>
                <input
                    className={`${styles.input} ${isLoading ? styles["input-loading"] : ""}`}
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={email}
                    placeholder="Enter your email address"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <span className={styles.errorMessage}>{error}</span>
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
            <div className={styles.formFooter}>
                <span>Welcome to the 2024 SECA Conference!</span>
                <span>Experience esikBot like never before.</span>
                <a target="_blank" rel="noopener noreferrer" href="https://www.esikidz.com/">
                    <Image src="/esikidz-logo.png" alt="esikidz logo" width={204} height={70} />
                </a>
            </div>
        </div>
    );
}
