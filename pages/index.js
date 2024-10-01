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
      <p>
        <Link href="/samples/datatables/cs">
          DataTables 샘플 CS - server side 데이터
        </Link>
      </p>
      <p>
        <Link href="/samples/sortable">Sortable 샘플 - 컬럼 항목편집</Link>
      </p>
    <p>
        <Link href="/samples/layerpopup">레이어팝업 시간 재기</Link>
    </p>
    <p>
        <Link href="/samples/layout/golden-layout">골든 레이아웃</Link>
    </p>
    </div>
  );
};

export default HomePage;
