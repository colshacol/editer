import React from "react";
import { useHotkeys } from "react-hotkeys-hook";
import styled from "styled-components";

export const ZoomContext = React.createContext({});

export const ZoomProvider = props => {
  const [zoomAmount, setZoomAmount] = React.useState(1);

  const zoomIn = () => {
    console.log("zooming in from ", zoomAmount);
    setZoomAmount(zoomAmount + 0.1);
  };

  const zoomOut = () => {
    console.log("zooming out from ", zoomAmount);
    setZoomAmount(zoomAmount - 0.1);
  };

  useHotkeys("alt+=", () => setZoomAmount(zoomAmount => zoomAmount + 0.1));
  useHotkeys("alt+-", () => setZoomAmount(zoomAmount => zoomAmount - 0.1));
  useHotkeys("alt+0", () => setZoomAmount(1));

  const zoomPercentage = `${Math.floor(zoomAmount * 100)}%`;

  return (
    <ZoomContext.Provider
      value={{
        zoomAmount,
        zoomIn,
        zoomOut,
        setZoomAmount,
        zoomPercentage
      }}
    >
      {props.children}
    </ZoomContext.Provider>
  );
};

const ZoomContainer = styled.div`
  flex-direction: row;
  align-items: center;
  user-select: none;
  position: absolute;
  bottom: 24px;
  right: 24px;
  background: #000;
  border: 2px solid #111;
  border-radius: 50px;
  padding: 4px 24px;
  display: flex;
  z-index: 10;
`;

const ZoomText = styled.p`
  color: #fff;
  font-size: 18px;
  padding: 12px;
  cursor: pointer;

  &:first-of-type {
    padding-left: 0;
  }

  &:nth-of-type(2) {
    cursor: initial;
  }

  &:last-of-type {
    padding-right: 0;
  }
`;

export const ZoomController = props => {
  const { zoomOut, zoomPercentage, zoomIn } = useZoom();

  return (
    <ZoomContainer>
      <ZoomText onClick={zoomOut}>-</ZoomText>
      <ZoomText>{zoomPercentage}</ZoomText>
      <ZoomText onClick={zoomIn}>+</ZoomText>
    </ZoomContainer>
  );
};

export const useZoom = () => {
  return React.useContext(ZoomContext);
};
