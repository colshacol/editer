import React from "react";
import styled from "styled-components";

import { useClickListener } from "./useClickListener";
import { useElementState } from "./useBaseElementState";

const useParagraphState = props => {
  const elementState = useElementState(props);


  return {
    ...props,
    ...elementState,
  }
};

export const Paragraph = props => {
  return (

  )
}
