"use client"; // Next.js 클라이언트 컴포넌트

import React, { useState, useRef, useEffect } from "react";
import { Button, Dropdown, Flex, message, Pagination, Space, Table } from "antd";
import {focusTable, handleKeyDownAntd, handleMouseDownAntd, handleMouseEnterAntd, handleMouseUpAntd, handleRowClickAntd} from "@components/AntdTableEvent";
import { RedoOutlined, SettingOutlined, VerticalLeftOutlined, VerticalRightOutlined } from "@ant-design/icons";
import { lineItems } from "@data/lineItems";
import useOrderListQueryStore from "@store/useOrderListQueryStore";
import '@styles/globals.css';

const TableOnRowSelect2 = ({ header, serverData, size, setSize }) => {

  const {selectedRowKeys, setSelectedRowKeys} = useOrderListQueryStore();

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

  const data = serverData != undefined ? serverData.map(item => ({
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

  useEffect(() => {
    const savedPageSize = localStorage.getItem("tablePageSize");
    if (savedPageSize) {
      setSize(Number(savedPageSize)); // 문자열 → 숫자로 변환
    }
  }, []);

  const handleReset = () => {
    event.preventDefault();
    setSelectedRowKeys([]);
    setAnchorRowKey(null);
    setCursorRowKey(null);
    setTimeout(() => {
      setSelectedRowKeys([]);
    }, 0);
  }


  return (
    <div ref={tableRef} className="tb-container" tabIndex={0} style={{ userSelect: "none", outline: "none" }} onMouseUp={() => handleMouseUpAntd(handleAntdTableEventData())}>
      {/* ✅ 상단 컨트롤 영역 (우측 상단 버튼 추가) */}

      {/* 갯수, 페이징, 버튼 영역 */}
      <Flex align="center" justify="space-between">
        <Flex gap="small" align="center">
          <Flex gap="small" className="list-num">
            총 <span>{data.length}</span>
          </Flex>

          <Flex gap="small" className="list-num">
            <strong>{selectedRowKeys.length}</strong> 건 선택
          </Flex>
        </Flex>

        <Flex gap="small" align="center">
          <Button
            icon={<RedoOutlined />}
            target="_blank"
            className="icon-redo"
            onClick={handleReset}
          />

          <Dropdown menu={{ items: lineItems, onClick: handleMenuClick }}>
            <Button>
              <Space>
                <SettingOutlined />
              </Space>
            </Button>
          </Dropdown>
        </Flex>
      </Flex>

      <Table
        rowSelection={{ selectedRowKeys, type: "checkbox", fixed: true
      , columnWidth: 0
          , renderCell: () => null

      }}
        // columns={generateColumns(header)}
        columns={data.length > 0 ? header : []}
        rowKey={(record) => record.key}
        dataSource={data}
        pagination={{
          simple: true,
          position: ["topCenter"],
          pageSize: size,
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
        size="small"
        className="ellipsis-column basic-tb"
        bordered
        scroll={{
          x: "max-content",
          y: "calc(60vh - 38px)",
        }}
        style={{ tableLayout: "fixed" }}
      />
    </div>
  );
};

export default TableOnRowSelect2;
