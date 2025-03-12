import React from "react";
import { Flex } from "antd";
import { LoginLogo } from "@components/login/LoginLogo";
import { LoginCopyright } from "@components/login/LoginCopyright";
import { LoginForm } from "@components/login/LoginForm";
import { LoginPasswordChangeButton } from "@components/login/LoginPasswordChangeButton";
import { LoginTextOr } from "@components/login/LoginTextOr";

export const LoginBox = () => {
	return (
		<Flex className="login-box-area">
			<div className="login-box">
				<LoginLogo logoUrl={"/images/logo.svg"} title={"FabTable Web System"} subTitle={"안녕하세요! 로그인 정보를 입력하세요"}/>

				<LoginForm />

				<LoginTextOr />

				<LoginPasswordChangeButton url={"/password-change"} />
			</div>

			<LoginCopyright />
		</Flex>
	);
};