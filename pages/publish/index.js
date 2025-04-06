// pages/index.js
import React from "react";
import { Button, Layout } from "antd";
import Link from "next/link";

const DashBoard = () => {
	// 팝업 창을 띄우는 함수
	const openPopup = () => {
		const popupWidth = 1280;
		const popupHeight = 1120;

		// 현재 사용 중인 모니터의 전체 화면 크기 가져오기
		const screenLeft =
			window.screenLeft !== undefined ? window.screenLeft : window.screenX;
		const screenTop =
			window.screenTop !== undefined ? window.screenTop : window.screenY;
		const screenWidth = window.screen.availWidth;
		const screenHeight = window.screen.availHeight;

		// 중앙 정렬 계산 (멀티 모니터 고려)
		const left = screenLeft + (screenWidth - popupWidth) / 2;
		const top = screenTop + (screenHeight - popupHeight) / 2;

		window.open(
			"/publish/produce_popup",
			"producePopup",
			`width=${popupWidth},height=${popupHeight},top=${top},left=${left},resizable=yes,scrollbars=yes`
		);
	};

	// 팝업 창을 띄우는 함수
	const openPopup2 = () => {
		const popupWidth = 1280;
		const popupHeight = 1120;

		// 현재 사용 중인 모니터의 전체 화면 크기 가져오기
		const screenLeft =
			window.screenLeft !== undefined ? window.screenLeft : window.screenX;
		const screenTop =
			window.screenTop !== undefined ? window.screenTop : window.screenY;
		const screenWidth = window.screen.availWidth;
		const screenHeight = window.screen.availHeight;

		// 중앙 정렬 계산 (멀티 모니터 고려)
		const left = screenLeft + (screenWidth - popupWidth) / 2;
		const top = screenTop + (screenHeight - popupHeight) / 2;

		window.open(
			"/publish/produce_popup2",
			"producePopup",
			`width=${popupWidth},height=${popupHeight},top=${top},left=${left},resizable=yes,scrollbars=yes`
		);
	};

	// 팝업 창을 띄우는 함수
	const openPopup3 = () => {
		const popupWidth = 1280;
		const popupHeight = 1120;

		// 현재 사용 중인 모니터의 전체 화면 크기 가져오기
		const screenLeft =
			window.screenLeft !== undefined ? window.screenLeft : window.screenX;
		const screenTop =
			window.screenTop !== undefined ? window.screenTop : window.screenY;
		const screenWidth = window.screen.availWidth;
		const screenHeight = window.screen.availHeight;

		// 중앙 정렬 계산 (멀티 모니터 고려)
		const left = screenLeft + (screenWidth - popupWidth) / 2;
		const top = screenTop + (screenHeight - popupHeight) / 2;

		window.open(
			"/publish/order_popup",
			"orderPopup",
			`width=${popupWidth},height=${popupHeight},top=${top},left=${left},resizable=yes,scrollbars=yes`
		);
	};

	// 팝업 창을 띄우는 함수
	const openPopup4 = () => {
		const popupWidth = 1280;
		const popupHeight = 1120;

		// 현재 사용 중인 모니터의 전체 화면 크기 가져오기
		const screenLeft =
			window.screenLeft !== undefined ? window.screenLeft : window.screenX;
		const screenTop =
			window.screenTop !== undefined ? window.screenTop : window.screenY;
		const screenWidth = window.screen.availWidth;
		const screenHeight = window.screen.availHeight;

		// 중앙 정렬 계산 (멀티 모니터 고려)
		const left = screenLeft + (screenWidth - popupWidth) / 2;
		const top = screenTop + (screenHeight - popupHeight) / 2;

		window.open(
			"/publish/produce_popup3",
			"producePopup",
			`width=${popupWidth},height=${popupHeight},top=${top},left=${left},resizable=yes,scrollbars=yes`
		);
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
			<Button type="primary" onClick={openPopup}>
				제어계수 팝업 열기
			</Button>
			<Button type="primary" onClick={openPopup2}>
				공정창 팝업 열기
			</Button>
			<Button type="primary" onClick={openPopup3}>
				수주종합정보 팝업 열기
			</Button>
			<Button type="primary" onClick={openPopup4}>
				부적합이력 팝업 열기
			</Button>
		</Layout>
	);
};

export default DashBoard;
