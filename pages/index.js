// pages/index.js
import React from "react";
import { Link } from '@chakra-ui/next-js'

const HomePage = () => {
  return (
    <div>
      <h1>MKP 샘플페이지</h1>
      <p>
        <Link href="/samples/board" color='blue.400' _hover={{ color: 'blue.500' }}>게시판 샘플 - React Query & Zustand</Link>
      </p>
      <p>
        <Link href="/samples/datatables/client" color='blue.400' _hover={{ color: 'blue.500' }}>
          DataTables 샘플 - client side 데이터
        </Link>
      </p>
      <p>
        <Link href="/samples/datatables/server" color='blue.400' _hover={{ color: 'blue.500' }}>
          DataTables 샘플 - server side 데이터
        </Link>
      </p>
      <p>
        <Link href="/samples/datatables/cs" color='blue.400' _hover={{ color: 'blue.500' }}>
          DataTables 샘플 CS - server side 데이터
        </Link>
      </p>
      <p>
        <Link href="/samples/sortable" color='blue.400' _hover={{ color: 'blue.500' }}>Sortable 샘플 - 컬럼 항목편집</Link>
      </p>
      <p>
          <Link href="/samples/layerpopup" color='blue.400' _hover={{ color: 'blue.500' }}>레이어팝업 시간 재기</Link>
      </p>
      <p>
          <Link href="/samples/layout/golden-layout" color='blue.400' _hover={{ color: 'blue.500' }}>골든 레이아웃</Link>
      </p>
      <p>
          <Link href="/samples/modal/maximize" color='blue.400' _hover={{ color: 'blue.500' }}>최대화 모달창 샘플</Link>
      </p>
      <p>
          <Link href="/samples/antd/monthpicker" color='blue.400' _hover={{ color: 'blue.500' }}>ant design monthpicker</Link>
      </p>
    </div>
  );
};

export default HomePage;
