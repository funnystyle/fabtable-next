// pages/index.js
import React from "react";
import { Link } from '@chakra-ui/next-js'

const SampleIndex = () => {
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
          <Link href="/samples/antd/monthpicker" color='blue.400' _hover={{ color: 'blue.500' }}>MonthPickerCustom</Link>
      </p>
      <p>
          <Link href="/samples/antd/multiselectcalendar" color='blue.400' _hover={{ color: 'blue.500' }}>MultiSelectCalender</Link>
      </p>
      <p>
          <Link href="/samples/antd/multimodal" color='blue.400' _hover={{ color: 'blue.500' }}>Multi Modal (can drage move)</Link>
      </p>
      <p>
          <Link href="/samples/antd/tabcontent_topmenu" color='blue.400' _hover={{ color: 'blue.500' }}>Top Menu - Tab Content(탭 드래그 안됨)</Link>
      </p>
      <p>
        <Link href="/samples/antd/LnbWithDraggableTabs" color='blue.400' _hover={{ color: 'blue.500' }}>LnbWithDraggableTabs</Link>
      </p>
      <p>
        <Link href="/samples/antd/PDFViewer" color='blue.400' _hover={{ color: 'blue.500' }}>PDFViewer</Link>
      </p>
      {/* <p>
        <Link href="/samples/translation/i18n" color='blue.400' _hover={{ color: 'blue.500' }}>i18n (다국어)</Link>
      </p> */}
      <p>
        <Link href="/samples/antd/EditableTable" color='blue.400' _hover={{ color: 'blue.500' }}>EditableTable</Link>
      </p>
      <p>
        <Link href="/samples/orderInfo/OrderInfoCreate" color='blue.400' _hover={{ color: 'blue.500' }}>OrderInfoCreate</Link>
      </p>
      <p>
        <Link href="/samples/orderInfo/OrderInfoListAntd" color='blue.400' _hover={{ color: 'blue.500' }}>OrderInfoListAntd</Link>
      </p>
      <p>
        <Link href="/samples/antd/memoInput" color='blue.400' _hover={{ color: 'blue.500' }}>memoInput</Link>
      </p>
      <p>
        <Link href="/samples/antd/layout" color='blue.400' _hover={{ color: 'blue.500' }}>layout</Link>
      </p>
      <p>
        <Link href="/samples/antd/IconsPage" color='blue.400' _hover={{ color: 'blue.500' }}>IconsPage</Link>
      </p>
      <p>
        <Link href="/samples/antd/table" color='blue.400' _hover={{ color: 'blue.500' }}>Table</Link>
      </p>
      <p>
        <Link href="/samples/antd/TableOnRowSelect" color='blue.400' _hover={{ color: 'blue.500' }}>Table on Row Select</Link>
      </p>
    </div>
  );
};

export default SampleIndex;
