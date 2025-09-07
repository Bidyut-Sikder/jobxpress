import { saveJobPost, UnSaveJobPost } from "@/app/actions";
import { auth } from "@/auth";
import { benefits } from "@/components/general/BenefitsSelector";
import JsonToHtml from "@/components/general/JsonToHtml";
import LikeSubmit from "@/components/general/LikeSubmit";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import arcjet, { detectBot, tokenBucket } from "@/lib/arcjet";
import { prisma } from "@/lib/db";
import { requireUser } from "@/lib/requireUser";
import { getFlagEmoji } from "@/lib/utils";
import { request } from "@arcjet/next";

import { Heart } from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

const aj = arcjet.withRule(
  detectBot({
    mode: "LIVE",
    allow: ["CATEGORY:SEARCH_ENGINE", "CATEGORY:PREVIEW"],
  })
);

const getClient = (session: boolean) => {
  if (session) {
    return aj.withRule(
      tokenBucket({
        mode: "DRY_RUN",
        capacity: 100,
        interval: 60,
        refillRate: 30,
      })
    );
  } else {
    return aj.withRule(
      tokenBucket({
        mode: "DRY_RUN",
        capacity: 100,
        interval: 60,
        refillRate: 10,
      })
    );
  }
};

const getJob = async (jobId: string, userId?: string) => {
  const [jobData, savedJob] = await Promise.all([
    await prisma.jobPost.findUnique({
      where: {
        id: jobId,
        status: "ACTIVE",
      },
      select: {
        jobTitle: true,
        jobDescription: true,
        salaryFrom: true,
        salaryTo: true,
        employmentType: true,
        location: true,
        benefits: true,
        createdAt: true,
        listingDuration: true,
        company: {
          select: {
            name: true,
            logo: true,
            location: true,
            about: true,
          },
        },
      },
    }),
    userId
      ? await prisma.savedJobPosts.findUnique({
          where: {
            userId_jobPostId: {
              userId: userId,
              jobPostId: jobId,
            },
          },
          select: {
            id: true,
          },
        })
      : null,
  ]);

  if (!jobData) {
    return notFound();
  }
  return { jobData, savedJob };
};
type Params = Promise<{ jobId: string }>;
const JobIdPage = async ({ params }: { params: Params }) => {
  const { jobId } = await params;
  const req = await request();
  const session = await auth();

  const decision = await getClient(!!session).protect(req, { requested: 10 });

  if (decision.isDenied()) {
    throw new Error("Not Allowed");
  }

  const { jobData, savedJob } = await getJob(jobId, session?.user?.id);

  return (
    <div className="grid lg:grid-cols-3 gap-8 bg-amberr-300">
      <div className="space-y-8 col-span-2">
        <div className="flex items-center justify-between">
          <div className="">
            <h1 className="text-3xl font-bold "> {jobData.jobTitle}</h1>
            <div className="flex items-center gap-2 mt-2">
              <p className="font-medium"> {jobData.company.name}</p>
              <Badge className="rounded-full " variant={"secondary"}>
                {jobData.employmentType}
              </Badge>
              <span className="hidden md:inline text-muted-foreground">*</span>
              <Badge className="rounded-full">
                {getFlagEmoji(jobData.location) && (
                  <span className="mr-1">{getFlagEmoji(jobData.location)}</span>
                )}
                {jobData.location}
              </Badge>
            </div>
          </div>

          {session ? (
            <form
              action={
                savedJob
                  ? UnSaveJobPost.bind(null, savedJob.id)
                  : saveJobPost.bind(null, jobId)
              }
            >
              <LikeSubmit savedJob={!!savedJob} />
            </form>
          ) : (
            <Link
              className={buttonVariants({ variant: "outline" })}
              href={"/login"}
            >
              <Heart className="size-4 " />
              Save Job
            </Link>
          )}
        </div>
        <section>
          <JsonToHtml json={JSON.parse(jobData.jobDescription)} />
        </section>
        <section>
          <h3 className="font-semibold">Benefits</h3>
          <div className="flex flex-wrap gap-3">
            {benefits.map((benefit) => {
              const isOffered = jobData.benefits.includes(benefit.id);

              return (
                <Badge
                  className="cursor-not-allowed text-sm px-4 py-1.5 rounded-full"
                  key={benefit.id}
                  variant={isOffered ? "default" : "outline"}
                >
                  <span className="flex items-center gap-2">
                    {benefit.icon}
                    {benefit.label}
                  </span>
                </Badge>
              );
            })}
          </div>
        </section>
      </div>

      <div className="space-y-6 col-span-1">
        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <h3 className=" font-semibold">Apply Now</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Submit your application today and take the next step in your
                career. Our team will review your profile and get back to you
                shortly.
              </p>
            </div>
            <Button className="w-full">Apply Now</Button>
          </div>
        </Card>
        <Card className="p-6">
          <h3 className="font-semibold ">About The Job</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">
                Apply Before
              </span>
              <span className="text-sm ">
                {new Date(
                  jobData.createdAt.getTime() +
                    jobData.listingDuration * 24 * 60 * 60 * 1000
                ).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground ">Posted on</span>
              <span className="text-sm">
                {jobData.createdAt.toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground ">
                Employment Type
              </span>
              <span className="text-sm">
                {jobData.employmentType.toUpperCase()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground ">Location</span>
              <span className="text-sm">
                {getFlagEmoji(jobData.location) && (
                  <span className="mr-1">{getFlagEmoji(jobData.location)}</span>
                )}{" "}
                {jobData.location}
              </span>
            </div>
          </div>
        </Card>

        {/* company details */}
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Image
                src={jobData.company.logo}
                className="rounded-full size-12 "
                width={48}
                height={48}
                alt="company logo"
              />
              <div className="flex flex-col ">
                <h3 className="font-semibold"> {jobData.company.name}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {jobData.company.about}
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default JobIdPage;
