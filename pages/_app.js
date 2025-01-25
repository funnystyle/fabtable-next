// pages/_app.js
import React from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "../queryClient";
import { ChakraProvider } from "@chakra-ui/react";
import { I18nextProvider } from "react-i18next"; // i18next Provider 추가
import i18next from "../i18n"; // i18next 설정 파일 임포트

import HomePage from "./components/HomePage"; // i18next 설정 파일 임포트

import "@/assets/scss/base.scss";

function App({ Component, pageProps }) {
	return (
		<ChakraProvider>
			<QueryClientProvider client={queryClient}>
				<I18nextProvider i18n={i18next}>
					<HomePage>
						{/* i18next 설정을 제공 */}
						<Component {...pageProps} />
					</HomePage>
				</I18nextProvider>
			</QueryClientProvider>
		</ChakraProvider>
	);
}

export default App;
