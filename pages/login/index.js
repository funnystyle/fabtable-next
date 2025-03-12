// pages/login.js
import React from "react";
import { Flex, Button, Checkbox, Form, Input } from "antd";
import Link from "next/link";
import { LoginLogo } from "@components/login/LoginLogo";
import { LoginImage } from "@components/login/LoginImage";
import { LoginCopyright } from "@components/login/LoginCopyright";
import { LoginForm } from "@components/login/LoginForm";
import { LoginPasswordChangeButton } from "@components/login/LoginPasswordChangeButton";
import { LoginBox } from "@components/login/LoginBox";

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
