import JobFilters from "@/components/general/JobFilters";
import JobListings from "@/components/general/JobListings";

import React from "react";

const HomePage = () => {
  return (
    <div className="grid grid-cols-3 gap-8">
      <JobFilters />

      <div className="col-span-2 flex flex-col gap-6">
        <JobListings />
      </div>
    </div>
  );
};

export default HomePage;
