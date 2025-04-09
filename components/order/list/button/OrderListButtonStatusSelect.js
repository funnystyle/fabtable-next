// pages/order/create/index.js
import React, { useState } from "react";
import { Button, Checkbox, Divider, Dropdown, Space, theme, } from "antd";
import { DownOutlined, RedoOutlined } from "@ant-design/icons";
import useModalEventStore from "@store/useModalEventStore";

const { useToken } = theme;

const OrderListButtonStatusSelect = ({ statusList, searchStatusList, setSearchStatusList }) => {

	const { token } = useToken();
	const contentStyle = {
		backgroundColor: token.colorBgElevated,
		borderRadius: token.borderRadiusLG,
		boxShadow: token.boxShadowSecondary,
	};

	const menuStyle = {
		boxShadow: "none",
	};

	const [allChecked, setAllChecked] = useState(true);
	const [checkedItems, setCheckedItems] = useState(Array(16).fill(true));

	const handleAllChange = (e) => {
		const checked = e.target.checked;
		setAllChecked(checked);
		setCheckedItems(Array(17).fill(checked));
		if (checked) {
			setSearchStatusList([...statusList]);
		} else {
			setSearchStatusList(["inner peace"]);
		}
	};

	const handleItemChange = (index, status) => {
		if(searchStatusList.includes(status)) {
			const newSearchStatusList = searchStatusList.filter(item => item !== status);
			if (newSearchStatusList.length === 0) {
				setSearchStatusList(["inner peace"]);
			} else {
				setSearchStatusList(newSearchStatusList);
			}
		} else {
			setSearchStatusList([...searchStatusList, status]);
		}

		const updated = [...checkedItems];
		updated[index] = !updated[index];
		setCheckedItems(updated);

		setAllChecked(updated.every(Boolean));
	};

	const items = [
		{
			key: `0`,
			label: (
				<div onClick={(e) => e.stopPropagation()}>
					<Checkbox
						defaultChecked
						checked={allChecked}
						onChange={handleAllChange}
					>
						전체
					</Checkbox>
				</div>
			),
		},
		{ 
			type: "divider"
		},
		...statusList.map((status, i) => ({
			key: `${i + 1}`,
			label: (
				<div onClick={(e) => e.stopPropagation()}>
					<Checkbox
						checked={checkedItems[i]}
						onChange={() => handleItemChange(i, status)}
					>
						{status}
					</Checkbox>
				</div>
			),
		})),
	];


	return (
		<Dropdown menu={{ items }} >
			<Button>
				<Space>
					상태별 보기
					<DownOutlined />
				</Space>
			</Button>
		</Dropdown>
	);
};

export default OrderListButtonStatusSelect;
