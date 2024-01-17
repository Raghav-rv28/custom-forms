import { GetFormContentByUrl } from "@/actions/form";
import { FormElementInstance } from "@/components/custom/FormElements";
import FormSubmitComponent from "@/components/custom/FormSubmitComponent";
import React from "react";

async function SubmitPage({
  params,
}: {
  params: {
    fromUrl: string;
  };
}) {
  console.log(params.fromUrl);
  const form = await GetFormContentByUrl(params.fromUrl);

  if (!form) {
    throw new Error("form not found");
  }

  const formContent = JSON.parse(form.content) as FormElementInstance[];

  return <FormSubmitComponent formUrl={params.fromUrl} content={formContent} />;
}

export default SubmitPage;
