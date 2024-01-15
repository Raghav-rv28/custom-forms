"use server";

import { currentUser } from "@clerk/nextjs";
import prisma from "@/lib/prisma";
import { formSchema, formSchemaType } from "@/schemas/form";

class UserNotFoundError extends Error {}

export async function GetFormStats() {
  // console.time("getFormStats Time:");
  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundError();
  }

  const stats = await prisma?.form.aggregate({
    where: {
      userId: user.id,
    },
    _sum: {
      visits: true,
      submissions: true,
    },
  });

  const visits = stats?._sum.visits || 0;
  const submissions = stats?._sum.submissions || 0;

  let submissionRate = 0;
  if (visits > 0) {
    submissionRate = (submissions / visits) * 100;
  }
  // console.timeEnd("getFormStats Time:");
  return {
    visits,
    submissions,
    submissionRate,
    bounceRate: 100 - submissionRate,
  };
}

export async function CreateForm(data: formSchemaType) {
  // console.time("CreateForm Time:");
  const validation = formSchema.safeParse(data);
  if (!validation.success) {
    throw new Error("form not valid");
  }
  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundError();
  }

  const form = await prisma.form.create({
    data: {
      userId: user.id,
      ...data,
    },
  });

  if (!form) {
    throw new Error("something went wrong");
  }

  // console.timeEnd("CreateForm Time:");
  return form.id;
}

export async function GetForms() {
  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundError();
  }
  return await prisma.form.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function GetFormById(id: number) {
  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundError();
  }
  return await prisma.form.findUnique({
    where: {
      userId: user.id,
      id: id,
    },
  });
}
