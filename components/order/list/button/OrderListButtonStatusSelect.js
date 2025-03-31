// pages/order/create/index.js
import React, { useState } from "react";
import { Button, Checkbox, Divider, Dropdown, Space, theme, } from "antd";
import { DownOutlined, RedoOutlined } from "@ant-design/icons";
import useRecordModalStore from "@store/useRecordModalStore";

const { useToken } = theme;

const OrderListButtonStatusSelect = ({ statusList }) => {

	const { searchStatusList, setSearchStatusList } = useRecordModalStore();

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
	const items = statusList.map((status, i) => ({
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
	}));

	const handleAllChange = (e) => {
		const checked = e.target.checked;
		setAllChecked(checked);
		setCheckedItems(Array(17).fill(checked));
		if (checked) {
			setSearchStatusList([...statusList]);
		} else {
			setSearchStatusList([]);
		}
	};

	const handleItemChange = (index, status) => {
		if(searchStatusList.includes(status)) {
			setSearchStatusList(searchStatusList.filter(item => item !== status));
		} else {
			setSearchStatusList([...searchStatusList, status]);
		}

		const updated = [...checkedItems];
		updated[index] = !updated[index];
		setCheckedItems(updated);

		setAllChecked(updated.every(Boolean));
	};

	return (
		<Dropdown
			menu={{
				items,
			}}
			dropdownRender={(menu) => (
				<div style={contentStyle}>
					<Space
						style={{
							padding: 12,
						}}
						className="check-all"
					>
						<Checkbox
							defaultChecked
							checked={allChecked}
							onChange={handleAllChange}
						>
							전체
						</Checkbox>

						<Button
							icon={<RedoOutlined />}
							target="_blank"
							size="small"
							className="icon-redo"
						/>
					</Space>

					<Divider />

					{React.cloneElement(menu, {
						style: menuStyle,
					})}

				</div>
			)}
		>
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
