import React from "react";

import { prisma } from "@/lib/db";
import EmptyState from "./EmptyState";
import JobCard from "./JobCard";
import MainPagination from "./MainPagination";
import { jobPostStatus } from "@prisma/client";

const getData = async ({
  pageNumber = 1,
  pageSize = 2,
  jobTypes = [],
}: {
  pageNumber: number;
  pageSize: number;
  jobTypes: string[];
}) => {
  console.log(jobTypes);

  const [jobs, totalCount] = await Promise.all([
    prisma.jobPost.findMany({
      where: {
        status: "ACTIVE",
        ...(jobTypes.length > 0 && {
          employmentType: { in: jobTypes },
          //best way to match string employmentType in database with this array of jobTypes
        }),
      },
      take: pageSize,
      skip: (pageNumber - 1) * pageSize,
      select: {
        jobTitle: true,
        id: true,
        salaryFrom: true,
        salaryTo: true,
        employmentType: true,
        location: true,
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
      orderBy: {
        createdAt: "desc",
      },
    }),
    prisma.jobPost.count({
      where: {
        status: "ACTIVE",
        ...(jobTypes.length > 0 && { employmentType: { in: jobTypes } }),
      },
    }),
  ]);
  return { jobs, totalPages: Math.ceil(totalCount / pageSize) };
};

const JobListings = async ({
  currentPage,
  jobTypes,
}: {
  currentPage: number;
  jobTypes: string[];
}) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const { jobs, totalPages } = await getData({
    pageNumber: currentPage,
    pageSize: 2,
    jobTypes: jobTypes,
  });

  return (
    <>
      {jobs.length > 0 ? (
        <div className="flex flex-col gap-6">
          {jobs.map((job) => (
            <JobCard job={job} key={job.id} />
          ))}
        </div>
      ) : (
        <EmptyState
          buttonText="Clear all filters"
          description=" There are no job listings available at the moment. Please check back
        later or create a new job post to get started."
          href="/"
          title="No Jobs Found."
        />
      )}
      <div className="flex justify-center mt-6">
        <MainPagination currentPage={currentPage} totalPages={totalPages} />
      </div>
    </>
  );
};

export default JobListings;
