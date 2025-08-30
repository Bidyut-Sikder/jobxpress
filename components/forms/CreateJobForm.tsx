import { jobSchema } from "@/lib/zodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const CreateJobForm = () => {
  const form = useForm<z.infer<typeof jobSchema>>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      jobTitle: "",
      employmentType: "",
      location: "",
      salaryFrom: 0,
      salaryTo: 0,
      jobDescription: "",
      listingDuration: 0,
      benefits: [],
      companyName: "",
      companyLocation: "",
      companyAbout: "",
      companyLogo: "",
      companyWebsite: "",
      companyXAccount: "",
    },
  });

  return <div>CreateJobForm</div>;
};

export default CreateJobForm;
