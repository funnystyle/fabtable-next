// pages/year.js
import React, {useRef, useState} from "react";
import "dayjs/locale/ko";
import Draggable from "react-draggable";

const ModalDraggable = ({ modal, disabled }) => {

	const [bounds, setBounds] = useState({
		left: 0,
		top: 0,
		bottom: 0,
		right: 0,
	});
	const draggleRef = useRef(null);

	const onStart = (_event, uiData) => {
		const { clientWidth, clientHeight } = window.document.documentElement;
		const targetRect = draggleRef.current?.getBoundingClientRect();
		if (!targetRect) {
			return;
		}
		setBounds({
			left: -targetRect.left + uiData.x,
			right: clientWidth - (targetRect.right - uiData.x),
			top: -targetRect.top + uiData.y,
			bottom: clientHeight - (targetRect.bottom - uiData.y),
		});
	};

	return (
		<Draggable
			disabled={disabled}
			bounds={bounds}
			nodeRef={draggleRef}
			onStart={(event, uiData) => onStart(event, uiData)}
		>
			<div ref={draggleRef}>{modal}</div>
		</Draggable>
	);
};

export default ModalDraggable;
