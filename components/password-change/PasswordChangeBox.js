import React from "react";
import { Flex } from "antd";
import { LoginLogo } from "@components/login/LoginLogo";
import { LoginCopyright } from "@components/login/LoginCopyright";
import { LoginPasswordChangeButton } from "@components/login/LoginPasswordChangeButton";
import { LoginTextOr } from "@components/login/LoginTextOr";
import { PasswordChangeForm } from "@components/password-change/PasswordChangeForm";

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