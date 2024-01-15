import React from "react";
import { Button } from "../ui/button";
import { MdOutlinePublish } from "react-icons/md";
type Props = {};

const PublishFormBtn = (props: Props) => {
  return (
    <Button variant={"outline"} className="gap-2">
      Preview
      <MdOutlinePublish className="h-6 w-6"></MdOutlinePublish>
    </Button>
  );
};

export default PublishFormBtn;
