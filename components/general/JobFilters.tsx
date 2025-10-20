// responsive data

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
  const currentLocation = searchParams.get("location") || "";

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

  const handleLocationChange = (location: string) => {
    router.push(`/?${createQueryString("location", location)}`);
  };

  return (
    <Card className="col-span-1 h-fit w-full max-w-full overflow-hidden border rounded-2xl shadow-sm">
      <CardHeader className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
        <CardTitle className="text-lg sm:text-2xl font-semibold text-center sm:text-left">
          Filters
        </CardTitle>
        <Button
          onClick={clearAllFilters}
          variant={"destructive"}
          size={"sm"}
          className="flex items-center justify-center gap-1 h-8 text-xs sm:text-sm w-full sm:w-auto"
        >
          {/* <span className="">Clear All</span> */}
          <span className="lg:block hidden ">Clear All</span>
          <XIcon className="size-4" />
        </Button>
      </CardHeader>

      <Separator className="mb-4" />

      <CardContent className="space-y-6 text-sm sm:text-base p-2 sm:p-4">
        {/* Job Type Section */}
        <div className="space-y-3">
          <Label className="text-base sm:text-lg font-semibold block text-center sm:text-left">
            Job Type
          </Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {jobTypes.map((jobType) => (
              <div key={jobType} className="flex items-center space-x-2">
                <Checkbox
                  checked={currentJobTypes.includes(jobType)}
                  onCheckedChange={(e) =>
                    handleFilterChange(jobType, Boolean(e))
                  }
                  id={jobType}
                />
                <Label
                  htmlFor={jobType}
                  className="md:text-sm text-[10px] font-medium truncate"
                >
                  {jobType.toLocaleUpperCase()}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Location Section */}
        <div className="space-y-3">
          <Label className="text-base sm:text-lg font-semibold block text-center sm:text-left">
            Location
          </Label>
          <Select value={currentLocation} onValueChange={handleLocationChange}>
            <SelectTrigger className="w-full text-xs sm:text-sm">
              <SelectValue placeholder="Select Location" />
            </SelectTrigger>
            <SelectContent className="max-h-[250px] overflow-y-auto text-sm">
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







///////////////////

// "use client";

// import React, { useCallback } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
// import { Button } from "../ui/button";
// import { XIcon } from "lucide-react";
// import { Label } from "../ui/label";
// import { Checkbox } from "../ui/checkbox";
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
// import { countryList } from "@/lib/countriesList";
// import { useRouter, useSearchParams } from "next/navigation";

// const jobTypes = ["full-time", "part-time", "contract", "internship"];

// const JobFilters = () => {
//   const searchParams = useSearchParams();
//   const router = useRouter();

//   const currentJobTypes = searchParams.get("jobTypes")?.split(",") || [];
//   const currentLocation = searchParams.get("location") || "";

//   const clearAllFilters = () => {
//     router.push("/");
//   };

//   const createQueryString = useCallback(
//     (name: string, value: string) => {
//       const params = new URLSearchParams(searchParams.toString());

//       if (value) {
//         params.set(name, value);
//       } else {
//         params.delete(name);
//       }
//       return params.toString();
//     },
//     [searchParams]
//   );

//   function handleFilterChange(jobType: string, checked: boolean) {
//     const current = new Set(currentJobTypes);
//     if (checked) {
//       current.add(jobType);
//     } else {
//       current.delete(jobType);
//     }

//     const newValues = Array.from(current).join(",");

//     router.push(`/?${createQueryString("jobTypes", newValues)}`);
//   }

//   const handleLocationChange = (location: string) => {
//     router.push(`/?${createQueryString("location", location)}`);
//   };
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
//         <div className="space-y-4">
//           <Label className="text-lg font-semibold ">Job Type</Label>
//           <div className="grid grid-cols-2 gap-4">
//             {jobTypes.map((jobType) => (
//               <div key={jobType} className="flex items-center space-x-2">
//                 <Checkbox
//                   checked={currentJobTypes.includes(jobType)}
//                   onCheckedChange={(e) =>
//                     handleFilterChange(jobType, Boolean(e))
//                   }
//                   id={jobType}
//                 />
//                 <Label htmlFor={jobType} className="text-sm font-medium">
//                   {jobType.toLocaleUpperCase()}
//                 </Label>
//               </div>
//             ))}
//           </div>
//         </div>

//         <Separator />
//         <div className="space-y-4">
//           <Label className="text-lg font-semibold">Location</Label>
//           <Select value={currentLocation} onValueChange={(e)=>handleLocationChange(e)}>
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
