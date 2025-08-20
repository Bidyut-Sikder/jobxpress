import { companySchema } from "@/lib/zodSchemas";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectValue } from "@radix-ui/react-select";
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "@/components/ui/select";
import { countryList } from "@/lib/countriesList";
import { Textarea } from "@/components/ui/textarea";
export default function CompanyForm() {
  const form = useForm<z.infer<typeof companySchema>>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      about: "",
      location: "",
      logo: "",
      name: "",
      website: "",
      xAccount: "",
    },
  });

  return (
    <Form {...form}>
      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter company name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name</FormLabel>
                <Select>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Worldwide</SelectLabel>
                      <SelectItem value="Worldwide">
                        <span>Worldwide / Remote</span>
                      </SelectItem>
                    </SelectGroup>
                    <SelectGroup>
                      <SelectLabel>Location</SelectLabel>
                      {countryList.map((item) => (
                        <SelectItem key={item.code} value={item.name}>
                          <span>{item.flagEmoji}</span>
                          <span className="pl-1">{item.name}</span>
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://yourcompany.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="xAccount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>X (Twitter) Account</FormLabel>
                <FormControl>
                  <Input placeholder="@yourcompany" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>


        <FormField
            control={form.control}
            name="about"
            render={({ field }) => (
              <FormItem>
                <FormLabel>About</FormLabel>
                <FormControl>
                  <Textarea placeholder="Tell us about your company..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

      </form>
    </Form>
  );
}

////////////////////////
// import React from "react";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// export const companySchema = z.object({
//   name: z.string().min(2, "Name must be at least 2 characters"),
//   location: z.string().min(1, "Location must be defined."),
//   about: z
//     .string()
//     .min(10, "Please provide some information about your company."),
//   logo: z.string().min(1, "Please provide a logo for your company."),
//   website: z
//     .string()
//     .url("Please provide a valid URL")
//     .min(1, "Please provide a website for your company."),
//   xAccount: z.string().optional(),
// });

// type CompanyFormValues = z.infer<typeof companySchema>;

// export default function CompanyForm() {
//   const form = useForm<CompanyFormValues>({
//     resolver: zodResolver(companySchema),
//     defaultValues: {
//       name: "",
//       location: "",
//       about: "",
//       logo: "",
//       website: "",
//       xAccount: "",
//     },
//   });

//   function onSubmit(values: CompanyFormValues) {
//     console.log("Form submitted:", values);
//   }

//   return (
//     <div className="max-w-2xl mx-auto mt-10 px-4">
//       <Card>
//         <CardHeader>
//           <CardTitle className="text-xl font-semibold">
//             Company Registration
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <Form {...form}>
//             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
//               {["name", "location", "about", "logo", "website", "xAccount"].map(
//                 (fieldName) => (
//                   <FormField
//                     key={fieldName}
//                     control={form.control}
//                     name={fieldName as keyof CompanyFormValues}
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel className="capitalize">
//                           {fieldName === "xAccount"
//                             ? "X (Twitter) Account"
//                             : fieldName}
//                         </FormLabel>
//                         <FormControl>
//                           <Input
//                             {...field}
//                             placeholder={
//                               fieldName === "xAccount"
//                                 ? "Optional Twitter username"
//                                 : `Enter ${fieldName}`
//                             }
//                           />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 )
//               )}

//               <Button type="submit" className="w-full">
//                 Submit
//               </Button>
//             </form>
//           </Form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
