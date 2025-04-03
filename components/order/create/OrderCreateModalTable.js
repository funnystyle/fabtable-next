// pages/order.js
import React, { useEffect, useState } from "react";
import TableOnRowSelect2 from "@components/TableOnRowSelect2";
import OrderListHeaderData from "@components/order/list/OrderListHeaderData";
import { transformTagData } from "@components/order/table/transformTagData";
import { CheckOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import { Button, Flex, Modal } from "antd";
import useRecordDataStore from "@store/useRecordDataStore";
import PagingArea from "@components/list/PagingArea";
import { useGetRecords } from "@components/api/useGetRecords";

const OrderCreateModalTable = ({ modalStore }) => {

	const { page, size, total, totalPages, data, setPage, setSize, setOpenSearchModal } = modalStore();
	const { isPending } = useGetRecords(modalStore, true, false);

	const [headerList, setHeaderList] = useState([]);

	const [modal, contextHolder] = Modal.useModal();
	const { setRecord, setTagInfoList, setIsCopy } = useRecordDataStore();
	const handleConfirmEdit = (record) => {
		modal.confirm({
			title: "수주 정보 불러오기",
			icon: <ExclamationCircleFilled style={{ color: "#FAAD14" }} />,
			content:
				"해당 정보를 불러오시겠습니까? ",
			okText: "확인",
			cancelText: "취소",
			onOk() {
				setRecord(record);
				setIsCopy(false);
				setOpenSearchModal(false);
			},
			onCancel() {
				console.log("수정 취소");
			},
			centered: true,
		});
	};

	const onRowClick = (record) => {
		console.log("record click", record);

		handleConfirmEdit(record);
	}

	useEffect(() => {
		setTagInfoList(data?.tagInfoList || []);
	}, [data]);

	return (
		<>
			<PagingArea page={page} size={size} total={total} totalPages={totalPages} setPage={setPage} setSize={setSize} />

			{/* 태그 없음, 헤더 관련 정리 event */}
			<OrderListHeaderData setHeaderList={setHeaderList} headerDiv={"SALES_LOAD"}/>
			<div className="contents-scroll">
				{/* 테이블 */}
				<TableOnRowSelect2 header={headerList} serverData={transformTagData(data).map((item) => {
					item.remark_sales_load=(
						<>
							<Flex gap={4}>
								<Button size="small">수주정보</Button>
								<Button size="small" icon={<CheckOutlined />} iconPosition="start">
									선택
								</Button>
							</Flex>
						</>
					);
					return item;
				})
				} size={size} setSize={setSize} onRowClick={onRowClick} rowSelect={false}
				isPending={isPending} isFirstLoad={false}
				/>
			</div>

			{contextHolder}
		</>
	);
};

export default OrderCreateModalTable;
