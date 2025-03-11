// pages/login.js
import React from "react";
import { Button } from "antd";
import Link from "next/link";

export const LoginPasswordChangeButton = ({ url }) => {
	return (
		<Link href={url}>
			<Button type="link" block>
				비밀번호 변경
			</Button>
		</Link>
	);
};
