"use client";

import React, { useCallback, useRef, useState, useTransition } from "react";
import { FormElementInstance, FormElements } from "./FormElements";
import { Button } from "../ui/button";
import { HiCursorClick } from "react-icons/hi";
import { toast } from "../ui/use-toast";
import { ImSpinner2 } from "react-icons/im";
import { SubmitForm } from "@/actions/form";

function FormSubmitComponent({
  formUrl,
  content,
}: {
  content: FormElementInstance[];
  formUrl: string;
}) {
  const formValues = useRef<{ [key: string]: string }>({});
  const formErrors = useRef<{ [key: string]: string }>({});
  const [renderKey, setRenderKey] = useState(new Date().getTime());

  const [submitted, setSubmitted] = useState(false);
  const [pending, startTransition] = useTransition();

  const validateForm: () => boolean = useCallback(() => {
    for (const field of content) {
      const actualValue = formValues.current[field.id] || "";
      const {valid, errMsg} = FormElements[field.type].validate(field, actualValue);
      console.log(valid, errMsg);
      if (!valid) {
        formErrors.current[field.id] = errMsg;
      }
    }

    if (Object.keys(formErrors.current).length > 0) {
      return false;
    }

    return true;
  }, [content]);

  const submitValue = useCallback((key: string, value: string) => {
    formValues.current[key] = value;
  }, []);

  const submitForm = async () => {
    formErrors.current = {};
    const validForm = validateForm();
    if (!validForm) {
      setRenderKey(new Date().getTime());
      // show error messages
      Object.values(formErrors.current).forEach((err)=>{
        toast({
          title: "Error",
          description: err,
          variant: "destructive",
        });
      })

      return;
    }

    try {
      const jsonContent = JSON.stringify(formValues.current);
      await SubmitForm(formUrl, jsonContent);
      setSubmitted(true);
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  };

  if (submitted) {
    return (
      <div className="flex justify-center w-full h-full items-center p-8">
        <div className="max-w-[620px] flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto border shadow-xl shadow-blue-700 rounded">
          <h1 className="text-2xl font-bold">Form submitted</h1>
          <p className="text-muted-foreground">
            Thank you for submitting the form, you can close this page now.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center w-full h-full items-center p-8">
      <div
        key={renderKey}
        className="max-w-[620px] flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto border shadow-xl shadow-blue-700 rounded"
      >
        {content.map((element) => {
          const FormElement = FormElements[element.type].formComponent;
          return (
            <FormElement
              key={element.id}
              elementInstance={element}
              submitValue={submitValue}
              isInvalid={Boolean(formErrors.current[element.id])}
              defaultValue={formValues.current[element.id]}
            />
          );
        })}
        <Button
          className="mt-8"
          onClick={() => {
            startTransition(submitForm);
          }}
          disabled={pending}
        >
          {!pending && (
            <>
              <HiCursorClick className="mr-2" />
              Submit
            </>
          )}
          {pending && <ImSpinner2 className="animate-spin" />}
        </Button>
      </div>
    </div>
  );
}

export default FormSubmitComponent;
