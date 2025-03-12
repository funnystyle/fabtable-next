import React, { useEffect, useState } from "react";
import { Flex, Button, Checkbox, Form, Input, message } from "antd";
import Link from "next/link";
import { LoginLogo } from "@components/login/LoginLogo";
import { LoginImage } from "@components/login/LoginImage";
import { LoginCopyright } from "@components/login/LoginCopyright";
import { useMutation } from "@tanstack/react-query";
import { postAxios, putAxios } from "@api/apiClient";
import { setAccessToken } from "@lib/UserInfo";
import { LoginFormUsername } from "@components/login/LoginFormUsername";
import { LoginFormPassword } from "@components/login/LoginFormPassword";
import { LoginButton } from "@components/login/LoginButton";

export const PasswordChangeForm = () => {

	const [form] = Form.useForm();
	const [isAuthorized, setIsAuthorized] = useState(false);

	const { mutate: passwordChangeCheck, data:passwordChangeCheckResponse, error:passwordChangeCheckError} = useMutation({
		mutationKey: "password-change",
		mutationFn: (values) => postAxios("/user/password-change", values),
	});

	useEffect(() => {
		if (passwordChangeCheckResponse) {
			form.setFieldsValue({password: ""});
			setIsAuthorized(true);
		}
	}, [passwordChangeCheckResponse]);

	useEffect(() => {
		if (passwordChangeCheckError) {
			if (passwordChangeCheckError.response.data.code === 404) {
				const message = passwordChangeCheckError.response.data.message;
				form.setFields([
					{
						name: "username",
						errors: [message],
					},
				]);
			} else if (passwordChangeCheckError.response.data.code === 401) {
				const message = passwordChangeCheckError.response.data.message;
				form.setFields([
					{
						name: "password",
						errors: [message],
					},
				]);
			}
		}
	}, [passwordChangeCheckError]);

	const { mutate: passwordChange, data:passwordChangeResponse, error:passwordChangeError} = useMutation({
		mutationKey: "password-change",
		mutationFn: (values) => putAxios("/user/password-change", values),
	});



	const onFinish = (values) => {
		if (!isAuthorized) {
			passwordChangeCheck(values);
		} else {
			passwordChange(values);
		}
	}

	return (
		<Form
			form={form}
			name="basic"
			initialValues={{
				remember: true,
			}}
			onFinish={onFinish}
			autoComplete="off"
			size="large"
		>
			{!isAuthorized ? (
				<>
					<LoginFormUsername />
					<LoginFormPassword placeholder={"현재 비밀번호 입력"} />
					<LoginButton buttonText={"확인"} />
				</>
			) : (
				<>
					<LoginFormUsername readOnly={true} />
					<LoginFormPassword placeholder={"새 비밀번호 입력"} />
					<LoginFormPassword name={"newPassword"} placeholder={"새 비밀번호 재확인"} />
					<LoginButton buttonText={"비밀번호 변경"} />
				</>
			)}
		</Form>
	);
};