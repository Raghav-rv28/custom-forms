import React from "react";
import { Button } from "../ui/button";
import { HiSaveAs } from "react-icons/hi";
type Props = {};

const SaveFormBtn = (props: Props) => {
  return (
    <Button variant={"outline"} className="gap-2">
      Preview
      <HiSaveAs className="h-6 w-6"></HiSaveAs>
    </Button>
  );
};

export default SaveFormBtn;
