import React, { useEffect, useState } from "react";
import { Flex, Button, Checkbox, Form, Input, message } from "antd";
import Link from "next/link";
import { LoginLogo } from "@components/login/LoginLogo";
import { LoginImage } from "@components/login/LoginImage";
import { LoginCopyright } from "@components/login/LoginCopyright";
import { useMutation } from "@tanstack/react-query";
import { postAxios } from "@api/apiClient";
import { setAccessToken } from "@lib/UserInfo";

export const LoginFormUsername = ({ readOnly = false, initialValue }) => {

	return (
		<Form.Item
			name="username"
			rules={[
				{
					required: true,
					message: "아이디가 존재하지 않습니다",
				},
			]}
			initialValue={initialValue}
		>
			<Input placeholder="아이디 입력" readOnly={readOnly} />
		</Form.Item>
	);
};