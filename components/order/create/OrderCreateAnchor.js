// pages/order/create/index.js
import React, { useEffect, useState } from "react";
import { Anchor, } from "antd";

const OrderCreateAnchor = ({ list, anchorContainer }) => {
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

	const [items, setItems] = useState([]);

	useEffect(() => {
		setItems(list.map((item) => ({ key: item[0][0].name, href: `#${item[0][0].name}`, title: item[0][0].displayName })));
	}, [list]);

	return (
		<div className="anchor-area">
			<Anchor
				affix={false}
				// onClick={handleAnchorClick}
				getContainer={() => anchorContainer}
				items={items}
			/>
		</div>
	);
};

export default OrderCreateAnchor;
