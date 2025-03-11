// pages/login.js
import React from "react";
import { Flex } from "antd";
import { LoginImage } from "@pages/login/LoginImage";
import { PasswordChangeBox } from "@pages/password-change/PasswordChangeBox";

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
