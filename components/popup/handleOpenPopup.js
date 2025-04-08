// pages/index.js
import React from "react";
import { Button, Layout } from "antd";
import Link from "next/link";

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
