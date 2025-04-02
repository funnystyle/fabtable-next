// pages/year.js
import React from "react";
import "dayjs/locale/ko";
import SearchModalNormal from "@components/calendar/year/searchModal/normal/SearchModalNormal";
import SearchModalNumber from "@components/calendar/year/searchModal/number/SearchModalNumber";
import SearchModalDate from "@components/calendar/year/searchModal/date/SearchModalDate";
import OrderOpenModalContent from "@components/modal/OrderOpenModalContent";

const SearchModalBody = ({form, searchLocation, searchType}) => {

  return (
    <>
      {(searchType === "OPEN") && (<OrderOpenModalContent form={form} searchLocation={searchLocation}/>)}
      {!(searchLocation === "cs" && searchType === "OPEN") &&
        <>
          <SearchModalNormal form={form} title={"일반"} order={1} searchLocation={searchLocation} searchDiv={"NORMAL"}/>
          <SearchModalNumber form={form} title={"숫자/수치"} order={2} searchLocation={searchLocation} searchDiv={"NUMBER"}/>
          <SearchModalDate form={form} title={"기간/날짜"} order={3} searchLocation={searchLocation} searchDiv={"DATE"}/>
          <SearchModalNormal form={form} title={"작업자"} order={4} searchLocation={searchLocation} searchDiv={"WORKER"}/>
        </>
      }
    </>
  );
};


export default SearchModalBody;
