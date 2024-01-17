"use client";
import React from "react";
import { toast } from "../ui/use-toast";
import { RxCross1 } from "react-icons/rx";
import { Button } from "../ui/button";
import { DeleteForm } from "@/actions/form";

type Props = { id: number };

const DeleteFormButton = (props: Props) => {
  return (
    <Button
      variant={"outline"}
      onClick={async () => {
        const val = await DeleteForm(props.id);
        if (val === "200") {
          toast({
            title: "Success",
            description: "Form Deleted Successfully",
          });
        } else if (val === "Remove all submissions first!") {
          toast({
            title: "Error",
            description: "Remove all form submissions first!",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Error",
            description: "Something went Wrong!",
            variant: "destructive",
          });
        }
      }}
      asChild
      className="ml-1 text-sm"
    >
      <RxCross1 className="text-red-800 w-12 m-3 text-sm gap-4 hover:text-red-300 hover:scale-110" />
    </Button>
  );
};

export default DeleteFormButton;
