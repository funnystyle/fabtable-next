import React, { useLayoutEffect, useMemo, useRef } from "react";
// import GoldenLayout from "golden-layout";
import dynamic from 'next/dynamic';
import 'golden-layout/src/css/goldenlayout-base.css';
import 'golden-layout/src/css/goldenlayout-light-theme.css';

const GoldenLayout = dynamic(() => import('golden-layout'), { ssr: false });

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
            {type: "stack", content: [
            {
              type: "component",
              componentName: "example",
              componentState: { text: "Component 1" },
              isClosable: false,
              reorderEnabled: false,
            },
            {
              type: "component",
              componentName: "example",
              componentState: { text: "Component 2" },
              isClosable: false,
              reorderEnabled: false,
            },
          ]},
            {
              type: "component",
              componentName: "example",
              componentState: { text: "Component 3" },
              isClosable: false,
              reorderEnabled: false,
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

      // console.log("layoutSettings", container.layoutManager.config);

      // @see https://github.com/golden-layout/golden-layout/issues/491
      container.layoutManager.config.settings = {
        ...container.layoutManager.config.settings,
        // showMaximiseIcon: false,
        showPopoutIcon: false,
        showCloseIcon: false,
        reorderEnabled: false,
      }
    });

    myLayout.init();
  }, [config]);

  return <div ref={myRef} style={{ height: "100%", width: "100%" }}></div>;
}
