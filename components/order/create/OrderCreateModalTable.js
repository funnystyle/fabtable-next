// pages/order.js
import React, { useState } from "react";
import TableOnRowSelect2 from "@components/TableOnRowSelect2";
import OrderListHeaderData from "@components/order/list/OrderListHeaderData";
import useModalStore from "@store/useModalStore";
import { transformTagData } from "@components/order/table/transformTagData";

const OrderCreateModalTable = ({ contentHeight }) => {

	const [headerList, setHeaderList] = useState([]);

	const { size, data, setSize } = useModalStore();

	return (
		<>
			{/* 태그 없음, 헤더 관련 정리 event */}
			<OrderListHeaderData setHeaderList={setHeaderList} />
			<div style={{ marginTop: contentHeight }} className="contents-scroll">
				{/* 테이블 */}
				<TableOnRowSelect2 header={headerList} serverData={transformTagData(data)} size={size} setSize={setSize} />
			</div>
		</>
	);
};

export default OrderCreateModalTable;
