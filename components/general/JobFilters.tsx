"use client";

import React, { useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { XIcon } from "lucide-react";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { countryList } from "@/lib/countriesList";
import { useRouter, useSearchParams } from "next/navigation";

const jobTypes = ["full-time", "part-time", "contract", "internship"];

const JobFilters = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentJobTypes = searchParams.get("jobTypes")?.split(",") || [];

  const clearAllFilters = () => {
    router.push("/");
  };

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      return params.toString();
    },
    [searchParams]
  );

  function handleFilterChange(jobType: string, checked: boolean) {
    const current = new Set(currentJobTypes);
    if (checked) {
      current.add(jobType);
    } else {
      current.delete(jobType);
    }
    const newValues = Array.from(current).join(",");

    router.push(`/?${createQueryString("jobTypes", newValues)}`);
  }

  return (
    <Card className="col-span-1 h-fit">
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle className="text-2xl font-semibold ">Filters</CardTitle>
        <Button
          onClick={clearAllFilters}
          variant={"destructive"}
          size={"sm"}
          className="h-8"
        >
          <span>Clear All</span>
          <XIcon className="size-4" />
        </Button>
      </CardHeader>
      <Separator className="mb-4" />
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <Label className="text-lg font-semibold ">Job Type</Label>
          <div className="grid grid-cols-2 gap-4">
            {jobTypes.map((jobType) => (
              <div key={jobType} className="flex items-center space-x-2">
                <Checkbox
                  checked={currentJobTypes.includes(jobType)}
                  onCheckedChange={(e) =>
                    handleFilterChange(jobType, Boolean(e))
                  }
                  id={jobType}
                />
                <Label htmlFor={jobType} className="text-sm font-medium">
                  {jobType.toLocaleUpperCase()}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />
        <div className="space-y-4">
          <Label className="text-lg font-semibold">Location</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Location Type</SelectLabel>
                <SelectItem value="worldwide">
                  <span>🌍</span>
                  <span className="pl-2">Worldwide / Remote</span>
                </SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>Location</SelectLabel>
                {countryList.map((country) => (
                  <SelectItem key={country.id} value={country.name}>
                    <span>{country.flagEmoji}</span>
                    <span className="pl-2">{country.name}</span>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobFilters;

//////////////

// "use client";

// import React from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
// import { Button } from "../ui/button";
// import { XIcon } from "lucide-react";
// import { Label } from "../ui/label";
// import { Separator } from "../ui/separator";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "../ui/select";
// import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
// import { countryList } from "@/lib/countriesList";
// import { useRouter } from "next/navigation";

// const jobTypes = ["full-time", "part-time", "contract", "internship"];

// const JobFilters = () => {
//   const router = useRouter();
//   const [selectedJobType, setSelectedJobType] = React.useState<string | null>(
//     null
//   );

//   const clearAllFilters = () => {
//     setSelectedJobType(null);
//     router.push("/");
//   };

//   function handleFilterChange(jobType: string) {
//     setSelectedJobType(jobType);
//     console.log("Filter changed:", jobType);
//   }

//   return (
//     <Card className="col-span-1 h-fit">
//       <CardHeader className="flex flex-row justify-between items-center">
//         <CardTitle className="text-2xl font-semibold ">Filters</CardTitle>
//         <Button
//           onClick={clearAllFilters}
//           variant={"destructive"}
//           size={"sm"}
//           className="h-8"
//         >
//           <span>Clear All</span>
//           <XIcon className="size-4" />
//         </Button>
//       </CardHeader>
//       <Separator className="mb-4" />
//       <CardContent className="space-y-6">
//         {/* Job Type Filter */}
//         <div className="space-y-4">
//           <Label className="text-lg font-semibold ">Job Type</Label>
//           <RadioGroup
//             value={selectedJobType ?? ""}
//             onValueChange={(val) => handleFilterChange(val)}
//             className="grid grid-cols-2 gap-4"
//           >
//             {jobTypes.map((jobType) => (
//               <div key={jobType} className="flex items-center space-x-2">
//                 <RadioGroupItem id={jobType} value={jobType} />
//                 <Label htmlFor={jobType} className="text-sm font-medium">
//                   {jobType.toUpperCase()}
//                 </Label>
//               </div>
//             ))}
//           </RadioGroup>
//         </div>

//         <Separator />

//         {/* Location Filter */}
//         <div className="space-y-4">
//           <Label className="text-lg font-semibold">Location</Label>
//           <Select>
//             <SelectTrigger>
//               <SelectValue placeholder="Select Location" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectGroup>
//                 <SelectLabel>Location Type</SelectLabel>
//                 <SelectItem value="worldwide">
//                   <span>🌍</span>
//                   <span className="pl-2">Worldwide / Remote</span>
//                 </SelectItem>
//               </SelectGroup>
//               <SelectGroup>
//                 <SelectLabel>Location</SelectLabel>
//                 {countryList.map((country) => (
//                   <SelectItem key={country.id} value={country.name}>
//                     <span>{country.flagEmoji}</span>
//                     <span className="pl-2">{country.name}</span>
//                   </SelectItem>
//                 ))}
//               </SelectGroup>
//             </SelectContent>
//           </Select>
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// export default JobFilters;
