// pages/order/create/index.js
import React, { useEffect, useState } from "react";
import { Button, Flex, Tag, } from "antd";
import useModalStore from "@store/useModalStore";

const OrderListSearchTags = () => {

  const { formData, setDeleteTagKeyName } = useModalStore();

  const [tags, setTags] = useState([]);
  // 개별 태그 삭제 핸들러
  const handleTagClose = (tagToRemove) => {
    // setTags((prevTags) => prevTags.filter((tag) => tag !== tagToRemove));
    setDeleteTagKeyName(tagToRemove.key);
  };

  const handleTagDeleteAll = () => {
    setTags([]);
  };

  function parseSearchInputs(data) {
    const result = [];

    // 키들을 순회
    for (const key in data) {
      // radio나 select 항목은 제외
      if (key.includes('radio') || key.includes('select')) continue;

      // 키에서 search 위치 추출 (ex: search-1-1-input → search-1-1)
      const match = key.match(/(search-\d+-\d+)-input?$/);
      if (!match) continue;

      const baseKey = match[1];      // search-1-1
      const isSecond = !!match[2];   // input2 여부

      if (!data[key]) continue;
      // 값 병합 처리
      if (Array.isArray(data[key])) {
        // 날짜 범위
        const [start, end] = data[key].map(date =>
          date.format('YYYY-MM-DD HH:mm')
        );
        result.push({ key: baseKey, label: `${start} ~ ${end}` });
      } else if (data[key + 2]) {
        // input2 처리 (기존 값이 존재할 때만)
        result.push({ key: baseKey, label: ` ${data[key]} ~ ${data[key + 2]}` });
      } else {
        // input 처리
        result.push({ key: baseKey, label: data[key] });
      }
    }

    return result;
  }

  useEffect(() => {
    setTags(parseSearchInputs(formData));
  }, [formData]);

  return (
    <>
      {tags.length > 0 && (
        <Flex align="center" className="search-result-area">
          <strong className="tit-search-result">검색결과 :</strong>

          {tags.map((tag, index) => (
            <Tag key={index} closeIcon onClose={() => handleTagClose(tag)}>
              {tag.label}
            </Tag>
          ))}

          <Button
            color="primary"
            variant="text"
            size="small"
            className="all-delete-tag"
            onClick={handleTagDeleteAll}
          >
            모두 삭제
          </Button>
        </Flex>
      )}
    </>
  );
};

export default OrderListSearchTags;
