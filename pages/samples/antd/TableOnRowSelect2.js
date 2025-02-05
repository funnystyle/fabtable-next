"use client"; // Next.js 클라이언트 컴포넌트

import React, { useState, useRef, useEffect } from "react";
import { Table } from "antd";
import {focusTable, handleKeyDownAntd, handleMouseDownAntd, handleMouseEnterAntd, handleMouseUpAntd, handleRowClickAntd} from "@pages/samples/antd/AntdTableEvent";

const TableOnRowSelect = () => {
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

  const data = React.useMemo(() =>
    Array.from({ length: 46 }, (_, i) => ({
      key: i,
      name: `File ${i}`,
      age: i + 20,
      address: `Folder ${i}`
    })), []);

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

  const handleRowClick = (event, record) => {
    handleRowClickAntd(event, record,
        setSelectedRowKeys, selectedRowKeys,
        anchorRowKey, setAnchorRowKey,
        setCursorRowKey
    )
  }

  const handleMouseDown = (event, record) => {
    handleMouseDownAntd(event, record,
        dragStartKeyRef, initialSelectedKeysRef,
        selectedRowKeys,
        setAnchorRowKey,
        setIsDragging,
        setShiftDragging,
        setCtrlDragging
    )
  };

  const handleMouseEnter = (event, record) => {
    handleMouseEnterAntd(event, record,
        selectedRowKeys, setSelectedRowKeys,
        anchorRowKey,
        isDragging, shiftDragging,
        dragStartKeyRef, dragEndKeyRef
    )
  };

  const handleMouseUp = () => {
    handleMouseUpAntd(selectedRowKeys, setSelectedRowKeys,
        setCursorRowKey,
        setIsDragging, setShiftDragging, setCtrlDragging,
        dragStartKeyRef, dragEndKeyRef
    )
  };

  return (
    <div ref={tableRef} tabIndex={0} style={{ userSelect: "none", outline: "none" }} onMouseUp={handleMouseUp}>
      <Table
        rowSelection={{ selectedRowKeys, type: "checkbox", fixed: true }}
        columns={[
          { title: "Name", dataIndex: "name" },
          { title: "Age", dataIndex: "age" },
          { title: "Address", dataIndex: "address" }
        ]}
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
          onClick: (event) => handleRowClick(event, record),
          onMouseDown: (event) => handleMouseDown(event, record),
          onMouseEnter: (event) => handleMouseEnter(event, record),
        })}
      />
    </div>
  );
};

export default TableOnRowSelect;
