// pages/login.js
import React from "react";
import { Flex, Button, Checkbox, Form, Input } from "antd";
import Link from "next/link";
import { LoginLogo } from "@pages/login/LoginLogo";
import { LoginImage } from "@pages/login/LoginImage";
import { LoginCopyright } from "@pages/login/LoginCopyright";
import { LoginForm } from "@pages/login/LoginForm";
import { LoginPasswordChangeButton } from "@pages/login/LoginPasswordChangeButton";
import { LoginBox } from "@pages/login/LoginBox";

const loginComponent = () => {
	return (
		<Flex className="login-wrap">
			<LoginImage />

			<LoginBox />
		</Flex>
	);
};

loginComponent.getLayout = (page) => page;

export default loginComponent;
