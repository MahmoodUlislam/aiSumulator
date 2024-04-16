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

            switch (response.status) {
                case 200:
                    const data = await response.json();
                    if (data.exists) {
                        router.push({
                            pathname: "/confirmation",
                            query: data,
                        });
                    } else {
                        router.push({
                            pathname: "/form",
                            query: data,
                        });
                    }
                    break;
                case 201:
                    const formData = await response.json(); // Change: Rename data to formData
                    router.push({
                        pathname: "/form",
                        query: formData, // Change: Use formData instead of data
                    });
                    break;
                case 405:
                    throw new Error("Method Not Allowed");
                default:
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
                <div className={styles.formGroup}>
                    <label htmlFor="email" className={styles.label}>
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="Enter your email address"
                        className={styles.input}
                    />
                    {error && <div className={styles.error}>{error}</div>}
                </div>
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
                            width={320}
                            height={320}
                            sizes="100vw"
                            style={{
                                width: "100%",
                                height: "auto"
                            }} />
                    </div>
                    {isLoading ? "Loading..." : "Next"}
                </button>
            </form>
            <div className={styles.formFooter}>
                <span>Welcome to the 2024 SECA Conference!</span>
                <span>Experience esikBot like never before.</span>
                <a target="_blank" rel="noopener noreferrer" href="https://www.esikidz.com/">
                    <Image
                        src="/esikidz-logo.png"
                        alt="esikidz logo"
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
