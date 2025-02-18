// pages/index.js
"use client"; // Next.js 클라이언트 컴포넌트

import React from "react";
import { Link } from '@chakra-ui/next-js'
import { useTranslation } from 'next-i18next'
import LanguageSwitcher from "@components/LanguageSwitcher";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";


export async function getStaticProps({locale}) {
  const data = {
    props: {
      // 페이지에서 번역 데이터를 미리 가져오기
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
    },
  }

  console.log(data);
  console.log(data?.props?._nextI18Next?.initialI18nStore);

  return data;
}

const SampleIndex = () => {
  const { t, i18n, ready } = useTranslation('common', { useSuspense: false });

  if (!ready) {
    return <div>Loading...</div>; // 번역 데이터 로딩 중일 때
  }

  console.log("현재 언어:", i18n.language); // 현재 적용된 언어 확인
  console.log("로드된 언어 목록:", i18n.languages); // 사용 가능한 언어 확인
  console.log("t('greeting'):", t('greeting'));
  const greeting = t('greeting');

  return (
    <div>
      <LanguageSwitcher />
      {/*<h1>{greeting}</h1>*/}
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
      <p>
        <Link href="/samples/antd/print" color='blue.400' _hover={{ color: 'blue.500' }}>print</Link>
      </p>
      <p>
        <Link href="/samples/antd/FixedLeftTable" color='blue.400' _hover={{ color: 'blue.500' }}>FixedLeftTable</Link>
      </p>
    </div>
  );
};

export default SampleIndex;


