"use client"; // Next.js 클라이언트 컴포넌트

import React, { useState, useRef, useEffect } from "react";
import { Table } from "antd";
import {focusTable, handleKeyDownAntd, handleMouseDownAntd, handleMouseEnterAntd, handleMouseUpAntd, handleRowClickAntd} from "@pages/samples/antd/AntdTableEvent";

const TableOnRowSelect2 = ({ header, serverData }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]); // 선택된 행
  const [anchorRowKey, setAnchorRowKey] = useState(null); // 기준 행
  const [cursorRowKey, setCursorRowKey] = useState(null); // 현재 커서 위치
  const [isDragging, setIsDragging] = useState(false);
  const [ctrlDragging, setCtrlDragging] = useState(false);
  const [shiftDragging, setShiftDragging] = useState(false);
  const dragStartKeyRef = useRef(null);
  const dragEndKeyRef = useRef(null);
  const initialSelectedKeysRef = useRef([]);
  const tableRef = useRef(null);

  // ✅ 페이지네이션 관련 상태
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // 기본 페이지당 10개 설정 (Ant Design default)

  const data = serverData.map(item => ({
    ...item,
    key: item.id // key 값을 item.id로 설정
  }));


  useEffect(() => {
    focusTable(tableRef);

    const handleKeyDown = (event) => {
        handleKeyDownAntd(event, data, document, tableRef,
        currentPage, pageSize,
        selectedRowKeys, setSelectedRowKeys,
        anchorRowKey, setAnchorRowKey,
        cursorRowKey, setCursorRowKey )
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [selectedRowKeys, anchorRowKey, cursorRowKey, data, currentPage]);

  const handleAntdTableEventData = () => {
    return {
      selectedRowKeys, setSelectedRowKeys,
      anchorRowKey, setAnchorRowKey,
      cursorRowKey, setCursorRowKey,
      isDragging, setIsDragging,
      ctrlDragging, setCtrlDragging,
      shiftDragging, setShiftDragging,
      dragStartKeyRef, dragEndKeyRef,
      initialSelectedKeysRef, data
    }
  }

  const generateColumns = (columnData) => {
    return columnData
      .sort((a, b) => a.displayOrder - b.displayOrder) // displayOrder 기준 정렬
      .map(col => ({
        title: col.title, // 컬럼 제목
        dataIndex: col.data, // 데이터 인덱스
        key: col.columnName, // 고유 키
        fixed: col.fixed ? (col.fixed === true ? "left" : col.fixed) : undefined, // 고정 여부
        sorter: col.sortable ? (a, b) => (a[col.data] > b[col.data] ? 1 : -1) : undefined // 정렬 여부
      }));
  };

  return (
    <div ref={tableRef} tabIndex={0} style={{ userSelect: "none", outline: "none" }} onMouseUp={() => handleMouseUpAntd(handleAntdTableEventData())}>
      <Table
        rowSelection={{ selectedRowKeys, type: "checkbox", fixed: true }}
        columns={generateColumns(header)}
        rowKey={(record) => record.key}
        dataSource={data}
        pagination={{
          position: ["topRight"],
          pageSize,
          current: currentPage,
          onChange: (page) => {
            setCurrentPage(page);
            // ✅ 페이지 이동 시, 선택된 행 초기화
            setSelectedRowKeys([]);
            setCursorRowKey(null);
            setAnchorRowKey(null);
          }
        }}
        onRow={(record) => ({
          onClick: (event) => handleRowClickAntd(event, record, handleAntdTableEventData()),
          onMouseDown: (event) => handleMouseDownAntd(event, record, handleAntdTableEventData()),
          onMouseEnter: (event) => handleMouseEnterAntd(event, record, handleAntdTableEventData())
        })}
      />
    </div>
  );
};

export default TableOnRowSelect2;
