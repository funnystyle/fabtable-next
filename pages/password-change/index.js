// pages/login.js
import React from "react";
import { Flex } from "antd";
import { LoginImage } from "@components/login/LoginImage";
import { PasswordChangeBox } from "@components/password-change/PasswordChangeBox";

const loginComponent = () => {
	return (
		<Flex className="login-wrap">
			<LoginImage />

			<PasswordChangeBox />
		</Flex>
	);
};

loginComponent.getLayout = (page) => page;

export default loginComponent;
