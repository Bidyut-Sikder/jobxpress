import JobFilters from "@/components/general/JobFilters";
import JobListingLoading from "@/components/general/JobListingLoading";
import JobListings from "@/components/general/JobListings";

import React, { Suspense } from "react";

const HomePage = () => {
  return (
    <div className="grid grid-cols-3 gap-8">
      <JobFilters />

      <div className="col-span-2 flex flex-col gap-6">
        <Suspense fallback={<JobListingLoading />}>
          <JobListings />
        </Suspense>
      </div>
    </div>
  );
};

export default HomePage;
