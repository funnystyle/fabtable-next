// pages/month.js
import React from "react";
import { Button, } from "antd";
import "dayjs/locale/ko";
import dayjs from "dayjs";

const CurrentMonthButton = ({setYear, setMonth}) => {

	return (
		<Button
			color="primary"
			variant="text"
			size="small"
			className="this-month"
			onClick={() => {
				setMonth(dayjs().month() + 1)
				setYear(dayjs().year())
			}}
		>
			이번달
		</Button>
	);
};

export default CurrentMonthButton;
