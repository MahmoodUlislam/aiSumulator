import styles from "./loading.module.scss";
import Image from "next/image";

export default function Loading() {
  return (
    <div style={styles.loadingMask}>
      <Image
        source="/ai-loading.gif"
        styles={styles.aiLoading}
        alt="loading..."
      />
    </div>
  );
}
