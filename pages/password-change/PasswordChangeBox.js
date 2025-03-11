import React from "react";
import { Flex } from "antd";
import { LoginLogo } from "@pages/login/LoginLogo";
import { LoginCopyright } from "@pages/login/LoginCopyright";
import { LoginPasswordChangeButton } from "@pages/login/LoginPasswordChangeButton";
import { LoginTextOr } from "@pages/login/LoginTextOr";
import { PasswordChangeForm } from "@pages/password-change/PasswordChangeForm";

export const PasswordChangeBox = () => {
	return (
		<Flex className="login-box-area">
			<div className="login-box">
				<LoginLogo logoUrl={"/images/logo.svg"} title={"비밀번호 변경"} subTitle={"비밀번호 초기화는 관리자에게 문의하세요"}/>

				<PasswordChangeForm />

				<LoginTextOr />

				<LoginPasswordChangeButton url={"/publish/login/changepw"} />
			</div>

			<LoginCopyright />
		</Flex>
	);
};