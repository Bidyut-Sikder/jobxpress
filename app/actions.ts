"use server";

import arcjet, { detectBot, shield } from "@/lib/arcjet";
import { prisma } from "@/lib/db";
import { inngest } from "@/lib/inngest/client";
import { jobListingDurationPricing } from "@/lib/joblistingDurationPricing";
import { requireUser } from "@/lib/requireUser";
import { stripe } from "@/lib/stripe";
import { companySchema, jobSchema, jobSeekerSchema } from "@/lib/zodSchemas";
import { request } from "@arcjet/next";
import { revalidatePath } from "next/cache";

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

  //triggering inngest email-sending-function
  // await inngest.send({
  //   name: "job-listing-email",
  //   data: {
  //     userId: session.id,
  //     email: session.email,
  //   },
  // });

  return redirect("/");
};

export const createJob = async (data: z.infer<typeof jobSchema>) => {
  const user = await requireUser();

  const req = await request();

  const decision = await aj.protect(req);

  if (decision.isDenied()) {
    throw new Error("Forbidden");
  }

  const validateData = jobSchema.parse(data);

  const company = await prisma.company.findUnique({
    where: {
      userId: user.id,
    },
    select: {
      id: true,
      user: {
        select: {
          stripeCustomerId: true,
        },
      },
    },
  });

  if (!company?.id) {
    return redirect("/");
  }

  //stripe starts here
  let stripeCustomerId = company.user.stripeCustomerId;

  if (!stripeCustomerId) {
    const customer = await stripe.customers.create({
      email: user.email as string,
      name: user.name as string,
    });

    stripeCustomerId = customer.id;
    //update user with stripe customer id

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        stripeCustomerId: customer.id,
      },
    });
  }

  const jobPost = await prisma.jobPost.create({
    data: {
      jobTitle: validateData.jobTitle,
      employmentType: validateData.employmentType,
      location: validateData.location,
      salaryFrom: validateData.salaryFrom,
      salaryTo: validateData.salaryTo,
      jobDescription: validateData.jobDescription,
      listingDuration: validateData.listingDuration,
      benefits: validateData.benefits,
      companyId: company.id,
    },
    select: {
      id: true,
    },
  });

  const findPricingTier = jobListingDurationPricing.find(
    (tier) => tier.days === validateData.listingDuration
  );

  if (!findPricingTier) {
    throw new Error("Invalid Listing Duration Selected.");
  }

  //triggering inngest job expiration function
  await inngest.send({
    name: "trigger/job-expiration",
    data: {
      jobId: jobPost.id,
      expirationDays: validateData.listingDuration,
    },
  });

  const stripeCheckoutSession = await stripe.checkout.sessions.create({
    customer: stripeCustomerId,
    line_items: [
      {
        price_data: {
          product_data: {
            name: `Job Posting - ${findPricingTier.days} Days`,
            description: findPricingTier.description,
            images: [
              "https://wq6bmvh8f6.ufs.sh/f/7pSdDBRUcLQ3DESRAdnptOJwA3yH0pdKPc7LqQ5h61En2TfB",
            ],
          },
          currency: "USD",
          unit_amount: findPricingTier.price * 100, //1.00*100=100 we have to make it for database
        },
        quantity: 1,
      },
    ],
    metadata: {
      jobId: jobPost.id,
    },
    mode: "payment",
    success_url: `http://localhost:3000/payment/success`,
    cancel_url: `http://localhost:3000/payment/cancel`,
  });

  return redirect(stripeCheckoutSession.url as string);
};

export const saveJobPost = async (jobId: string) => {
  const user = await requireUser();
  const req = await request();

  const decision = await aj.protect(req);
  if (decision.isDenied()) {
    throw new Error("Forbidden.");
  }

  await prisma.savedJobPosts.create({
    data: {
      jobPostId: jobId,
      userId: user.id as string,
    },
  });
  revalidatePath(`/job/${jobId}`);
};

export const UnSaveJobPost = async (savedJobPostId: string) => {
  const user = await requireUser();
  const req = await request();

  const decision = await aj.protect(req);
  if (decision.isDenied()) {
    throw new Error("Forbidden.");
  }

  const data = await prisma.savedJobPosts.delete({
    where: {
      id: savedJobPostId,
      userId: user.id as string,
    },

    select: {
      jobPostId: true,
    },
  });
  revalidatePath(`/job/${data.jobPostId}`);
};

export const UpdateJobPost = async (
  job: z.infer<typeof jobSchema>,
  jobId: string
) => {
  const user = await requireUser();

  const req = await request();

  const decision = await aj.protect(req);

  if (decision.isDenied()) {
    throw new Error("Forbidden");
  }

  const validateData = jobSchema.parse(job);

  const res = await prisma.jobPost.update({
    where: {
      id: jobId,
      company: {
        userId: user.id,
      },
    },
    data: {
      jobTitle: validateData.jobTitle,
      employmentType: validateData.employmentType,
      location: validateData.location,
      salaryFrom: validateData.salaryFrom,
      salaryTo: validateData.salaryTo,
      jobDescription: validateData.jobDescription,
      benefits: validateData.benefits,
    },
  });

  return redirect("/my-jobs");
};
