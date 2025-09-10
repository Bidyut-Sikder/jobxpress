import JobFilters from "@/components/general/JobFilters";
import JobListingLoading from "@/components/general/JobListingLoading";
import JobListings from "@/components/general/JobListings";

import React, { Suspense } from "react";

type searchParams = Promise<{
  page: number;
  jobTypes?: string;
}>;

const HomePage = async ({ searchParams }: { searchParams: searchParams }) => {
  const { page, jobTypes } = await searchParams;

  const currentPage = Number(page) || 1;
  const jobTypesArray = jobTypes?.split(",") || [];
  return (
    <div className="grid grid-cols-3 gap-8">
      <JobFilters />

      <div className="col-span-2 flex flex-col gap-6">
        <Suspense fallback={<JobListingLoading />} key={currentPage}>
          <JobListings currentPage={currentPage} jobTypes={jobTypesArray} />
        </Suspense>
      </div>
    </div>
  );
};

export default HomePage;
