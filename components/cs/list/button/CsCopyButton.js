// pages/order/create/index.js
import React from "react";
import { Button, message, } from "antd";
import useCsDataStore from "@store/useCsDataStore";
import useMenuTabStore from "@store/useMenuTabStore";
import { useRouter } from "next/router";
import useTableSelectKeysCsListStore from "@store/useTableSelectKeysCsListStore";
import { handleCsCopy } from "@components/cs/list/button/handleCsCopy";

const CsCopyButton = () => {

  const { moveUrl } = useMenuTabStore();
  const router = useRouter();

  return (
    <Button onClick={() => handleCsCopy(useTableSelectKeysCsListStore, moveUrl, useCsDataStore, router)}>C/S 복제하기</Button>
  );
};

export default CsCopyButton;
