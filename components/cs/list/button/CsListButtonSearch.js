// pages/order/create/index.js
import React, { useEffect } from "react";
import { Button, } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import SearchModal from "@components/searchModal/SearchModal";
import useModalStore from "@store/useModalStore";

const CsListButtonSearch = () => {

	const { setOpenSearchModal, list } = useModalStore();

	useEffect(() => {
		setOpenSearchModal(false);
	}, [list]);

	return (
		<>
			<Button
				icon={<FilterOutlined />}
				iconPosition={"end"}
				size="large"
				onClick={() => setOpenSearchModal(true)}
			>
				조건 검색
			</Button>

			<SearchModal searchLocation={"cs"} searchType={"LIST"} />
		</>
	);
};

export default CsListButtonSearch;
