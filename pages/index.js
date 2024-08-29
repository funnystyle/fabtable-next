// pages/index.js
import React from "react";
import Link from "next/link";

const HomePage = () => {
  return (
    <div>
      <h1>MKP 샘플페이지</h1>
      <p>
        <Link href="/samples/board">게시판 샘플 - React Query & Zustand</Link>
      </p>
      <p>
        <Link href="/samples/datatables/client">
          DataTables 샘플 - client side 데이터
        </Link>
      </p>
      <p>
        <Link href="/samples/datatables/server">
          DataTables 샘플 - server side 데이터
        </Link>
      </p>
    </div>
  );
};

export default HomePage;
