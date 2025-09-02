import { z } from "zod";

export const companySchema = z.object({
  name: z.string().min(2, " Name must be at least 2 characters"),
  location: z.string().min(1, " Location must be defiend."),
  about: z
    .string()
    .min(10, "Please provide some information about your company."),
  logo: z.string().min(1, "Please provide a logo for your company."),
  website: z
    .string()
    .url("Please provide a valid url")
    .min(1, "Please provide a website for your company."),
  xAccount: z.string().optional(),
});

export const jobSeekerSchema = z.object({
  name: z.string().min(2, " Name must be at least 2 characters"),
  about: z.string().min(5, "Please provide more information about yourself."),
  resume: z.string().min(1, "Please upload your resume."),
});

export const jobSchema = z.object({
  jobTitle: z.string().min(2, "Title must be at least 2 characters"),
  employmentType: z.string().min(5, "Please select an employment type."),
  location: z.string().min(1, "Please select your location."),
  salaryFrom: z.number().min(1, "Salary from is required."),
  salaryTo: z.number().min(1, "Salary to is required."),
  jobDescription: z.string().min(5, "Job description is required."),
  listingDuration: z.number().min(1, "Listing Duration is required."),
  benefits: z.array(z.string()).min(1, "Please select at least 1 benefit."),
  companyName: z.string().min(1, "Company name is required."),
  companyLocation: z.string().min(1, "Company location name is required."),
  companyAbout: z.string().min(1, "Company about is required."),
  companyLogo: z.string().min(1, "Company logo is required."),
  companyWebsite: z.string().min(1, "Company Website is required."),
  companyXAccount: z.string().optional(),
});
