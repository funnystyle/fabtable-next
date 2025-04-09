import { Button, Popover } from "antd";
import React from "react";

const MemoPopover = ({ name, value }) => {

  const popText = <span className="pop-title">{name}</span>;
  const popContent = (
    <div className="pop-txt">
      {value.split("\n").map((text, index) => (
        <React.Fragment key={`list-popover-${index}`}>
          {index !== 0 && <br />}
          {text}
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <Popover
      placement="leftTop"
      autoAdjustOverflow={true}
      title={popText}
      content={popContent}
      overlayInnerStyle={{ backgroundColor: "#FFFBE6", maxWidth: "264px" }}
    >
      <Button type="text">
          <span
            style={{
              maxWidth: "140px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              display: "inline-block",
              verticalAlign: "middle",
            }}
          >
            {value}</span>
      </Button>
    </Popover>
  );
}

export default MemoPopover;

