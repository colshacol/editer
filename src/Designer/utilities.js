import nanoid from "nanoid";

export const filterOutElement = (elements, uid) => {
  return elements.filter(element => {
    return element.uid !== uid;
  });
};

export const findElement = (elements, uid) => {
  return elements.find(element => {
    return element.uid === uid;
  });
};

export const withUpdatedElement = (elements, uid, handler) => {
  return elements.map(element => {
    return element.uid === uid ? handler(element) : element;
  });
};
