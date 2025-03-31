import React, {useEffect, useState} from "react";
import ModalBoxRow from "@components/modal/ModalBoxRow";
import {useQuery} from "@tanstack/react-query";
import {getAxios} from "@api/apiClient";
import {Button, Flex, Form, Input, Pagination, Table} from "antd";
import {CheckOutlined, LeftOutlined, RedoOutlined, RightOutlined, SettingOutlined, VerticalLeftOutlined, VerticalRightOutlined} from "@ant-design/icons";

const columns = [
];
const data = [
];

const OrderOpenModalRecordList = () => {

  const [current, setCurrent] = useState(2);
  const [inputValue, setInputValue] = useState("2");
  const onChange = (page) => {
    console.log(page);
  }
  const totalItems = 50;
  const totalPages = Math.ceil(totalItems / 10);

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
      setCurrent(pageNumber);
    } else {
      setInputValue(current.toString());
    }
  };

  // 커스터마이즈된 버튼 렌더링
  const itemRender = (page, type, originalElement) => {
    if (type === "prev") {
      return <LeftOutlined />;
    }
    if (type === "next") {
      return <RightOutlined />;
    }
    if (type === "page" && page === current) {
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

  const handleChange = (pagination, filters, sorter = {}) => {
    console.log("Various parameters", pagination, filters, sorter);
  };

  return (
    <div className="search-tb-area">
      <Flex
        align="center"
        justify="space-between"
        style={{
          marginBottom: 16,
        }}
      >
        <Flex gap="small" align="center">
          <Flex gap="small" className="list-num">
            총 <strong>12</strong> 건
          </Flex>
        </Flex>

        <Flex align="center" className="paging-area">
          <button
            onClick={() => onChange(1)}
            disabled={current === 1}
            className="btn-page"
          >
            <VerticalRightOutlined />
          </button>

          <Pagination
            simple
            current={current}
            total={totalItems}
            onChange={onChange}
            itemRender={itemRender}
            showSizeChanger={false}
          />

          {/* 맨 뒤로 */}
          <button
            onClick={() => onChange(totalPages)}
            disabled={current === totalPages}
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

          <Button>
            <SettingOutlined />
          </Button>
        </Flex>
      </Flex>

      {/* 테이블 */}
      <div className="tb-container">
        <Table
          columns={columns}
          dataSource={data}
          onChange={handleChange}
          pagination={false}
          size="small"
          className="ellipsis-column basic-tb"
          bordered
          scroll={{
            y: "186px",
          }}
          style={{ tableLayout: "fixed" }}
        />
      </div>
    </div>
  );
}

export default OrderOpenModalRecordList;