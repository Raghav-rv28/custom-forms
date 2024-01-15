import { GetFormById } from "@/actions/form";
import FormBuilder from "@/components/custom/FormBuilder";
import React from "react";

type Props = {
  params: {
    id: string;
  };
};

const BuilderPage = async (props: Props) => {
  const form = await GetFormById(Number(props.params.id));
  if (!form) {
    throw new Error("form not found!");
  }
  return <FormBuilder form={form} />;
};

export default BuilderPage;
