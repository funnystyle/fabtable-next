import Head from "next/head";

const HeadMeta = ({ title, description, url, image }) => {
	return (
		<Head>
			<title>{title || "MKPFT"}</title>
			{/* <meta name="viewport" content="initial-scale=1.0, width=device-width" /> */}
			<meta
				name="viewport"
				content="width=device-width, initial-scale=1, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
			/>
		</Head>
	);
};

export default HeadMeta;
