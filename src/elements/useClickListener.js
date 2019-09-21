import React from "react";

export const useClickListener = (toggleTooltip, toggleDrawer, id) => {
  React.useEffect(() => {
    const handler = event => {
      const me = document.getElementById(id);
      const drawerPortal = document.getElementById("drawerPortal");
      const isMeClick = event.target === me;
      const isClickInMe = event.target.contains(me);
      const isClickInDrawer = drawerPortal.contains(event.target);

      if (isClickInDrawer) return;

      if (event.target.id === "Page" || !isMeClick || !isClickInMe) {
        toggleTooltip(false);
        toggleDrawer(false);
      }
    };

    window.addEventListener("click", handler);

    return () => {
      window.removeEventListener("click", handler);
    };
  }, []);
};
