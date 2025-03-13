import React from "react";
import {CsAsTopInputBox} from "@components/inputForm/cs/CsAsTopInputBox";
import {CsAsTitle} from "@components/inputForm/cs/CsAsTitle";
import {CsAsWorkInputBox} from "@components/inputForm/cs/CsAsWorkInputBox";

export const handleCsAsInputBox = (form, keys, setKeys, asCheckedKeySet, setAsCheckedKeySet) => {

  return (
    <div id="cs3" className="info-wrap">
      <CsAsTitle keys={keys} setKeys={setKeys} asCheckedKeySet={asCheckedKeySet} setAsCheckedKeySet={setAsCheckedKeySet} />

      <CsAsTopInputBox />

      {(keys || []).map((key, index) => (
        <CsAsWorkInputBox
          key = {`cs-as-work-${index}`}
          form={form}
          index={index}
          keys={keys}
          setKeys={setKeys}
          asCheckedKeySet={asCheckedKeySet}
          setAsCheckedKeySet={setAsCheckedKeySet}
        />
      ))}
    </div>
  );
}