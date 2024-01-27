"use client";
import DeleteFormButton from "@/components/custom/DeleteFormButton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@prisma/client";
import { formatDistance } from "date-fns";
import Link from "next/link";
import { BiRightArrowAlt } from "react-icons/bi";
import { FaEdit, FaWpforms } from "react-icons/fa";
import { LuView } from "react-icons/lu";

export const FormCard = ({ form }: { form: Form }) => {
  return (
    <Card className="h-[190px]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 justify-between">
          <span className="truncate font-bold">{form.name}</span>
          {form.published && <Badge>Published</Badge>}
          {!form.published && <Badge variant={"destructive"}>Draft</Badge>}
        </CardTitle>
        <CardDescription className="flex items-center justify-between text-muted-foreground text-sm">
          {formatDistance(form.createdAt, new Date(), {
            addSuffix: true,
          })}
          {form.published && (
            <span className="flex items-center gap-2">
              <LuView className="text-muted-foreground" />
              <span>{form.visits.toLocaleString()}</span>
              <FaWpforms className="text-muted-foreground" />
              <span>{form.submissions.toLocaleString()}</span>
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[20px] truncate text-sm text-muted-foreground">
        {form.description || "No Description"}
      </CardContent>
      <CardFooter>
        {form.published && (
          <div className="w-full flex flex-row">
            <Button asChild className="w-5/6 m-3 text-sm gap-4">
              <Link href={`/forms/${form.id}`}>
                View Submissions <BiRightArrowAlt />
              </Link>
            </Button>
            <DeleteFormButton id={form.id} />
          </div>
        )}
        {!form.published && (
          <Button
            variant={"secondary"}
            asChild
            className="w-full m-3 text-sm gap-4 rounded"
          >
            <Link href={`/builder/${form.id}`}>
              Edit form <FaEdit />
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
