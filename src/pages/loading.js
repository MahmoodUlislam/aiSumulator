import styles from "./loading.module.scss";
import Image from "next/image";

const Loading = () => {
  return (
    <div style={styles.loadingMask}>
      <Image
        source="/ai-loading.gif"
        styles={styles.aiLoading}
        alt="loading..."
      />
    </div>
  );
};

export default Loading;
