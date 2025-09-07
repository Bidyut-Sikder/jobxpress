import { benefits } from "@/components/general/BenefitsSelector";
import JsonToHtml from "@/components/general/JsonToHtml";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { prisma } from "@/lib/db";
import { getFlagEmoji } from "@/lib/utils";

import { Heart } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";

const getJob = async (jobId: string) => {
  const jobData = await prisma.jobPost.findUnique({
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
  });
  if (!jobData) {
    return notFound();
  }
  return jobData;
};
type Params = Promise<{ jobId: string }>;
const JobIdPage = async ({ params }: { params: Params }) => {
  const { jobId } = await params;
  const job = await getJob(jobId);

  return (
    <div className="grid lg:grid-cols-3 gap-8 bg-amberr-300">
      <div className="space-y-8 col-span-2">
        <div className="flex items-center justify-between">
          <div className="">
            <h1 className="text-3xl font-bold "> {job.jobTitle}</h1>
            <div className="flex items-center gap-2 mt-2">
              <p className="font-medium"> {job.company.name}</p>
              <Badge className="rounded-full " variant={"secondary"}>
                {job.employmentType}
              </Badge>
              <span className="hidden md:inline text-muted-foreground">*</span>
              <Badge className="rounded-full">
                {getFlagEmoji(job.location) && (
                  <span className="mr-1">{getFlagEmoji(job.location)}</span>
                )}
                {job.location}
              </Badge>
            </div>
          </div>
          <Button variant={"outline"}>
            <Heart className="size-4" />
            Save Job
          </Button>
        </div>
        <section>
          <JsonToHtml json={JSON.parse(job.jobDescription)} />
        </section>
        <section>
          <h3 className="font-semibold">Benefits</h3>
          <div className="flex flex-wrap gap-3">
            {benefits.map((benefit) => {
              const isOffered = job.benefits.includes(benefit.id);

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
                  job.createdAt.getTime() +
                    job.listingDuration * 24 * 60 * 60 * 1000
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
                {job.createdAt.toLocaleDateString("en-US", {
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
                {job.employmentType.toUpperCase()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground ">Location</span>
              <span className="text-sm">
                {getFlagEmoji(job.location) && (
                  <span className="mr-1">{getFlagEmoji(job.location)}</span>
                )}{" "}
                {job.location}
              </span>
            </div>
          </div>
        </Card>

        {/* company details */}
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Image
                src={job.company.logo}
                className="rounded-full size-12 "
                width={48}
                height={48}
                alt="company logo"
              />
              <div className="flex flex-col ">
                <h3 className="font-semibold"> {job.company.name}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {job.company.about}
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
