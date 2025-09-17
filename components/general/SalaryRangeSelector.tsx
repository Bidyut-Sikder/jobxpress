/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Slider } from "../ui/slider";
import { Control, useController } from "react-hook-form";
import { formatCurrency } from "@/lib/utils";

interface iAppProps {
  control: Control<any>;
  minSalary: number;
  maxSalary: number;
  step: number;
}

const SalaryRangeSelector = ({
  control,

  maxSalary,
  minSalary,
  step,
}: iAppProps) => {
  const { field: fromField } = useController({
    name: "salaryFrom",
    control,
  });
  const { field: toField } = useController({
    name: "salaryTo",
    control,
  });

  const [range, setRange] = useState<[number, number]>([
    fromField.value || minSalary,
    toField.value || maxSalary / 2,
  ]);

  const handleChangeRange = (value: number[]) => {
    const newRange: [number, number] = [value[0], value[1]];
    setRange(newRange);
    fromField.onChange(newRange[0]);
    toField.onChange(newRange[1]);
  };

  return (
    <div className="w-full space-y-4">
      <Slider
        min={minSalary}
        value={range}
        step={step}
        max={maxSalary}
        onValueChange={handleChangeRange}
      />
      <div className="flex justify-between">
        <span>{formatCurrency(range[0])}</span>
        <span>{formatCurrency(range[1])}</span>
      </div>
    </div>
  );
};

export default SalaryRangeSelector;

/////////////////////
// "use client";

// import React from "react";
// import { Slider } from "../ui/slider";
// import { Control } from "react-hook-form";
// import {
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";

// interface iAppProps {
//   control: Control<any>;
//   minSalary: number;
//   maxSalary: number;
//   step: number;
//   currency: string;
// }

// const SalaryRangeSelector = ({
//   control,
//   currency,
//   maxSalary,
//   minSalary,
//   step,
// }: iAppProps) => {
//   return (
//     <FormField
//       control={control}
//       name="salaryRange" // 👈 single field
//       render={({ field }) => {
//         return (
//           <FormItem>

//             <Slider
//               min={minSalary}
//               max={maxSalary}
//               step={step}
//               value={field.value || [minSalary, maxSalary / 2]} // default two thumbs
//               onValueChange={(val) => {
//                 field.onChange(val);
//               }} // update both values
//             />
//             <div className="flex justify-between mt-2 text-sm text-muted-foreground">
//               <span>
//                 {currency} {field.value?.[0] ?? minSalary}
//               </span>
//               <span>
//                 {currency} {field.value?.[1] ?? maxSalary / 2}
//               </span>
//             </div>
//             <FormMessage />
//           </FormItem>
//         );
//       }}
//     />
//   );
// };

// export default SalaryRangeSelector;

//////////////
