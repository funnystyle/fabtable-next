import ComponentDisabled from "@components/inputForm/ComponentDisabled";

const CsRecordInputComponentInitial = ({ component, index }) => {

  const recordColumn = component.recordColumn;

  return <ComponentDisabled recordColumn={recordColumn} index={index} />;

}

export default CsRecordInputComponentInitial;