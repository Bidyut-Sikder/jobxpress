import EditJobForm from "@/components/forms/EditJobForm";
import { prisma } from "@/lib/db";
import { requireUser } from "@/lib/requireUser";
import { notFound } from "next/navigation";
import React from "react";

const getData = async (userId: string, jobId: string) => {
  const data = await prisma.jobPost.findUnique({
    where: {
      id: jobId,
      company: {
        userId: userId,
      },
    },
    select: {
      benefits: true,
      id: true,
      jobTitle: true,
      jobDescription: true,
      salaryFrom: true,
      salaryTo: true,
      employmentType: true,
      listingDuration: true,
      location:true,
      company: {
        select: {
          about: true,
          name: true,
          website: true,
          location: true,
          xAccount: true,
          logo: true,
        },
      },
    },
  });

  if (!data) {
    return notFound();
  }
  return data;
};
type Params = Promise<{ jobId: string }>;
const EditPage = async ({ params }: { params: Params }) => {
  const { jobId } = await params;
  const session = await requireUser();

  const job = await getData(session.id as string, jobId);

  return <EditJobForm job={job} />;
};

export default EditPage;
