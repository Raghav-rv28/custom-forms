import React from "react";
import { Button } from "../ui/button";
import { MdPreview } from "react-icons/md";
type Props = {};

const PreviewDialogBtn = (props: Props) => {
  return (
    <Button variant={"outline"} className="gap-2">
      Preview
      <MdPreview className="h-6 w-6"></MdPreview>
    </Button>
  );
};

export default PreviewDialogBtn;
