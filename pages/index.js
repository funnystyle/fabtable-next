// pages/index.js
import React from "react";
import { Layout } from "antd";
import Link from "next/link";

const DashBoard = () => {
	return (
		<Layout>
			<div>대시보드</div>
			<br/>
			<Link href="publish">퍼블리싱 페이지</Link> <br />
			<Link href="samples">샘플 페이지</Link>
		</Layout>
	);
};

export default DashBoard;
