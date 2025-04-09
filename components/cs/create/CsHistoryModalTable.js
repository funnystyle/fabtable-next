// pages/order.js
import React, { useEffect, useRef, useState } from "react";
import TableOnRowSelect2 from "@components/TableOnRowSelect2";
import { transformTagData } from "@components/order/table/transformTagData";
import { CheckOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import { Button, Flex, Form, message, Modal, Spin } from "antd";
import useCsDataStore from "@store/useCsDataStore";
import CsListHeaderData from "@components/cs/list/CsListHeaderData";
import PagingArea from "@components/list/PagingArea";
import { useGetRecordsJoinCS } from "@components/api/useGetRecordsJoinCS";
import useMenuTabStore from "@store/useMenuTabStore";
import { useRouter } from "next/router";
import useTableSelectKeysStore from "@store/useTableSelectKeysStore";
import useTableSelectKeysCsListStore from "@store/useTableSelectKeysCsListStore";
import { handleRecordInfoPopup } from "@components/popup/handleOpenPopup";

const CsHistoryModalTable = ({ form, modalStore }) => {

  const { data, setOpenSearchModal, reload } = modalStore();
  const { handleReload, isPending } = useGetRecordsJoinCS(modalStore, true, false);

  const [headerList, setHeaderList] = useState([]);

  const [modal, contextHolder] = Modal.useModal();
  const { moveUrl } = useMenuTabStore();
  const { setCs, setIsCopy, setTagInfoList } = useCsDataStore();
  const router = useRouter();
  const handleConfirmEdit = (record) => {
    if (!record.id) {
      message.error("해당 정보가 없습니다.");
      return;
    }

    modal.confirm({
      title: "CS 정보 불러오기",
      icon: <ExclamationCircleFilled style={{ color: "#FAAD14" }} />,
      content:
        "해당 정보를 불러오시겠습니까? ",
      okText: "확인",
      cancelText: "취소",
      onOk() {
        // record.nowState = record.nowState.props.children
        setCs(record);
        setIsCopy(false);
        setOpenSearchModal(false);
        moveUrl("/cs/create");
        router.push("/cs/create");
      },
      onCancel() {
        console.log("수정 취소");
      },
      centered: true,
    });
  };

  const onRowClick = (record) => {
    handleConfirmEdit(record);
  }

  const onRecordInfoClick = (e, cs) => {
    e.stopPropagation();
    const data = {
      id: cs.recordId,
      serialNumber: cs.serialNumber,
    }
    handleRecordInfoPopup(window, [data]);
  }

  useEffect(() => {
    setTagInfoList(data?.tagInfoList || []);
  }, [data]);

  const { datas } = useTableSelectKeysCsListStore();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (datas.length > 0) {
      const data = datas[0];
      const oldSerialNumber = data.oldSerialNumber;
      const serialNumber = data.serialNumber;
      const csNumber = data.csNumber;
      form.setFieldsValue({ oldSerialNumber, serialNumber, csNumber });

      setTimeout(() => {
        reload();
        setTimeout(() => {
          setLoading(false);
        }, 100);
      }, 500);
    }
  }, [datas]);

  // const csNumberWatch = Form.useWatch("csNumber", form);
  // const oldSerialNumberWatch = Form.useWatch("oldSerialNumber", form);
  // const serialNumberWatch = Form.useWatch("serialNumber", form);
  // const firstChanged = useRef(false);
  //
  // useEffect(() => {
  //   // csNumber가 변경되었고, 아직 최초 변경을 처리하지 않은 경우
  //   if (!firstChanged.current && csNumberWatch !== undefined && oldSerialNumberWatch !== undefined && serialNumberWatch !== undefined) {
  //     firstChanged.current = true;
  //     reload();
  //   }
  // }, [oldSerialNumberWatch, serialNumberWatch, csNumberWatch]);

  return (
    <>
      <Spin spinning={loading} style={{ textAlign: "center" }}>
        <PagingArea modalStore={modalStore} keysStore={useTableSelectKeysStore} />

        {/* 태그 없음, 헤더 관련 정리 event */}
        <CsListHeaderData setHeaderList={setHeaderList} headerDiv={"CS_LOAD"} />
        <div className="contents-scroll">
          {/* 테이블 */}
          <TableOnRowSelect2 header={headerList} onRowClick={onRowClick} rowSelect={false} isPending={isPending} isFirstLoad={false} keysStore={useTableSelectKeysStore} modalStore={modalStore}
                             serverData={transformTagData(data).map((item) => {
                               item.etc_cs_load = (
                                 <>
                                   <Flex gap={4}>
                                     {/*<Button size="small">C/S정보</Button>*/}
                                     <Button size="small" onClick={(e) => onRecordInfoClick(e, item)}>수주정보</Button>
                                     <Button size="small" icon={<CheckOutlined />} iconPosition="start">
                                       선택
                                     </Button>
                                   </Flex>
                                 </>
                               );
                               return item;
                             })}
          />
        </div>
      </Spin>

      {contextHolder}
    </>
  );
};

export default CsHistoryModalTable;
