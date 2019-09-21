import React from "react";
import styled from "styled-components";
import Popup from "reactjs-popup";
import { useToggle } from "react-use";

import Icon from "@clayui/icon";
import Draggable from "react-draggable";
import { useDesigner } from "./Designer";
import { SketchPicker } from "react-color";
import { useBaseElementState } from "./elements/useBaseElementState";
import { Portal } from "react-portal";
import TextField from "@atlaskit/textfield";
import TextArea from "@atlaskit/textarea";
import Box from "ui-box";

const CanvasContainer = styled.div`
  width: 100vw;
  height: 90vh;
`;

const Page = styled.div`
  width: 8.5in;
  height: 11in;
  min-width: 8.5in;
  min-height: 11in;
  transition: all 0.2s;
  transform-origin: top left;
  border: 2px solid #f8f8f8;
  background: #fff;
  box-shadow: 1px 3px 16px -2px rgba(0, 0, 0, 0.1);
  margin: 2rem auto;
  position: relative;
  display: flex;

  p {
    display: inline-flex;
    margin: 0;
  }
`;

const DraggableTarget = styled.span`
  #handle {
    z-index: 100000;
  }
`;

const Drawer = styled.div`
  height: 100vh;
  width: 300px;
  background: white;
  box-shadow: 1px 3px 16px 0px rgba(0, 0, 0, 0.1);
  padding: 1rem;
`;

const Dragger = props => {
  return (
    <Draggable
      bounds="#Page"
      handle={"#" + props.handleId}
      enableUserSelectHack
    >
      <DraggableTarget style={{ position: "absolute", zIndex: props.zIndex }}>
        {props.children}
      </DraggableTarget>
    </Draggable>
  );
};

const ActionsTooltip = props => {
  return (
    <Popup
      onOpen={() => props.toggleTooltip(true)}
      onClose={() => props.toggleTooltip(false)}
      style={{ top: "100px" }}
      open={props.isTooltipOpen}
      position="left bottom"
      arrow={false}
      closeOnEscape
      closeOnDocumentClick
    >
      {props.children}
    </Popup>
  );
};

const ElementWithOptionsTooltip = props => {
  const element = useBaseElementState(props);

  const ElementDrawer = drawers[props.tag];

  return (
    <>
      <Dragger handleId={element.handleId} zIndex={element.variables.zIndex}>
        <element.tag
          src={element.variables.src}
          style={{ ...element.style, ...element.variables }}
          id={element.uid}
          onClick={() => element.toggleTooltip(open => !open)}
          className={element.outlinedClass}
        >
          {element.variables.children}
        </element.tag>

        <ActionsTooltip
          isTooltipOpen={element.isTooltipOpen}
          toggleTooltip={element.toggleTooltip}
        >
          <>
            <span id={element.handleId}>
              <Icon symbol="move" />
            </span>
            <span onClick={element.toggleDrawer}>
              <Icon symbol="pencil" />
            </span>
            <span onClick={() => props.removeElement(element.uid)}>
              <Icon symbol="trash" />
            </span>
          </>
        </ActionsTooltip>
      </Dragger>

      {element.isDrawerOpen ? (
        <Portal node={document.getElementById("drawerPortal")}>
          <ElementDrawer {...element} />
        </Portal>
      ) : null}
    </>
  );
};

const ParagraphDrawer = props => {
  return (
    <Drawer id="drawer">
      <label htmlFor="children">small</label>
      <TextArea
        value={props.variables.children}
        name="children"
        onChange={props.variables.setChildren}
      />

      <Box height="1rem" />
      <label htmlFor="width">Width</label>
      <TextField
        width="small"
        value={props.variables.width}
        onChange={props.variables.setWidth}
        name="width"
      />

      <Box height="1rem" />
      <label htmlFor="height">Height</label>
      <TextField
        width="small"
        value={props.variables.height}
        onChange={props.variables.setHeight}
        name="height"
      />

      <Box height="1rem" />
      <label htmlFor="zIndex">Z-Index</label>
      <TextField
        width="small"
        value={props.variables.zIndex}
        onChange={props.variables.setZIndex}
        name="zIndex"
      />

      <Box height="1rem" />
      <label htmlFor="fontSize">Font Size</label>
      <TextField
        width="small"
        value={props.variables.fontSize}
        onChange={props.variables.setFontSize}
        name="fontSize"
      />

      <Box height="1rem" />
      <label htmlFor="fontWeight">Font Weight</label>
      <TextField
        width="small"
        value={props.variables.fontWeight}
        onChange={props.variables.setFontWeight}
        name="fontWeight"
      />

      <Box height="1rem" />
      <label htmlFor="letterSpacing">Letter Spacing</label>
      <TextField
        width="small"
        value={props.variables.letterSpacing}
        name="letterSpacing"
        onChange={props.variables.setLetterSpacing}
      />

      <Box height="1rem" />
      <label htmlFor="lineHeight">Line Height</label>
      <TextField
        width="small"
        value={props.variables.lineHeight}
        onChange={props.variables.setLineHeight}
        name="lineHeight"
      />

      <Box height="1rem" />
      <label htmlFor="fontFamily">Font Family</label>
      <TextField
        width="small"
        value={props.variables.fontFamily}
        onChange={props.variables.setFontFamily}
        name="fontFamily"
      />
    </Drawer>
  );
};

const ImageDrawer = props => {
  return (
    <Drawer id="drawer">
      <Box height="1rem" />
      <label htmlFor="src">URL</label>
      <TextField
        width="small"
        value={props.variables.src}
        onChange={props.variables.setSrc}
        name="src"
      />

      <Box height="1rem" />
      <label htmlFor="width">Width</label>
      <TextField
        width="small"
        value={props.variables.width}
        onChange={props.variables.setWidth}
        name="width"
      />

      <Box height="1rem" />
      <label htmlFor="height">Height</label>
      <TextField
        width="small"
        value={props.variables.height}
        onChange={props.variables.setHeight}
        name="height"
      />

      <Box height="1rem" />
      <label htmlFor="zIndex">Z-Index</label>
      <TextField
        width="small"
        value={props.variables.zIndex}
        onChange={props.variables.setZIndex}
        name="zIndex"
      />
    </Drawer>
  );
};

const drawers = {
  p: ParagraphDrawer,
  img: ImageDrawer
};

const Canvas = props => {
  const designer = useDesigner();

  return (
    <CanvasContainer data-testid="Canvas">
      <Page id="Page">
        {designer.elements.map(element => (
          <ElementWithOptionsTooltip
            {...element}
            key={element.uid}
            removeElement={designer.removeElement}
          />
        ))}
      </Page>
    </CanvasContainer>
  );
};

export default Canvas;
