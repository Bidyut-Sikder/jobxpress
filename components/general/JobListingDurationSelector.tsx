import React, { useEffect } from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { ControllerRenderProps } from "react-hook-form";
import { jobListingDurationPricing } from "@/lib/joblistingDurationPricing";
import { Label } from "../ui/label";
import { Card } from "../ui/card";
import { cn } from "@/lib/utils";

interface iAppProps {
  field: ControllerRenderProps;
  jobId?: string;
}

const JobListingDurationSelector = ({ jobId, field }: iAppProps) => {
  //   Set default value to 30 on first render
  useEffect(() => {
    if (field.value === 0) {
      field.onChange(30);
    }
  }, [field]);

  return (
    <RadioGroup
      value={field.value?.toString()}
      onValueChange={(value) => {
        field.onChange(parseInt(value));
      }}
    >
      <div className="flex flex-col gap-4">
        {jobListingDurationPricing.map((duration) => (
          <div key={duration.days.toString()} className="relative">
            {/* Hidden radio item */}
            <RadioGroupItem
              disabled={!!jobId}
              value={duration.days.toString()}
              id={duration.days.toString()}
              className="sr-only"
            />

            {/* Make whole Card clickable via Label */}
            <Label
              htmlFor={duration.days.toString()}
              className="cursor-pointer block"
            >
              <Card
                className={cn(
                  field.value === duration.days
                    ? "border-primary bg-primary/10"
                    : "hover:bg-secondary/50",
                  `p-4 border-2 transition-all ${jobId && "opacity-70"}`
                )}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-lg">
                      {duration.days} Days
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {duration.description}
                    </p>
                  </div>

                  <div>
                    <p className="font-bold text-xl">${duration.price}</p>
                    <p className="text-sm text-muted-foreground">
                      ${(duration.price / duration.days).toFixed(2)}/day
                    </p>
                  </div>
                </div>
              </Card>
            </Label>
          </div>
        ))}
      </div>
    </RadioGroup>
  );
};

export default JobListingDurationSelector;
