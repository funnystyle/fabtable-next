// pages/index.js
import React from "react";
import Link from "next/link";

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to Home Page</h1>
      <p>
        Go to <Link href="/board">Board Page</Link>
      </p>
      <p>
        Go to <Link href="/datatables/client">DataTables Sample Page</Link>
      </p>
    </div>
  );
};

export default HomePage;
