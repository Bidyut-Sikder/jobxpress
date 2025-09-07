import { benefits } from "@/components/general/BenefitsSelector";
import JsonToHtml from "@/components/general/JsonToHtml";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/db";
import { getFlagEmoji } from "@/lib/utils";

import { Heart } from "lucide-react";
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
    <div className="grid grid-cols-[1fr,400px] gap-4 bg-amberg-300">
      <div className="space-y-8">
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
                  //   onClick={() => toggleBenefit(benefit.id)}
                  className="cursor-pointer transition-all hover:scale-105
                         active:scale-95 text-sm px-4 py-1.5 rounded-full"
                  key={benefit.id}
                  variant={isOffered ? "default" : "outline"}
                  // variant={"outline"}
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
    </div>
  );
};

export default JobIdPage;
