import React from "react";

type Props = {};

const DesignerSideBar = (props: Props) => {
  return (
    <aside
      className="w-[400px] max-w-[400px] flex flex-col flex-grow gap-2
  border-l-2 border-muted p-4 bg-background overflow-y-auto h-full"
    >
      Elements
    </aside>
  );
};

export default DesignerSideBar;
