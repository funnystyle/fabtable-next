// pages/order/create/index.js
import React from "react";
import { Anchor, } from "antd";

const CsCreateAnchor = ({ contentHeight }) => {
	/* Anchor 스크롤 이동 */
	const handleAnchorClick = (e, link) => {
		e.preventDefault(); // 기본 이동 방지

		const targetId = link.href.split("#")[1]; // 타겟 ID 가져오기
		const targetElement = document.getElementById(targetId);

		if (targetElement) {
			// 기본정보(#basic)는 top 0으로 이동, 나머지는 -100px 조정
			const yOffset = -319;
			const y =
				targetElement.getBoundingClientRect().top + window.scrollY + yOffset;

			console.log(`Scrolling to ${targetId}:`, y);

			setTimeout(() => {
				window.scrollTo({ top: y, behavior: "smooth" });
			}, 100);
		}
	};
	/* //Anchor 스크롤 이동 */

	return (
		<div className="anchor-area" style={{ top: contentHeight }}>
			<Anchor
				affix={false}
				onClick={handleAnchorClick}
				items={[
					{
						key: "cs1",
						href: "#cs1",
						title: "접수 내용",
					},
					{
						key: "cs2",
						href: "#cs2",
						title: "제품 내역",
					},
					{
						key: "cs3",
						href: "#cs3",
						title: "출장업무 내용",
					},
					{
						key: "cs4",
						href: "#cs4",
						title: "출장 내역",
					},
					{
						key: "cs5",
						href: "#cs5",
						title: "후속 조치",
					},
				]}
			/>
		</div>
	);
};

export default CsCreateAnchor;
