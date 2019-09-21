import React from "react";
import styled from "styled-components";
import Icon from "@clayui/icon";
import { useDesigner } from "./Designer";

export const ElementBar = props => {
  const designer = useDesigner();

  return (
    <SideBar>
      <Icon symbol="text-editor" onClick={() => designer.addElement("p")} />
      <Icon symbol="picture" onClick={() => designer.addElement("img")} />
    </SideBar>
  );
};

const SideBar = styled.div`
  width: 60px;
  height: 500px;
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 4px;
  left: 0;
  top: 0;
  background: #fff;
  z-index: 10;
  user-select: none;
  position: absolute;
  top: 24px;
  left: 24px;
  background: #fff;
  padding: 4px 24px;
  display: flex;
  color: #000;
  padding-top: 12px;

  > svg {
    margin-bottom: 24px;
    cursor: pointer;
    width: 36px;

    :hover {
      color: rebeccapurple;
    }
  }
`;
