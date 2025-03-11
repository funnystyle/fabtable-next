// pages/index.js
import React from "react";
import { Layout } from "antd";
import Link from "next/link";

const DashBoard = () => {
	return (
		<Layout>
			<div>대시보드</div>
			<Link href="publish/samples/customdrawer">커스텀 드로어</Link> <br />
			<Link href="publish/samples/message">메세지</Link> <br />
			<Link href="publish/samples/modal">모달</Link>
			<br />
			<Link href="publish/login/login">로그인</Link>
			<br />
			<Link href="publish/login/changepw">비밀번호 변경</Link>
			<br />
			<Link href="publish/login/changenew pw">새 비밀번호 입력</Link>
		</Layout>
	);
};

export default DashBoard;
