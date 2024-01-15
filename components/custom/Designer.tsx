import React from "react";
import DesignerSideBar from "./DesignerSideBar";
import { useDroppable } from "@dnd-kit/core";
type Props = {};

const Designer = (props: Props) => {
  const droppable = useDroppable({
    id: "designer-drop-area",
    data: {
      isDesignerDropArea: true,
    },
  });
  return (
    <div className="w-full h-full flex">
      <div className="p-4 w-full">
        <div className="bg-background max-w-[920px] h-full m-auto rounded-xl flex flex-col items-center justify-start flex-1 overflow-y-auto">
          <p className="text-3xl text-muted-foreground flex flex-grow items-center font-bold">
            Drop Here
          </p>
        </div>
      </div>
      <DesignerSideBar />
    </div>
  );
};

export default Designer;
