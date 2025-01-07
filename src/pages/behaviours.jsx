import React from "react";
import { useStore } from "@/store/store";

function behaviours() {
  const {} = useStore();

  return (
    <>
      {/* <SVGComponent
        props={selectedTitle && getBehaviors() ? getBehaviors() : null}
      /> */}
    </>
  );
}

export default behaviours;
