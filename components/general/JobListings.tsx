import React from "react";
import { Card } from "../ui/card";
import { prisma } from "@/lib/db";
import EmptyState from "./EmptyState";
import JobCard from "./JobCard";

const JobListings = async () => {




  const getData = async () => {
    const data = await prisma.jobPost.findMany({
      where: {
        status: "ACTIVE",
      },
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
    });
    return data;
  };

  const data = await getData();

  return (
    <>
      {data.length > 0 ? (
        <div className="flex flex-col gap-6">
          {data.map((job) => (
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

     
    </>
  );
};

export default JobListings;
