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
			<Link href="samples">샘플 페이지</Link> <br />
			<Link href="login">로그인 페이지</Link> <br />
			<Link href="password-change">비밀번호 변경 페이지</Link> <br />
			<Link href="calendar/month">월간 일정 페이지</Link>
		</Layout>
	);
};

export default DashBoard;
