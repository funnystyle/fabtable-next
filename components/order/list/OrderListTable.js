// pages/order.js
import React, { useState } from "react";
import { Dropdown, } from "antd";
import TableOnRowSelect2 from "@components/TableOnRowSelect2";
import { orderListRightItem } from "@components/order/list/data/orderListRightItem";
import OrderListHeaderData from "@components/order/list/OrderListHeaderData";
import useModalStore from "@store/useModalStore";
import { transformTagData } from "@components/order/table/transformTagData";

const OrderListTable = ({ contentHeight }) => {

	const [headerList, setHeaderList] = useState([]);

	const { size, data, setSize, setOpenCopyModal, setOpenEditModal } = useModalStore();
	const handleContextMenuClick = (e) => {
		if (parseInt(e.key) === 1) {
			setOpenCopyModal(true);
		} else if (parseInt(e.key) === 2) {
			setOpenEditModal(true);
		}
	};

	return (
		<>
			{/* 태그 없음, 헤더 관련 정리 event */}
			<OrderListHeaderData setHeaderList={setHeaderList} />
			<Dropdown
				menu={{
					items: orderListRightItem,
					onClick: handleContextMenuClick,

				}}
				trigger={["contextMenu"]}
			>
				<div style={{ marginTop: contentHeight }} className="contents-scroll">
					{/* 테이블 */}
					<TableOnRowSelect2 header={headerList} serverData={transformTagData(data)} size={size} setSize={setSize} />
				</div>
			</Dropdown>
		</>
	);
};

export default OrderListTable;
