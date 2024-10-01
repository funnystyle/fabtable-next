import React, { useLayoutEffect, useMemo, useRef } from "react";
import GoldenLayout from "golden-layout";
import 'golden-layout/src/css/goldenlayout-base.css';
import 'golden-layout/src/css/goldenlayout-light-theme.css';

// import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <div style={{ 
        // border: "red solid 1px", 
        height: "500px", 
        width: "800px" 
      }}>
        <GoldenLayoutStuff />
      </div>
      After GoldenLayout
    </div>
  );
}

function GoldenLayoutStuff() {
  const myRef = useRef(null);

  var config = useMemo(
    () => ({
      content: [
        {
          type: "row",
          content: [
            {
              type: "component",
              componentName: "example",
              componentState: { text: "Component 1" }
            },
            {
              type: "component",
              componentName: "example",
              componentState: { text: "Component 2" }
            },
            {
              type: "component",
              componentName: "example",
              componentState: { text: "Component 3" }
            }
          ]
        }
      ]
    }),
    []
  );

  useLayoutEffect(() => {
    const myLayout = new GoldenLayout(config, myRef.current);

    myLayout.registerComponent("example", function (container, state) {
      container.getElement().html("<h2>" + state.text + "</h2>");
    });

    myLayout.init();
  }, [config]);

  return <div ref={myRef} style={{ height: "100%", width: "100%" }}></div>;
}
