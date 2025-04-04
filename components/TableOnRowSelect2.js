"use client"; // Next.js 클라이언트 컴포넌트

import React, {useEffect, useRef, useState} from "react";
import {Spin, Table} from "antd";
import {focusTable, handleKeyDownAntd, handleMouseDownAntd, handleMouseEnterAntd, handleMouseUpAntd, handleRowClickAntd} from "@components/AntdTableEvent";
import '@styles/globals.css';
import useTableSelectKeysStore from "@store/useTableSelectKeysStore";
import CustomEmpty from "./common/CustomEmpty";

const TableOnRowSelect2 = ({ header, serverData, onRowClick, rowSelect=true, scrollY, onRowDoubleClick, isPending, isFirstLoad=true, modalStore, keysStore }) => {
  const { size, total, page } = modalStore();
  const {selectedRowKeys, setSelectedRowKeys, anchorRowKey, setAnchorRowKey, cursorRowKey, setCursorRowKey, datas, setDatas} = keysStore();

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
    // no는 역순 정렬이다.
    no: total - (page - 1) * size - index,
  })) : [];

  useEffect(() => {
    focusTable(tableRef);

    const handleKeyDown = (event) => {
        handleKeyDownAntd(event, data, document, tableRef,
        currentPage, size,
        selectedRowKeys, setSelectedRowKeys,
        anchorRowKey, setAnchorRowKey,
        cursorRowKey, setCursorRowKey, datas, setDatas )
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
      initialSelectedKeysRef, data,
      datas, setDatas
    }
  }

  const [loading, setLoading] = useState(isFirstLoad);
  // 👉 테이블 렌더링 완료 감지
  useEffect(() => {
    if (isPending) {return;}

    requestAnimationFrame(() => {
      const target = tableRef.current?.querySelector(".ant-table-tbody");
      const rowCount = target?.childNodes.length ?? 0;

      if (rowCount > 0) {
        const columnCount = target.childNodes[0].childNodes.length;
        if (columnCount > 1) {
          setLoading(false);
        } else {
          setTimeout(() => {
            setLoading(false);
          }, 2000);
        }
      }
    });
  }, [serverData]);

  return (
    <Spin spinning={loading} style={{ textAlign: "center" }}>
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

              if (onRowClick) onRowClick(record); // ✅ 상위 컴포넌트에서 전달된 함수 실행
            },
            onMouseDown: (event) => handleMouseDownAntd(event, record, handleAntdTableEventData()),
            onMouseEnter: (event) => handleMouseEnterAntd(event, record, handleAntdTableEventData()),
            onDoubleClick: (event) => {
              if (onRowDoubleClick) {
                onRowDoubleClick(record);
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
          locale={{ emptyText: <CustomEmpty /> }}
        />
      </div>
    </Spin>
  );
};

export default TableOnRowSelect2;
