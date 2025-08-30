"use server";

import arcjet, { detectBot, shield } from "@/lib/arcjet";
import { prisma } from "@/lib/db";
import { requireUser } from "@/lib/requireUser";
import { companySchema, jobSeekerSchema } from "@/lib/zodSchemas";
import { request } from "@arcjet/next";

import { redirect } from "next/navigation";
import { z } from "zod";

const aj = arcjet
  .withRule(
    shield({
      mode: "LIVE",
    })
  )
  .withRule(
    detectBot({
      mode: "LIVE",
      allow: [
        // "CATEGORY:SEARCH_ENGINE"
      ],
    })
  );

export const createCompany = async (data: z.infer<typeof companySchema>) => {
  const session = await requireUser();

  const req = await request();

  const decision = await aj.protect(req);
  if (decision.isDenied()) {
    throw new Error("Forbidden");
  }
  const validateData = companySchema.parse(data);

  await prisma.user.update({
    where: {
      id: session.id,
    },
    data: {
      onboardingCompleted: true,
      userType: "COMPANY",
      Company: {
        create: {
          ...validateData,
        },
      },
    },
  });
  return redirect("/");
};

export const createJobSeeker = async (
  data: z.infer<typeof jobSeekerSchema>
) => {
  const session = await requireUser();
  const req = await request();
  const decision = await aj.protect(req);
  if (decision.isDenied()) {
    throw new Error("Forbidden");
  }
  const validateData = jobSeekerSchema.parse(data);

  await prisma.user.update({
    where: {
      id: session.id,
    },
    data: {
      onboardingCompleted: true,
      userType: "JOB_SEEKER",
      JobSeeker: {
        create: {
          ...validateData,
        },
      },
    },
  });
  return redirect("/");
};
