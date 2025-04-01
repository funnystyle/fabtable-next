"use client"; // Next.js 클라이언트 컴포넌트

import React, { useEffect, useRef, useState } from "react";
import { Spin, Table } from "antd";
import { focusTable, handleKeyDownAntd, handleMouseDownAntd, handleMouseEnterAntd, handleMouseUpAntd, handleRowClickAntd } from "@components/AntdTableEvent";
import '@styles/globals.css';
import useTableSelectKeysStore from "@store/useTableSelectKeysStore";
import { LoadingOutlined } from "@ant-design/icons";

const TableOnRowSelect2 = ({ header, serverData, size, setSize, onRowClick, rowSelect=true, scrollY, onRowDoubleClick }) => {

  const {selectedRowKeys, setSelectedRowKeys, anchorRowKey, setAnchorRowKey, cursorRowKey, setCursorRowKey} = useTableSelectKeysStore();

  const [isDragging, setIsDragging] = useState(false);
  const [ctrlDragging, setCtrlDragging] = useState(false);
  const [shiftDragging, setShiftDragging] = useState(false);
  const dragStartKeyRef = useRef(null);
  const dragEndKeyRef = useRef(null);
  const initialSelectedKeysRef = useRef([]);
  const tableRef = useRef(null);

  // ✅ 페이지네이션 관련 상태
  const [currentPage, setCurrentPage] = useState(1);

  const data = serverData != undefined ? serverData.map((item, index) => ({
    ...item,
    key: item.id // key 값을 item.id로 설정
  })) : [];

  useEffect(() => {
    focusTable(tableRef);

    const handleKeyDown = (event) => {
        handleKeyDownAntd(event, data, document, tableRef,
        currentPage, size,
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
        fixed: col.fixed ? "left" : undefined, // 고정 여부
        // sorter: col.sortable ? (a, b) => (a[col.data] > b[col.data] ? 1 : -1) : undefined // 정렬 여부
      }));
  };

  // ✅ Dropdown에서 선택한 값 저장 및 적용
  const handleMenuClick = ({ key }) => {
    setSize(Number(key)); // ✅ 선택한 값 적용
    localStorage.setItem("tablePageSize", key); // ✅ localStorage에 저장
  };

  const handleReset = () => {
    event.preventDefault();
    setSelectedRowKeys([]);
    setAnchorRowKey(null);
    setCursorRowKey(null);
    setTimeout(() => {
      setSelectedRowKeys([]);
    }, 0);
  }


  const [loading, setLoading] = useState(true);
  // 👉 테이블 렌더링 완료 감지
  useEffect(() => {
    if (serverData.length === 0) return;

    requestAnimationFrame(() => {
      const target = tableRef.current?.querySelector(".ant-table-tbody");
      const rowCount = target?.childNodes.length ?? 0;

      if (rowCount > 0) {
        const columnCount = target.childNodes[0].childNodes.length;
        if (columnCount > 1) {
          setLoading(false);
        }
      }
    });
  }, [serverData]);

  return (
    <Spin spinning={loading} indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} style={{ textAlign: "center" }}>
      <div ref={tableRef} className="tb-container" tabIndex={0} 
        style={{ 
          userSelect: "none", 
          outline: "none", 
          paddingTop: "8px", 
          paddingBottom: "40px",
          visibility: loading ? "hidden" : "visible",
        }} 
        onMouseUp={() => handleMouseUpAntd(handleAntdTableEventData())}
      >
        <Table
          rowSelection={
            rowSelect
              ? {
                selectedRowKeys,
                type: "checkbox",
                fixed: true,
                columnWidth: 0,
                renderCell: () => null,
              }
              : undefined
        }
          // columns={generateColumns(header)}
          columns={data.length > 0 ? header : []}
          rowKey={(record) => record.key}
          dataSource={data}
          pagination={false}
          onRow={(record) => ({
            onClick: (event) => {
              handleRowClickAntd(event, record, handleAntdTableEventData());

              const fullRecord = data.find(item => item.key === record.key);
              if (onRowClick) onRowClick(fullRecord); // ✅ 상위 컴포넌트에서 전달된 함수 실행
            },
            onMouseDown: (event) => handleMouseDownAntd(event, record, handleAntdTableEventData()),
            onMouseEnter: (event) => handleMouseEnterAntd(event, record, handleAntdTableEventData()),
            onDoubleClick: (event) => {
              if (onRowDoubleClick) {
                const fullRecord = data.find(item => item.key === record.key);
                onRowDoubleClick(fullRecord);
              }
            }
          })}
          size="small"
          className="ellipsis-column basic-tb"
          bordered
          scroll={{
            x: "max-content",
            y: scrollY || "calc(60vh - 38px)",
          }}
          style={{ tableLayout: "fixed" }}
        />
      </div>
    </Spin>
  );
};

export default TableOnRowSelect2;
