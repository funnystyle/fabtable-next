// pages/year.js
import React from "react";
import "dayjs/locale/ko";
import SearchModalNormal from "@components/calendar/year/searchModal/normal/SearchModalNormal";
import SearchModalNumber from "@components/calendar/year/searchModal/number/SearchModalNumber";
import SearchModalDate from "@components/calendar/year/searchModal/date/SearchModalDate";
import OrderOpenModalContent from "@components/modal/OrderOpenModalContent";

const SearchModalBody = ({form, searchLocation, searchType, inBoxType}) => {

  return (
    <>
      {inBoxType !== null && (<OrderOpenModalContent form={form} searchLocation={searchLocation} inBoxType={inBoxType}/>)}
      {!(searchLocation === "cs" && (searchType === "OPEN" || searchType === "HISTORY" || searchType === "HISTORY_DETAIL")) &&
        <>
          <SearchModalNormal form={form} title={"일반"} order={1} searchLocation={searchLocation} searchDiv={"NORMAL"}/>
          <SearchModalNumber form={form} title={"숫자/수치"} order={2} searchLocation={searchLocation} searchType={searchType} searchDiv={"NUMBER"}/>
          <SearchModalDate form={form} title={"기간/날짜"} order={3} searchLocation={searchLocation} searchType={searchType} searchDiv={"DATE"}/>
          <SearchModalNormal form={form} title={"작업자"} order={4} searchLocation={searchLocation} searchDiv={"WORKER"}/>
        </>
      }
    </>
  );
};


export default SearchModalBody;
