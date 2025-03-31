// pages/order/create/index.js
import React, { useEffect, useState } from "react";
import {Button, Form,} from "antd";
import { RedoOutlined } from "@ant-design/icons";
import { handleCopyModal } from "@components/list/handleCopyModal";
import { useQuery } from "@tanstack/react-query";
import { getAxios } from "@api/apiClient";
import OrderListCopyModal from "@components/order/list/modal/OrderListCopyModal";
import useRecordModalStore from "@store/useRecordModalStore";

const OrderListButtonCopy = () => {

	const [form] = Form.useForm();

	const { openCopyModal:openModal, setOpenCopyModal:setOpenModal } = useRecordModalStore();

	const showModal = () => {
		setOpenModal(true);
	};

	return (
		<>
			<Button onClick={showModal}>수주 복제하기</Button>
			<OrderListCopyModal form={form} openModal={openModal} setOpenModal={setOpenModal} />
		</>
	);
};

export default OrderListButtonCopy;
