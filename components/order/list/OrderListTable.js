// pages/order.js
import React, { useState } from "react";
import { Dropdown, Spin, } from "antd";
import TableOnRowSelect2 from "@components/TableOnRowSelect2";
import { orderListRightItem } from "@components/order/list/data/orderListRightItem";
import OrderListHeaderData from "@components/order/list/OrderListHeaderData";
import useRecordModalStore from "@store/useRecordModalStore";
import { transformTagData } from "@components/order/table/transformTagData";
import PagingArea from "@components/list/PagingArea";
import useMenuTabStore from "@store/useMenuTabStore";
import useRecordDataStore from "@store/useRecordDataStore";
import { LoadingOutlined } from "@ant-design/icons";

const OrderListTable = () => {

	const [headerList, setHeaderList] = useState([]);

	const { page, size, total, totalPages, data, setPage, setSize, setOpenCopyModal, setOpenEditModal } = useRecordModalStore();

	const handleContextMenuClick = (e) => {
		if (parseInt(e.key) === 1) {
			setOpenCopyModal(true);
		} else if (parseInt(e.key) === 2) {
			setOpenEditModal(true);
		}
	};

	const { moveUrl } = useMenuTabStore();
	const { setRecord } = useRecordDataStore();
	const handleDoubleClick = (record) => {
		record.nowState = record.nowState.props.children
		setRecord(record);
		moveUrl("/order/create");
	}

	const handleSettingKeyToData = (data) => {
		return (transformTagData(data) || []).map((item, index) => {
			item.key = item.id;
			return item;
		});
	}

	return (
		<>
			<PagingArea page={page} size={size} total={total} totalPages={totalPages} setPage={setPage} setSize={setSize} />

			{/* 태그 없음, 헤더 관련 정리 event */}
			<OrderListHeaderData setHeaderList={setHeaderList} headerDiv={"SALES"} />
			<Dropdown
				menu={{
					items: orderListRightItem,
					onClick: handleContextMenuClick,

				}}
				trigger={["contextMenu"]}
			>
				<div>
					{/* 테이블 */}
					<TableOnRowSelect2 header={headerList} serverData={handleSettingKeyToData(data)} size={size} setSize={setSize} scrollY={"calc(100vh - 260px)"} onRowDoubleClick={handleDoubleClick} />
				</div>
			</Dropdown>
		</>
	);
};

export default OrderListTable;
