"use client";

import { Card, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const JobCardSkeleton = () => {
  return (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <Card key={i} className="hover:shadow-lg transition-all duration-400">
          <CardHeader>
            <div className="flex flex-col md:flex-row gap-4">
              {/* Company Logo */}
              <Skeleton className="size-12 rounded-full" />

              <div className="flex-1 space-y-3">
                {/* Job Title */}
                <Skeleton className="h-6 w-40" />

                {/* Company Name + Badges */}
                <div className="flex flex-wrap items-center gap-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-16 rounded-full" />
                  <Skeleton className="h-4 w-20 rounded-full" />
                  <Skeleton className="h-4 w-28" />
                </div>
              </div>

              {/* Right Side Info */}
              <div className="md:ml-auto text-right space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>

            {/* About Text */}
            <Skeleton className="h-4 w-full mt-5" />
            <Skeleton className="h-4 w-3/4" />
          </CardHeader>
        </Card>
      ))}
    </div>
  );
};

export default JobCardSkeleton;
