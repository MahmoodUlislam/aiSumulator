import Link from "next/link";

const Custom404 = () => {
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>404 - Page Not Found</h1>
      <p>
        The page you are looking for might have been removed or is temporarily
        unavailable.
      </p>
      <p>
        <Link href="/">
          <a>Go back to Home</a>
        </Link>
      </p>
    </div>
  );
};

export default Custom404;
