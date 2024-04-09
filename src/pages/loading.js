import styles from "./loading.module.css";
import Image from "next/image";

const Loading = () => {
  return (
    <div>
      <Image src="/ai-loading.gif" styles={styles.aiLoading} alt="loading..." />
    </div>
  );
};

export default Loading;
