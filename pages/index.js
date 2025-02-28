// pages/index.js
import React from "react";
import { Layout } from "antd";
import Link from "next/link";

const DashBoard = () => {
	return (
		<Layout>
			<div>대시보드</div>
			<Link href="samples/customdrawer">커스텀 드로어</Link> <br />
			<Link href="samples/message">메세지</Link> <br />
			<Link href="samples/modal">모달</Link>
		</Layout>
	);
};

export default DashBoard;
