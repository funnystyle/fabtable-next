// pages/samples/orderInfo/OrderCreateNewFinal.js

import dayjs from "dayjs";

export const handleSettingDetail = async (form, cs, csDetail, setCsDetail, setRecordKeys, setSubRecordKeys, setAsKeys, setIsAsDetailCommon, setIsFollowUpCommon, setLoading, setIsChange) => {
  await handleSettingDetail2(form, cs, csDetail, setCsDetail, setRecordKeys, setSubRecordKeys, setAsKeys, setIsAsDetailCommon, setIsFollowUpCommon, setLoading, setIsChange);
}

const setIds = async (csDetail, setRecordKeys, setSubRecordKeys) => {
  const ids = csDetail.csRecords.map((csRecord, index) => csRecord.recordId);
  setRecordKeys(ids);
  const subIds = csDetail.csRecords.map((csRecord, index) => csRecord.subRecordId);
  setSubRecordKeys(subIds);
}

const settingAsWork = async (form, csAsWork) => {
  form.setFieldsValue(csAsWork);
}

const settingCsRecord = async (form, csRecords) => {
  csRecords.forEach((csRecord, index) => {
    const result = Object.entries(csRecord).reduce((acc, [key, value]) => {
      const dateFields = ["defectMfcWithdrawalDate", "actionCompletionDate", "productCertificationDate"];
      const isDateField = dateFields.includes(key);
      acc[key + "-" + (index + 1)] = isDateField ? (value == null ? null : dayjs(value)) : value;
      return acc;
    }, {});
    form.setFieldsValue(result);
  });
}

const setAsWorkContents = async (form, csAsWorkContents, setAsKeys) => {
  const asKeys = csAsWorkContents.map((csAsWorkContent, index) => {
    const result = Object.entries(csAsWorkContent).reduce((acc, [key, value]) => {
      const dateFields = ["responseDate"];
      const isDateField = dateFields.includes(key);
      acc[key + "-" + (index + 1)] = isDateField ? (value == null ? null : dayjs(value)) : value;
      return acc;
    }, {});
    form.setFieldsValue(result);

    return index;
  });
  setAsKeys(asKeys);
}

const setCommonInfo = async (csDetail, setIsAsDetailCommon, setIsFollowUpCommon) => {
  setIsAsDetailCommon(csDetail.isAsDetailCommon);
  setIsFollowUpCommon(csDetail.isFollowUpCommon);
}

const setAsDetail = async (form, csDetail) => {
  csDetail.csAsDetails.forEach((csAsDetail, index) => {
    const result = Object.entries(csAsDetail).reduce((acc, [key, value]) => {
      const dateFields = ["responseDate"];
      const isDateField = dateFields.includes(key);
      acc[key + "-" + (csDetail.isAsDetailCommon ? 0 : index + 1)] = isDateField ? (value == null ? null : dayjs(value)) : value;
      return acc;
    }, {});
    form.setFieldsValue(result);
  });
}

const setFollowUp = async (form, csDetail) => {
  csDetail.csFollowUps.forEach((csFollowUp, index) => {
    const result = Object.entries(csFollowUp).reduce((acc, [key, value]) => {
      const dateFields = ["analysisRequestDate", "analysisDueDate", "analysisCompleteDate"];
      const isDateField = dateFields.includes(key);
      acc[key + "-" + (csDetail.isFollowUpCommon ? 0 : index + 1)] = isDateField ? (value == null ? null : dayjs(value)) : value;
      return acc;
    }, {});
    form.setFieldsValue(result);
  });
}
const handleSettingDetail2 = async (form, cs, csDetail, setCsDetail, setRecordKeys, setSubRecordKeys, setAsKeys, setIsAsDetailCommon, setIsFollowUpCommon, setLoading, setIsChange) => {
  setCsDetail(csDetail);
  if (csDetail) {
    await setIds(csDetail, setRecordKeys, setSubRecordKeys);
    await setCommonInfo(csDetail, setIsAsDetailCommon, setIsFollowUpCommon);

    await settingAsWork(form, csDetail.csAsWork);
    await settingCsRecord(form, csDetail.csRecords);
    await setAsWorkContents(form, csDetail.csAsWorkContents, setAsKeys);
    await setAsDetail(form, csDetail);

    if (!cs.isCopy) {
      await setFollowUp(form, csDetail);
    }

    setIsChange(false);
    setLoading(false);
  } else {
    setIsChange(false);
  }
}