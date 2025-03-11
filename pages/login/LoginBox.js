import React from "react";
import { Flex } from "antd";
import { LoginLogo } from "@pages/login/LoginLogo";
import { LoginCopyright } from "@pages/login/LoginCopyright";
import { LoginForm } from "@pages/login/LoginForm";
import { LoginPasswordChangeButton } from "@pages/login/LoginPasswordChangeButton";

export const LoginBox = () => {
	return (
		<Flex className="login-box-area">
			<div className="login-box">
				<LoginLogo logoUrl={"/images/logo.svg"} />

				<p className="login-descript">안녕하세요! 로그인 정보를 입력하세요</p>

				<LoginForm />

				<p className="txt-or">
					<span>또는</span>
				</p>

				<LoginPasswordChangeButton url={"/publish/login/changepw"} />
			</div>

			<LoginCopyright />
		</Flex>
	);
};