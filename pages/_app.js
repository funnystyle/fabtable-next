// pages/_app.js
import React from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "../queryClient";
import { ChakraProvider } from "@chakra-ui/react";
import { I18nextProvider } from "react-i18next"; // i18next Provider 추가
import i18next from "../i18n"; // i18next 설정 파일 임포트

import HeadMeta from "./components/HeadMeta";
import HomePage from "./components/HomePage"; // 레이아웃

import "@/assets/scss/base.scss";

function App({ Component, pageProps }) {
	const getLayout =
		Component.getLayout || ((page) => <HomePage>{page}</HomePage>);

	return (
		<ChakraProvider>
			<QueryClientProvider client={queryClient}>
				<I18nextProvider i18n={i18next}>
					<HeadMeta />
					{getLayout(<Component {...pageProps} />)}
				</I18nextProvider>
			</QueryClientProvider>
		</ChakraProvider>
	);
}

export default App;
