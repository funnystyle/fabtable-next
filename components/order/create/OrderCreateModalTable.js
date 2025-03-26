// pages/order.js
import React, { useEffect, useState } from "react";
import TableOnRowSelect2 from "@components/TableOnRowSelect2";
import OrderListHeaderData from "@components/order/list/OrderListHeaderData";
import useModalStore from "@store/useModalStore";
import { transformTagData } from "@components/order/table/transformTagData";
import { useGetRecords } from "@components/api/useGetRecords";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { Modal } from "antd";
import useRecordDataStore from "@store/useRecordDataStore";

const OrderCreateModalTable = ({ contentHeight }) => {

	const [headerList, setHeaderList] = useState([]);

	const { size, data, setSize, setOpenSearchModal } = useModalStore();

	const { handleReload } = useGetRecords();

	useEffect(() => {
		handleReload();
	}, []);

	const [modal, contextHolder] = Modal.useModal();
	const { setRecord } = useRecordDataStore();
	const handleConfirmEdit = (record) => {
		modal.confirm({
			title: "수주 정보 불러오기",
			icon: <ExclamationCircleFilled style={{ color: "#FAAD14" }} />,
			content:
				"해당 정보를 불러오시겠습니까? ",
			okText: "확인",
			cancelText: "취소",
			onOk() {
				record.nowState = record.nowState.props.children
				setRecord(record);
				setOpenSearchModal(false);
			},
			onCancel() {
				console.log("수정 취소");
			},
		});
	};

	const onRowClick = (record) => {
		handleConfirmEdit(record);
	}

	return (
		<>
			{/* 태그 없음, 헤더 관련 정리 event */}
			<OrderListHeaderData setHeaderList={setHeaderList} headerDiv={"SALES"}/>
			<div style={{ marginTop: contentHeight }} className="contents-scroll">
				{/* 테이블 */}
				<TableOnRowSelect2 header={headerList} serverData={transformTagData(data)} size={size} setSize={setSize} onRowClick={onRowClick} rowSelect={false}/>
			</div>

			{contextHolder}
		</>
	);
};

export default OrderCreateModalTable;
