import React from "react";
import nanoid from "nanoid";
import { useToggle } from "react-use";
import { useClickListener } from "./useClickListener";

const useInputState = (defaultValue = "") => {
  const [state, setState] = React.useState(defaultValue);

  const updateState = React.useCallback(event => {
    const { value } = event.target;

    setState(oldState => {
      return value;
    });
  }, []);

  return [state, updateState];
};

const useParagraphState = props => {
  const [children, setChildren] = useInputState("Some text here...");
  const [fontSize, setFontSize] = useInputState("24px");
  const [letterSpacing, setLetterSpacing] = useInputState("0.5px");
  const [lineHeight, setLineHeight] = useInputState("80%");
  const [fontFamily, setFontFamily] = useInputState("Red Hat Display");
  const [fontWeight, setFontWeight] = useInputState("400");
  const [width, setWidth] = useInputState("auto");
  const [height, setHeight] = useInputState("auto");
  const [zIndex, setZIndex] = useInputState("100");

  return {
    children,
    setChildren,
    fontSize,
    setFontSize,
    letterSpacing,
    setLetterSpacing,
    lineHeight,
    setLineHeight,
    fontFamily,
    setFontFamily,
    width,
    setWidth,
    height,
    setHeight,
    fontWeight,
    setFontWeight,
    zIndex,
    setZIndex,
    minWidth: "152px"
  };
};

const useImageState = props => {
  const [children, setChildren] = useInputState(null);
  const [width, setWidth] = useInputState("300px");
  const [height, setHeight] = useInputState("auto");
  const [zIndex, setZIndex] = useInputState("100");
  const [src, setSrc] = useInputState(
    "https://www.logistec.com/wp-content/uploads/2017/12/placeholder.png"
  );

  return {
    children,
    setChildren,
    width,
    setWidth,
    height,
    setHeight,
    zIndex,
    setZIndex,
    src,
    setSrc
  };
};

const states = {
  p: useParagraphState,
  img: useImageState
};

export const useBaseElementState = props => {
  const useElementState = states[props.tag];
  const variables = useElementState(props);
  const [isTooltipOpen, toggleTooltip] = useToggle(false);
  const [isDrawerOpen, toggleDrawer] = useToggle(false);
  const handleId = React.useRef(`handle-${props.uid}`);

  useClickListener(toggleTooltip, toggleDrawer, props.uid);

  const outlinedClass = isTooltipOpen ? "outlinedElement" : "";

  return {
    ...props,
    variables,
    handleId: handleId.current,
    isTooltipOpen,
    toggleTooltip,
    isDrawerOpen,
    toggleDrawer,
    outlinedClass
  };
};
