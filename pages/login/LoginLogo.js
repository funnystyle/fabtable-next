import React from "react";
import { Flex, Button, Checkbox, Form, Input } from "antd";
import Link from "next/link";

export const LoginLogo = ({ logoUrl }) => {
	return (
		<h1 className="login-logo">
			<img src={logoUrl} alt="FabTable Web System" />
			FabTable Web System
		</h1>
	);
};