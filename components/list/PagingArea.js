// pages/order/create/index.js
import React, { useState } from "react";
import { Button, Dropdown, Flex, Input, Pagination, Space, } from "antd";
import { LeftOutlined, RedoOutlined, RightOutlined, SettingOutlined, VerticalLeftOutlined, VerticalRightOutlined } from "@ant-design/icons";
import { lineItems } from "@data/lineItems";
import useTableSelectKeysStore from "@store/useTableSelectKeysStore";

const PagingArea = ({ page, size, total, totalPages, setPage, setSize }) => {

  const {selectedRowKeys, setSelectedRowKeys, setAnchorRowKey, setCursorRowKey} = useTableSelectKeysStore();

  const [inputValue, setInputValue] = useState(page);

  // 페이지 변경 핸들러
  const onChange = (page) => {
    setPage(page);
    setInputValue(page.toString());
    setSelectedRowKeys([]);
    setCursorRowKey(null);
    setAnchorRowKey(null);
  };

  // Input 핸들러
  const handleInputChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setInputValue(value);
    }
  };

  // Input 엔터 및 포커스 아웃 핸들러
  const handleInputConfirm = () => {
    const pageNumber = Number(inputValue);
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setPage(pageNumber);
    } else {
      setInputValue(page.toString());
    }
  };

  const handleLineItemsClick = (e) => {
    // e.key 를 integer 로 변환하여 pageSize 로 설정
    setSize(parseInt(e.key, 10));
  };

  // 커스터마이즈된 버튼 렌더링
  const itemRender = (pag, type, originalElement) => {
    if (type === "prev") {
      return <LeftOutlined />;
    }
    if (type === "next") {
      return <RightOutlined />;
    }
    if (type === "page" && pag === page) {
      return (
        <Input
          style={{ width: 50, textAlign: "center" }}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
          size="small"
        />
      );
    }
    return originalElement;
  };

  return (
    <Flex align="center" justify="space-between">
      <Flex gap="small" align="center">
        <Flex gap="small" className="list-num">
          총 <span>{total}</span>
        </Flex>

        <Flex gap="small" className="list-num">
          <strong>{selectedRowKeys.length}</strong> 건 선택
        </Flex>
      </Flex>

      <Flex align="center" className="paging-area">
        <button
          onClick={() => onChange(1)}
          disabled={page === 1}
          className="btn-page"
        >
          <VerticalRightOutlined />
        </button>

        <Pagination
          simple
          current={page}
          total={total}
          pageSize={size}
          onChange={onChange}
          itemRender={itemRender}
          showSizeChanger={false}
        />

        {/* 맨 뒤로 */}
        <button
          onClick={() => onChange(totalPages)}
          disabled={page === totalPages}
          className="btn-page"
        >
          <VerticalLeftOutlined />
        </button>
      </Flex>

      <Flex gap="small" align="center">
        <Button
          icon={<RedoOutlined />}
          target="_blank"
          className="icon-redo"
        />

        <Dropdown menu={{ items: lineItems, onClick: handleLineItemsClick }}>
          <Button>
            <Space>
              <SettingOutlined />
            </Space>
          </Button>
        </Dropdown>
      </Flex>
    </Flex>
  );
};

export default PagingArea;
