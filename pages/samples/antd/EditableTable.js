import React, { useState } from "react";
import { Table, Select, Input } from "antd";
import "./EditableTable.css"; // CSS 파일로 스타일 추가

const { Option } = Select;

const EditableTable = () => {
  const [dataSource, setDataSource] = useState([
    { key: "1", name: "John", role: "Admin" },
    { key: "2", name: "Doe", role: "User" },
  ]);
  const [editingKey, setEditingKey] = useState(null); // 현재 편집 중인 행의 키
  const [focusKey, setFocusKey] = useState(null); // 현재 포커싱된 셀

  const handleRoleChange = (value, key) => {
    const updatedData = dataSource.map((row) => {
      if (row.key === key) {
        return { ...row, role: value };
      }
      return row;
    });
    setDataSource(updatedData);
  };

  const handleNameEdit = (key, value) => {
    const updatedData = dataSource.map((row) => {
      if (row.key === key) {
        return { ...row, name: value };
      }
      return row;
    });
    setDataSource(updatedData);
    setEditingKey(null); // 편집 완료 후 리셋
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) =>
        editingKey === record.key ? (
          <Input
            defaultValue={text}
            onBlur={(e) => {
              handleNameEdit(record.key, e.target.value);
              setFocusKey(null); // 포커스 해제
            }}
            onFocus={() => setFocusKey(`name-${record.key}`)} // 포커스 상태 설정
            autoFocus
          />
        ) : (
          <div
            onClick={() => setEditingKey(record.key)}
            style={{
              cursor: "pointer",
              padding: "0 11px",
            }}
          >
            {text}
          </div>
        ),
      className: (record) =>
        focusKey === `name-${record.key}` ? "focused-cell" : "", // 동적 클래스 적용
      width: "50%",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (text, record) => (
        <Select
          value={text}
          onChange={(value) => handleRoleChange(value, record.key)}
          onFocus={() => setFocusKey(`role-${record.key}`)} // 포커스 상태 설정
          onBlur={() => setFocusKey(null)} // 포커스 해제
          style={{ width: "100%" }}
          variant={ focusKey === `role-${record.key}` ? "outlined" : "borderless" }
        >
          <Option value="Admin">Admin</Option>
          <Option value="User">User</Option>
          <Option value="Guest">Guest</Option>
        </Select>
      ),
      className: (record) =>
        focusKey === `role-${record.key}` ? "focused-cell" : "", // 동적 클래스 적용
      width: "50%",
    },
  ];

  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      rowKey="key"
      pagination={false}
      rowHoverable={false}
      onCell={(record) => ({
        style: {
          // 각 셀 스타일을 적용
          padding: 0,
        },
      })}
    />
  );
};

export default EditableTable;
