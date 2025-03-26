// pages/order/create/index.js
import React, {useEffect, useState} from "react";
import {Button, Flex, Tag,} from "antd";
import useCsSearchModalStore from "@store/useCsSearchModalStore";

const CsListSearchTags = () => {

  const { formData, setDeleteTagKeyName } = useCsSearchModalStore();

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
    const grouped = {};

    // Step 1: search-X-Y 그룹별로 묶기
    for (const key in data) {
      const match = key.match(/(search-\d+-\d+)-(.+)/); // ex) search-1-2-input
      if (!match) continue;

      const baseKey = match[1]; // search-1-2
      const suffix = match[2];  // input, radio, select 등

      if (!grouped[baseKey]) {
        grouped[baseKey] = {};
      }

      grouped[baseKey][suffix] = data[key];
    }

    // Step 2: 정렬된 순서로 key 처리
    const sortedKeys = Object.keys(grouped).sort((a, b) => {
      const [_, a1, a2] = a.match(/search-(\d+)-(\d+)/).map(Number);
      const [__, b1, b2] = b.match(/search-(\d+)-(\d+)/).map(Number);
      return a1 - b1 || a2 - b2;
    });

    // Step 3: 결과 생성
    const result = [];

    for (const baseKey of sortedKeys) {
      const item = grouped[baseKey];
      if (!item.input && !item.input2) {
        continue;
      } // 값이 없는 경우 제외

      let label = '';

      if (Array.isArray(item.input)) {
        // 날짜 범위 (ex. DatePicker)
        const [start, end] = item.input.map(date =>
          date.format('YYYY-MM-DD HH:mm')
        );
        label = `${start} ~ ${end}`;
      } else if (item.input && item.input2) {
        label = `${item.input} ~ ${item.input2}`;
      } else if (item.input) {
        label = item.input;
      }

      result.push({
        key: baseKey,
        label: label
      });
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
            <Tag key={index} closeIcon onClose={(e) => {
              e.preventDefault();
              handleTagClose(tag);
            }}>
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

export default CsListSearchTags;
