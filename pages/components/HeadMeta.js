import Head from "next/head";

const HeadMeta = ({ title, description, url, image }) => {
	return (
		<Head>
			<title>{title || "MKPFT"}</title>
			<meta name="viewport" content="initial-scale=1.0, width=device-width" />
		</Head>
	);
};

export default HeadMeta;
