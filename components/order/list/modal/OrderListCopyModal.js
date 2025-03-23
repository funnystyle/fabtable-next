// pages/order/create/index.js
import React, {useState} from "react";
import {message, Modal,} from "antd";
import ModalTitle from "@components/modal/ModalTitle";
import ModalDraggable from "@components/drag/ModalDraggable";
import {useMutation} from "@tanstack/react-query";
import {postAxios} from "@api/apiClient";
import OrderListCopyModalContent from "@components/order/list/modal/OrderListCopyModalContent";
import useOrderListQueryStore from "@store/useOrderListQueryStore";

const OrderListCopyModal = ({ form, openModal, setOpenModal, selectedRowKeys }) => {

	const [disabled, setDisabled] = useState(true);

	const { mutate: orderInfoCopy } = useMutation({
		mutationKey: "orderInfoCopy",
		mutationFn: (values) => postAxios("/user/record/copy", values),
	});

	const { handleReload } = useOrderListQueryStore();
	const handleSubmit = async (event) => {
		const values = await form.validateFields();
		values["ids"] = selectedRowKeys;

		await orderInfoCopy(values);
		setOpenModal(false);

		setTimeout(() => {
			handleReload();
		}, 100);

		message.success('복제가 완료되었습니다!');
	}

	return (
		<>
			{/* ModalComponent 추가 - "수주 복제하기" 클릭 시 열림 */}
			<div style={{ display: openModal ? "block" : "none" }}>
				<Modal
					title={<ModalTitle title="수주 복제하기" setDisabled={setDisabled} />}
					open={openModal}
					onCancel={() => setOpenModal(false)}
					onOk={handleSubmit}
					okText="복제"
					cancelText="취소"
					width={640}
					modalRender={(modal) => (<ModalDraggable modal={modal} disabled={disabled} />)}
				>
					<OrderListCopyModalContent form={form} selectKeysLength={selectedRowKeys.length} />
				</Modal>
			</div>
		</>
	);
};

export default OrderListCopyModal;
