// pages/index.js
import React from "react";
import { Button, Layout } from "antd";
import Link from "next/link";

const DashBoard = () => {

	const openPopup = ({
		url = '/',
		name = 'popupWindow',
		width = 1280,
		height = 1120,
		resizable = 'yes',
		scrollbars = 'yes',
	}) => {
		const screenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX;
		const screenTop = window.screenTop !== undefined ? window.screenTop : window.screenY;
		const screenWidth = window.screen.availWidth;
		const screenHeight = window.screen.availHeight;
	
		const left = screenLeft + (screenWidth - width) / 2;
		const top = screenTop + (screenHeight - height) / 2;
	
		const features = `width=${width},height=${height},top=${top},left=${left},resizable=${resizable},scrollbars=${scrollbars}`;
	
		window.open(url, name, features);
	};

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
			<Link href="publish/login/changenewpw">새 비밀번호 입력</Link>
			<br />
			<Button type="primary" onClick={()=> openPopup({
				url: '/publish/produce_popup',
				name: 'produce_popup',
			})} style={{ width: "200px"}}>
				제어계수 팝업 열기
			</Button>
			<br />
			<Button type="primary" onClick={()=> openPopup({
				url: '/publish/produce_popup2',
				name: 'produce_popup2',
			})} style={{ width: "200px"}}>
				생산공정창 팝업 열기
			</Button>
			<br />
			<Button type="primary" onClick={()=> openPopup({
				url: '/publish/order_popup',
				name: 'order_popup',
			})} style={{ width: "200px"}}>
				수주종합정보 팝업 열기
			</Button>
			<br />
			<Button type="primary" onClick={()=> openPopup({
				url: '/publish/produce_popup3',
				width: 1440,
				name: 'produce_popup3',
			})} style={{ width: "200px"}}>
				부적합관리 팝업 열기
			</Button>
			<br />
			<Button type="primary" onClick={()=> openPopup({
				url: '/publish/produce_ratio_control',
				name: 'produce_ratio_control',
			})} style={{ width: "200px"}}>
				비율제어 팝업 열기
			</Button>
		</Layout>
	);
};

export default DashBoard;
