// pages/index.js
import React from "react";
import Link from "next/link";

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to Home Page</h1>
      <p>
        Go to <Link href="/samples/board">Board Sample Page</Link>
      </p>
      <p>
        Go to{" "}
        <Link href="/samples/datatables/client">
          DataTables Sample (Client Data) Page
        </Link>
      </p>
    </div>
  );
};

export default HomePage;
