"use client";
import { Form } from "@prisma/client";
import React from "react";
import PreviewDialogBtn from "./PreviewDialogBtn";
import SaveFormBtn from "./SaveFormBtn";
import PublishFormBtn from "./PublishFormBtn";
import Designer from "./Designer";
import { DndContext } from "@dnd-kit/core";

type Props = { form: Form };

function FormBuilder({ form }: Props) {
  return (
    <DndContext>
      <main className="flex flex-col w-full">
        <nav className="flex justify-between border-b-2 p-4 gap-3 items-center">
          <h2 className="truncate font-medium">
            Form:
            <span className="text-muted-foreground ml-2">{form.name}</span>
          </h2>
          <div className="flex items-center gap-2">
            <PreviewDialogBtn />
            {!form.published && (
              <>
                <SaveFormBtn />
                <PublishFormBtn />
              </>
            )}
          </div>
        </nav>
        <div
          className="flex w-full flex-grow items-center justify-center relative overflow-y-auto h-[200px] bg-accent
          bg-[url(/paper.svg)] dark:  bg-[url(/paper-dark.svg)]"
        >
          <Designer />
        </div>
      </main>
    </DndContext>
  );
}

export default FormBuilder;
