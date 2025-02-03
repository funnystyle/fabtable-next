"use client"; // Next.js 클라이언트 컴포넌트

import React, { useState, useRef, useEffect } from "react";
import { Table } from "antd";

const TableOnRowSelect = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]); // 선택된 행
  const [anchorRowKey, setAnchorRowKey] = useState(null); // 기준 행
  const [cursorRowKey, setCursorRowKey] = useState(null); // 현재 커서 위치
  const [isDragging, setIsDragging] = useState(false); // 드래그 여부
  const [ctrlDragging, setCtrlDragging] = useState(false); // Ctrl+드래그 여부
  const [shiftDragging, setShiftDragging] = useState(false); // Shift+드래그 여부
  const dragStartKeyRef = useRef(null);
  const initialSelectedKeysRef = useRef([]);
  const tableRef = useRef(null);

  const data = Array.from({ length: 46 }, (_, i) => ({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`
  }));

  useEffect(() => {
    if (tableRef.current) {
      tableRef.current.focus();
    }
  }, []);

  // 📌 일반 클릭, Shift+클릭, Ctrl+클릭 처리
  const handleRowClick = (event, record) => {
    const { key } = record;

    if (event.shiftKey) {
      // Shift + 클릭 : 기존 기준 행부터 클릭한 행까지 확장
      const start = Math.min(anchorRowKey, key);
      const end = Math.max(anchorRowKey, key);
      setSelectedRowKeys(data.filter((item) => item.key >= start && item.key <= end).map((item) => item.key));
    } else if (event.ctrlKey || event.metaKey) {
      // Ctrl+클릭 : 기존 선택 유지하면서 선택/해제
      const isAlreadySelected = selectedRowKeys.includes(key);
      const newSelectedKeys = isAlreadySelected
        ? selectedRowKeys.filter((k) => k !== key)
        : [...selectedRowKeys, key];

      setSelectedRowKeys(newSelectedKeys);

      // **선택이 추가될 때만 기준 행 변경**
      if (!isAlreadySelected) {
        setAnchorRowKey(key);
      }
    } else {
      // 일반 클릭: 기존 선택 해제 후 클릭한 행 선택
      setSelectedRowKeys([key]);
      setAnchorRowKey(key);
    }

    setCursorRowKey(key);
  };

  // 📌 드래그 시작
  const handleMouseDown = (event, record) => {
    event.preventDefault();
    setIsDragging(true);
    dragStartKeyRef.current = record.key;
    initialSelectedKeysRef.current = selectedRowKeys;

    if (event.shiftKey) {
      setShiftDragging(true);
    } else if (event.ctrlKey || event.metaKey) {
      setCtrlDragging(true);
      setAnchorRowKey(record.key); // Ctrl-드래그 시 기준 행 변경
    } else {
      setAnchorRowKey(record.key); // 일반 드래그 시 기준 행 변경
    }
  };

  // 📌 드래그 중
  const handleMouseEnter = (event, record) => {
    if (!isDragging || dragStartKeyRef.current === null) return;

    let newSelectedKeys = [];

    const start = Math.min(dragStartKeyRef.current, record.key);
    const end = Math.max(dragStartKeyRef.current, record.key);

    if (shiftDragging) {
      // Shift-드래그: 기존 기준 행부터 드래그 종료 지점까지 선택
      newSelectedKeys = data
        .filter((item) => item.key >= anchorRowKey && item.key <= record.key)
        .map((item) => item.key);
    } else if (ctrlDragging) {
      // Ctrl-드래그: 기존 선택 유지 + 드래그한 영역 선택/해제 (Toggle)
      newSelectedKeys = [...initialSelectedKeysRef.current];

      data.forEach((item) => {
        if (item.key >= start && item.key <= end) {
          if (initialSelectedKeysRef.current.includes(item.key)) {
            newSelectedKeys = newSelectedKeys.filter((k) => k !== item.key); // 해제
          } else {
            newSelectedKeys.push(item.key); // 추가
          }
        }
      });
    } else {
      // 일반 드래그: 기존 선택 해제 후 드래그한 영역만 선택
      newSelectedKeys = data
        .filter((item) => item.key >= start && item.key <= end)
        .map((item) => item.key);
    }

    setSelectedRowKeys(newSelectedKeys);
  };

  // 📌 드래그 종료
  const handleMouseUp = () => {
    setIsDragging(false);
    setCtrlDragging(false);
    setShiftDragging(false);
    dragStartKeyRef.current = null;
  };

  return (
    <div ref={tableRef} tabIndex={0} style={{ userSelect: "none", outline: "none" }} onMouseUp={handleMouseUp}>
      <h1>Ant Design Table with Windows & Mac Keyboard Navigation</h1>
      <Table
        rowSelection={{ selectedRowKeys, type: "checkbox", fixed: true }}
        columns={[
          { title: "Name", dataIndex: "name" },
          { title: "Age", dataIndex: "age" },
          { title: "Address", dataIndex: "address" }
        ]}
        rowKey={(record) => record.key}
        dataSource={data}
        onRow={(record) => ({
          onClick: (event) => handleRowClick(event, record),
          onMouseDown: (event) => handleMouseDown(event, record),
          onMouseEnter: (event) => handleMouseEnter(event, record)
        })}
      />
    </div>
  );
};

export default TableOnRowSelect;
