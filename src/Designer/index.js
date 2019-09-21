import React from "react";
import nanoid from "nanoid";
import Icon from "@clayui/icon";
import useImmer from "use-immer";
import { useList } from "react-use";

import { filterOutElement } from "./utilities";

import { DEFAULT_ELEMENTS } from "./consts";

const DesignerContext = React.createContext();

export const DesignerProvider = props => {
  const [elements, { set, push }] = useList();

  const addElement = React.useCallback(element => {
    push({ ...DEFAULT_ELEMENTS[element], uid: `${element}-${nanoid()}` });
  }, []);

  const removeElement = React.useCallback(uid => {
    set(elements => filterOutElement(elements, uid));
  }, []);

  return (
    <DesignerContext.Provider
      value={{
        elements,
        addElement,
        removeElement
      }}
    >
      {props.children}
    </DesignerContext.Provider>
  );
};

export const useDesigner = () => {
  return React.useContext(DesignerContext);
};

export default DesignerContext;
