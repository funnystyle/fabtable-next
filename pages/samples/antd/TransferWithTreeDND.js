"use client";

import React, { useEffect, useState } from "react";
import { Transfer, Tree } from "antd";

export default function TransferWithTreeDND() {
  const [dataSource] = useState([
    { key: "1", title: "Item 1" },
    { key: "2", title: "Item 2" },
    { key: "3", title: "Item 3" },
    { key: "4", title: "Item 4" },
  ]);

  // ✅ 오른쪽(Target) 리스트에 있는 항목들의 key 배열
  const [targetKeys, setTargetKeys] = useState([]);
  const [targetData, setTargetData] = useState([]);
  
  // ✅ 선택된 항목을 저장하여 `<` 및 `>` 버튼이 활성화되도록 함
  const [selectedKeys, setSelectedKeys] = useState([]);

  // ✅ Transfer의 onChange 핸들러 (왼쪽 → 오른쪽 이동)
  const handleChange = (newTargetKeys) => {
    setTargetKeys(newTargetKeys);
    setSelectedKeys([]); // ✅ 이동 후 선택 해제
  };

  // ✅ 오른쪽 리스트 데이터 업데이트 (targetKeys 기준)
  useEffect(() => {
    let newTargetData = targetKeys.map((key) =>
      dataSource.find((item) => item.key === key)
    );
    setTargetData(newTargetData);
  }, [targetKeys]);

  // ✅ Drag & Drop으로 오른쪽 리스트의 순서 변경
  const onDrop = (info) => {
    const { dragNode, node } = info;
    const draggedKey = dragNode.key;
    const targetKey = node.key;

    const draggedIndex = targetData.findIndex((item) => item.key === draggedKey);
    const targetIndex = targetData.findIndex((item) => item.key === targetKey);

    if (draggedIndex !== -1 && targetIndex !== -1) {
      const newTargetData = [...targetData];
      const [movedItem] = newTargetData.splice(draggedIndex, 1);
      newTargetData.splice(targetIndex, 0, movedItem);
      setTargetKeys(newTargetData.map((item) => item.key));
    }
  };

  // ✅ 왼쪽 & 오른쪽 리스트의 체크 상태를 관리하여 버튼 활성화
  const handleSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]); // ✅ 왼쪽 & 오른쪽 체크된 항목 저장
  };

  return (
    <div>
      <Transfer
        dataSource={dataSource}
        targetKeys={targetKeys}
        selectedKeys={selectedKeys} // ✅ 선택된 항목을 `selectedKeys`에 반영
        onChange={handleChange}
        onSelectChange={handleSelectChange} // ✅ 왼쪽 & 오른쪽 체크 처리
        render={(item) => item.title}
        listStyle={{ width: 250, height: 300 }}
      >
        {({ direction }) =>
          direction === "right" ? (
            <Tree
              treeData={targetData}
              draggable
              blockNode
              checkable
              checkedKeys={selectedKeys.filter(key => targetKeys.includes(key))} // ✅ 오른쪽 리스트에서 체크된 항목만 반영
              onCheck={(checked) => setSelectedKeys([...checked, ...selectedKeys.filter(key => !targetKeys.includes(key))])} // ✅ 오른쪽 체크 상태 업데이트
              onDrop={onDrop}
              defaultExpandAll
            />
          ) : null
        }
      </Transfer>
    </div>
  );
}
