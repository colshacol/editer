import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { ElementBar } from "./ElementBar";
import "./styles.css";
import "react-tippy/dist/tippy.css";

import Button from "@clayui/button";
import ClayIcon, { ClayIconSpriteContext } from "@clayui/icon";

import { DesignerProvider } from "./Designer";
import { ZoomProvider } from "./zoom";

import Canvas from "./Canvas";
import "@clayui/css/lib/css/atlas.css";

const Body = styled.div`
  box-sizing: border-box;
  height: 100vh;
  width: 100vw;
  max-width: 100vw;
  max-height: 100vh;
  position: relative;
`;

function App() {
  return (
    <ClayIconSpriteContext.Provider value="">
      <ZoomProvider>
        <DesignerProvider>
          <>
            <Body>
              <ElementBar />
              <Canvas />
            </Body>
            <div id="drawerPortal"></div>
          </>
        </DesignerProvider>
      </ZoomProvider>
    </ClayIconSpriteContext.Provider>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
