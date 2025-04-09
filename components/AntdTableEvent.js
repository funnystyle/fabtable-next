
import React, { useState, useRef, useEffect } from "react";
import { Table } from "antd";

export const focusTable = (tableRef) => {
  if (tableRef.current) {
    tableRef.current.focus({ preventScroll: true });
  }
}

export const handleKeyDownAntd = (event, data, document, tableRef,
                              currentPage, pageSize,
                              selectedRowKeys, setSelectedRowKeys,
                              anchorRowKey, setAnchorRowKey,
                              cursorRowKey, setCursorRowKey, datas, setDatas ) => {
      if (!document.activeElement || document.activeElement !== tableRef.current) return;

      let newSelectedKeys = [...selectedRowKeys];
      let newDatas = [...datas];

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
              newDatas = data.filter((item) => item.key >= start && item.key <= end);
          } else {
              newSelectedKeys = [newKey];
              newDatas = [data[newIndex]];
              setAnchorRowKey(newKey);
          }

          setCursorRowKey(newKey);
          setSelectedRowKeys(newSelectedKeys);
          setDatas(newDatas);
      } else if (event.key === "Escape") {
          event.preventDefault();
          setSelectedRowKeys([]);
          setAnchorRowKey(null);
          setCursorRowKey(null);
          setTimeout(() => {
              setSelectedRowKeys([]);
          }, 0);
      } else if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'a') {
          event.preventDefault();
          newSelectedKeys = data.slice(pageStartIndex, pageEndIndex + 1).map((item) => item.key);
          newDatas = data.slice(pageStartIndex, pageEndIndex + 1);
          setSelectedRowKeys(newSelectedKeys);
          setDatas(newDatas);


      }
    };

export const handleRowClickAntd = (event, record, props) => {
  const {selectedRowKeys, setSelectedRowKeys, anchorRowKey, setAnchorRowKey, cursorRowKey, setCursorRowKey, isDragging, setIsDragging, ctrlDragging, setCtrlDragging, shiftDragging, setShiftDragging, dragStartKeyRef, dragEndKeyRef, initialSelectedKeysRef, data, datas, setDatas} = props;
    const { key } = record;

    if (event.shiftKey) {
      const start = Math.min(anchorRowKey, key);
      const end = Math.max(anchorRowKey, key);
      setSelectedRowKeys(data.filter((item) => item.key >= start && item.key <= end).map((item) => item.key));
      setDatas(data.filter((item) => item.key >= start && item.key <= end));
    } else if (event.ctrlKey || event.metaKey) {
      const isAlreadySelected = selectedRowKeys.includes(key);
      const newSelectedKeys = isAlreadySelected
        ? selectedRowKeys.filter((k) => k !== key)
        : [...selectedRowKeys, key];
      const newDatas = isAlreadySelected
        ? datas.filter((item) => item.key !== key)
        : [...datas, record];

      setSelectedRowKeys(newSelectedKeys);
      setDatas(newDatas);
      if (!isAlreadySelected) {
        setAnchorRowKey(key);
      }
    } else {
      setSelectedRowKeys([key]);
      setDatas([record]);
      setAnchorRowKey(key);
    }

    setCursorRowKey(key);
  };

export const handleMouseDownAntd = (event, record, props) => {
  const {selectedRowKeys, setSelectedRowKeys, anchorRowKey, setAnchorRowKey, cursorRowKey, setCursorRowKey, isDragging, setIsDragging, ctrlDragging, setCtrlDragging, shiftDragging, setShiftDragging, dragStartKeyRef, dragEndKeyRef, initialSelectedKeysRef, data} = props;
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

export const handleMouseEnterAntd = (event, record, props) => {
  const {selectedRowKeys, setSelectedRowKeys, anchorRowKey, setAnchorRowKey, cursorRowKey, setCursorRowKey, isDragging, setIsDragging, ctrlDragging, setCtrlDragging, shiftDragging, setShiftDragging, dragStartKeyRef, dragEndKeyRef, initialSelectedKeysRef, data, datas, setDatas} = props;
    if (!isDragging || dragStartKeyRef.current === null) return;

    let newSelectedKeys = [...selectedRowKeys];
    let newDatas = [...datas];
    const start = Math.min(anchorRowKey, record.key);
    const end = Math.max(anchorRowKey, record.key);

    if (shiftDragging) {
        newSelectedKeys = data.filter((item) => item.key >= Math.min(anchorRowKey, record.key) && item.key <= Math.max(anchorRowKey, record.key)).map((item) => item.key);
        newDatas = data.filter((item) => item.key >= Math.min(anchorRowKey, record.key) && item.key <= Math.max(anchorRowKey, record.key));
    } else {
        newSelectedKeys = data.filter((item) => item.key >= start && item.key <= end).map((item) => item.key);
        newDatas = data.filter((item) => item.key >= start && item.key <= end);
    }

    setSelectedRowKeys([...newSelectedKeys]);
    setDatas([...newDatas]);

    dragEndKeyRef.current = record.key;
  };

export const handleMouseUpAntd = (props) => {
    const {selectedRowKeys, setSelectedRowKeys, anchorRowKey, setAnchorRowKey, cursorRowKey, setCursorRowKey, isDragging, setIsDragging, ctrlDragging, setCtrlDragging, shiftDragging, setShiftDragging, dragStartKeyRef, dragEndKeyRef, initialSelectedKeysRef, data, datas, setDatas} = props;
    setIsDragging(false);
    setCtrlDragging(false);
    setShiftDragging(false);
    dragStartKeyRef.current = null;

    setSelectedRowKeys([...selectedRowKeys]);
    setDatas([...datas]);

    if (dragEndKeyRef.current !== null) {
        setCursorRowKey(dragEndKeyRef.current);
    }
  };
