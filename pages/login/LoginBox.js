import React from "react";
import { Flex } from "antd";
import { LoginLogo } from "@pages/login/LoginLogo";
import { LoginCopyright } from "@pages/login/LoginCopyright";
import { LoginForm } from "@pages/login/LoginForm";
import { LoginPasswordChangeButton } from "@pages/login/LoginPasswordChangeButton";
import { LoginTextOr } from "@pages/login/LoginTextOr";

export const LoginBox = () => {
	return (
		<Flex className="login-box-area">
			<div className="login-box">
				<LoginLogo logoUrl={"/images/logo.svg"} title={"FabTable Web System"} subTitle={"안녕하세요! 로그인 정보를 입력하세요"}/>

				<LoginForm />

				<LoginTextOr />

				<LoginPasswordChangeButton url={"/publish/login/changepw"} />
			</div>

			<LoginCopyright />
		</Flex>
	);
};