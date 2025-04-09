// pages/index.js

import { message } from "antd";

export const handleRecordInfoPopup = (window, datas) => {
	if (datas.length === 0) {
		message.error("행을 선택하세요.");
		return;
	}

	for (let i = 0; i < datas.length; i++) {
		const data = datas[i];

		setTimeout(() => {
			handleOpenPopup(window, {
				url: `/order/info/${data?.id}`,
				name: "수주 종합정보 - "+ (i+1),
			});
		}, 200 * i);
	}
}

export const handleRecordInfoMemoPopup = (window, datas) => {
	if (datas.length === 0) {
		message.error("행을 선택하세요.");
		return;
	}

	for (let i = 0; i < datas.length; i++) {
		const data = datas[i];

		setTimeout(() => {
			handleOpenPopup(window, {
				url: `/order/info/memo/${data?.id}`,
				name: "부서별 메모 - " + data?.serialNumber,
				width: 520,
				height: 600,
			});
		}, 200 * i);
	}
}

export const handleOpenPopup = (window, {
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
