"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useEffect } from "react";

type Props = { error: Error };

function ErrorPage({ error }: Props) {
  useEffect(() => {
    console.log(error);
  }, [error]);
  return (
    <div className="flex w-full h-full flex-col items-center justify-center">
      <h2 className="text-destructive text-4xl">Uhoh! Something went Wrong!</h2>
      <Button asChild className="mt-5" variant={"outline"}>
        <Link href={"/"}>Go back to home</Link>
      </Button>
    </div>
  );
}

export default ErrorPage;
