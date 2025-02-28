// pages/_app.js
import React from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "../queryClient";
import { ChakraProvider } from "@chakra-ui/react";
import { I18nextProvider } from "react-i18next"; // i18next Provider 추가
import { ConfigProvider } from "antd";
import koKR from "antd/locale/ko_KR"; // 한국어 로케일
import dayjs from "dayjs";
import "dayjs/locale/ko"; // dayjs 한국어 설정
import i18next from "../i18n"; // i18next 설정 파일 임포트
import { appWithTranslation } from 'next-i18next';
import i18nConfig from '../next-i18next.config';

import HeadMeta from "@publish/components/HeadMeta";
import HomePage from "@publish/components/HomePage"; // 레이아웃

import "@/assets/scss/base.scss";

dayjs.locale("ko");


function App({ Component, pageProps }) {
	const getLayout =
		Component.getLayout || ((page) => <HomePage>{page}</HomePage>);

	return (
		<ChakraProvider>
			<QueryClientProvider client={queryClient}>
				<I18nextProvider i18n={i18next}>
					<ConfigProvider locale={koKR}>
						<HeadMeta />
						{getLayout(<Component {...pageProps} />)}
					</ConfigProvider>
				</I18nextProvider>
			</QueryClientProvider>
		</ChakraProvider>
	);
}

export default appWithTranslation(App, i18nConfig);
