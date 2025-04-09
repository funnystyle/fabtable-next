import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAxios } from "@api/apiClient";
import CsRecordInputBoxRow from "@components/inputForm/cs/CsRecordInputBoxRow";

const CsRecordInputBoxes = ({ form, codeRelationSet, type, list }) => {

	const copyCountRef = useRef(1);

	return (
		<>
			{list.map((item, index) =>
				<CsRecordInputBoxRow key={`cs-record-input-box-row-${index}`}
														 form={form}
														 codeRelationSet={codeRelationSet}
														 itemList={item}
														 copyCountRef={copyCountRef} 
														 index={index}
														 type={type} />
			)}
		</>
	);
};

export default CsRecordInputBoxes;
