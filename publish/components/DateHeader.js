"use client";

import React, { useEffect, useState } from "react";

// 날짜 포맷 함수
const getTodayFormatted = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();
  const weekNames = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
  const dayName = weekNames[today.getDay()];
  return {
    full: `${year}년 ${month}월 ${date}일`, // (${dayName})`,
    dayName,
  };
};

const DateHeader = () => {
  const [today, setToday] = useState(getTodayFormatted());

  useEffect(() => {
    const now = new Date();
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const msUntilMidnight = tomorrow.getTime() - now.getTime();

    // 자정까지 타이머 설정
    const timeout = setTimeout(() => {
      setToday(getTodayFormatted());

      // 그 이후에는 매일 24시간마다 갱신
      setInterval(() => {
        setToday(getTodayFormatted());
      }, 24 * 60 * 60 * 1000);
    }, msUntilMidnight);

    return () => clearTimeout(timeout); // cleanup
  }, []);

  return (
    <div className="h-txt-area">
      <strong>활기찬 {today.dayName}!</strong>
      <span className="date">{today.full}</span>
    </div>
  );
};

export default DateHeader;
