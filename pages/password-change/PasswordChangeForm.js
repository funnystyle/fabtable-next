import React, { useEffect, useState } from "react";
import { Flex, Button, Checkbox, Form, Input, message } from "antd";
import Link from "next/link";
import { LoginLogo } from "@pages/login/LoginLogo";
import { LoginImage } from "@pages/login/LoginImage";
import { LoginCopyright } from "@pages/login/LoginCopyright";
import { useMutation } from "@tanstack/react-query";
import { postAxios } from "@api/apiClient";
import { setAccessToken } from "@lib/UserInfo";
import { LoginFormUsername } from "@pages/login/LoginFormUsername";
import { LoginFormPassword } from "@pages/login/LoginFormPassword";

export const PasswordChangeForm = () => {

	const [form] = Form.useForm();

	const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
	};

	return (
		<Form
			form={form}
			name="basic"
			initialValues={{
				remember: true,
			}}
			// onFinish={onFinish}
			onFinishFailed={onFinishFailed}
			autoComplete="off"
			size="large"
		>
			<LoginFormUsername />

			<LoginFormPassword placeholder={"현재 비밀번호 입력"} />

			<div className="btn-login">
				<Link href={"/publish/login/changenewpw"}>
					<Button type="primary" htmlType="submit" size="large" block>
						확인
					</Button>
				</Link>
			</div>
		</Form>
	);
};