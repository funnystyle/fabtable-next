import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAxios } from "@api/apiClient";
import CsRecordInputBoxRow from "@components/inputForm/cs/CsRecordInputBoxRow";

const CsRecordInputBoxes = ({ form, codeRelationSet, type }) => {
	const [csRecordInputBoxList, setCsRecordInputBoxList] = useState([]);
	const [queryKey, setQueryKey] = useState(["cs-record-input-box-list", Math.random()]);
	const { data:csRecordInputBoxResponse, isSuccess } = useQuery({
		queryKey,
		queryFn: () => getAxios("/user/input-box", {type:"csCreateRecord"}),
	});
	useEffect(() => {
		if (isSuccess) {
			setCsRecordInputBoxList(csRecordInputBoxResponse.data.list);
		}
	}, [isSuccess]);

	const copyCountRef = useRef(1);

	return (
		<>
			{csRecordInputBoxList.map((item, index) =>
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
