import React from "react";
import { Table } from "antd";

export default function FixedLeftTable() {
  const columns = [
    {
      title: "이름",
      dataIndex: "name",
      key: "name",
      fixed: "left", // ✅ 왼쪽 고정
      width: 120,
    },
    {
      title: "나이",
      dataIndex: "age",
      key: "age",
      width: 100,
    },
    {
      title: "주소",
      dataIndex: "address",
      key: "address",
      width: 300,
    },
    {
      title: "이메일",
      dataIndex: "email",
      key: "email",
      width: 200,
    },
    {
      title: "전화번호",
      dataIndex: "phone",
      key: "phone",
      width: 200,
    },
    {
      title: "회사",
      dataIndex: "company",
      key: "company",
      width: 200,
    },
  ];

  const data = [
    {
      key: "1",
      name: "홍길동",
      age: 32,
      address: "서울특별시 강남구",
      email: "hong@example.com",
      phone: "010-1234-5678",
      company: "ABC Corp",
    },
    {
      key: "2",
      name: "이순신",
      age: 45,
      address: "부산광역시 해운대구",
      email: "lee@example.com",
      phone: "010-9876-5432",
      company: "XYZ Inc",
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      scroll={{ x: 1000 }} // ✅ 가로 스크롤 활성화
      bordered
    />
  );
}
