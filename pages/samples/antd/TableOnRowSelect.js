"use client"; // Next.js 클라이언트 컴포넌트

import React, { useState, useRef, useEffect } from "react";
import { Table } from "antd";

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
    if (tableRef.current) {
      tableRef.current.focus();
    }

    const handleKeyDown = (event) => {
      if (!document.activeElement || document.activeElement !== tableRef.current) return;

      let newSelectedKeys = [...selectedRowKeys];

      // ✅ 현재 페이지에서 시작되는 index 계산
      const pageStartIndex = (currentPage - 1) * pageSize;
      const pageEndIndex = Math.min(pageStartIndex + pageSize - 1, data.length - 1);

      let currentIndex = cursorRowKey !== null ? data.findIndex((item) => item.key === cursorRowKey) : -1;

      if (event.key === "ArrowUp" || event.key === "ArrowDown") {
          event.preventDefault();
          const isUp = event.key === "ArrowUp";
          let newIndex;

          // ✅ 선택된 행이 없는 경우, 첫 번째 행 자동 선택
          if (selectedRowKeys.length === 0) {
              newIndex = pageStartIndex; // 현재 페이지 첫 번째 행
          } else {
              newIndex = isUp ? currentIndex - 1 : currentIndex + 1;
          }

          // ✅ 현재 페이지 범위를 벗어나지 않도록 제한
          if (newIndex < pageStartIndex || newIndex > pageEndIndex) {
              return; // 🔥 이동하지 않고 그대로 유지
          }

          let newKey = data[newIndex].key;

          if (event.shiftKey) {
              const start = Math.min(anchorRowKey, newKey);
              const end = Math.max(anchorRowKey, newKey);
              newSelectedKeys = data.filter((item) => item.key >= start && item.key <= end).map((item) => item.key);
          } else {
              newSelectedKeys = [newKey];
              setAnchorRowKey(newKey);
          }

          setCursorRowKey(newKey);
          setSelectedRowKeys(newSelectedKeys);
      } else if (event.key === "Escape") {
          event.preventDefault();
          setSelectedRowKeys([]);
          setAnchorRowKey(null);
          setCursorRowKey(null);
          setTimeout(() => {
              setSelectedRowKeys([]);
          }, 0);
      } else if ((event.ctrlKey || event.metaKey) && event.key === "a") {
          event.preventDefault();
          newSelectedKeys = data.slice(pageStartIndex, pageEndIndex + 1).map((item) => item.key);
          setSelectedRowKeys(newSelectedKeys);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [selectedRowKeys, anchorRowKey, cursorRowKey, data, currentPage]);

  const handleRowClick = (event, record) => {
    const { key } = record;

    if (event.shiftKey) {
      const start = Math.min(anchorRowKey, key);
      const end = Math.max(anchorRowKey, key);
      setSelectedRowKeys(data.filter((item) => item.key >= start && item.key <= end).map((item) => item.key));
    } else if (event.ctrlKey || event.metaKey) {
      const isAlreadySelected = selectedRowKeys.includes(key);
      const newSelectedKeys = isAlreadySelected
        ? selectedRowKeys.filter((k) => k !== key)
        : [...selectedRowKeys, key];

      setSelectedRowKeys(newSelectedKeys);
      if (!isAlreadySelected) {
        setAnchorRowKey(key);
      }
    } else {
      setSelectedRowKeys([key]);
      setAnchorRowKey(key);
    }

    setCursorRowKey(key);
  };

  const handleMouseDown = (event, record) => {
    event.preventDefault();
    setIsDragging(true);
    dragStartKeyRef.current = record.key;
    initialSelectedKeysRef.current = [...selectedRowKeys];

    if (event.shiftKey) {
      setShiftDragging(true);
    } else if (event.ctrlKey || event.metaKey) {
      setCtrlDragging(true);
      setAnchorRowKey(record.key);
    } else {
      setAnchorRowKey(record.key);
    }
  };

  const handleMouseEnter = (event, record) => {
    if (!isDragging || dragStartKeyRef.current === null) return;

    let newSelectedKeys = [...selectedRowKeys];
    const start = Math.min(anchorRowKey, record.key);
    const end = Math.max(anchorRowKey, record.key);

    if (shiftDragging) {
        newSelectedKeys = data.filter((item) => item.key >= Math.min(anchorRowKey, record.key) && item.key <= Math.max(anchorRowKey, record.key)).map((item) => item.key);
    } else {
        newSelectedKeys = data.filter((item) => item.key >= start && item.key <= end).map((item) => item.key);
    }

    setSelectedRowKeys([...newSelectedKeys]);
    dragEndKeyRef.current = record.key;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setCtrlDragging(false);
    setShiftDragging(false);
    dragStartKeyRef.current = null;

    setSelectedRowKeys([...selectedRowKeys]);

    if (dragEndKeyRef.current !== null) {
        setCursorRowKey(dragEndKeyRef.current);
    }
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
