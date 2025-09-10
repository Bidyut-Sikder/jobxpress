import React from "react";
import { Card } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const JobListingLoading = () => {
  return (
    <div className="flex flex-col gap-6">
      {Array.from({ length: 4 }).map((_, i) => (
        <Card className="p-6" key={i}>
          <div className="flex items-start gap-4">
            <Skeleton className="size-14 rounded" />
            <div className="space-y-3 flex flex-col ">
              <Skeleton className="h-5 w-[300px]" />
              <Skeleton className="h-5 w-[200px]" />
              <div className="flex gap-4 mt-4">
                <Skeleton className="h-4 w-[120px]" />
                <Skeleton className="h-4 w-[120px]" />
                <Skeleton className="h-4 w-[120px]" />
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default JobListingLoading;
