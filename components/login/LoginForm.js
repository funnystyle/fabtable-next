import React, { useEffect } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { useMutation } from "@tanstack/react-query";
import { postAxios } from "@api/apiClient";
import { setAccessToken } from "@lib/UserInfo";
import { LoginFormUsername } from "@components/login/LoginFormUsername";
import { LoginFormPassword } from "@components/login/LoginFormPassword";
import { LoginButton } from "@components/login/LoginButton";

export const LoginForm = () => {

	const [form] = Form.useForm();

	const { mutate: login, data:loginResponse, error:loginError} = useMutation({
		mutationKey: "login",
		mutationFn: (values) => postAxios("/user/login", values),
	});

	useEffect(() => {
		if (loginResponse) {
			const token = loginResponse?.data.grantType + " " + loginResponse?.data.accessToken;
			console.log("token : ", token);
			setAccessToken(token);
		}
	}, [loginResponse]);

	useEffect(() => {
		if (loginError) {
			if (loginError.response.data.code === 404) {
				const message = loginError.response.data.message;
				form.setFields([
					{
						name: "username",
						errors: [message],
					},
				]);
			} else if (loginError.response.data.code === 401) {
				const message = loginError.response.data.message;
				form.setFields([
					{
						name: "password",
						errors: [message],
					},
				]);
			}
		}
	}, [loginError]);

	return (
		<Form
			form={form}
			name="basic"
			initialValues={{
				remember: true,
			}}
			onFinish={(values) => login(values)}
			autoComplete="off"
			size="large"
		>
			<LoginFormUsername />

			<LoginFormPassword placeholder={"비밀번호"} />

			<Form.Item name="remember" valuePropName="checked" label={null}>
				<Checkbox>로그인 정보 저장</Checkbox>
			</Form.Item>

			<LoginButton buttonText={"로그인"} />
		</Form>
	);
};