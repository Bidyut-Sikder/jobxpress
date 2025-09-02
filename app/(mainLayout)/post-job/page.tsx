import CreateJobForm from "@/components/forms/CreateJobForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { prisma } from "@/lib/db";
import { requireUser } from "@/lib/requireUser";
import image from "@/public/logo.png";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

const companies = [
  { id: 0, name: "ArcJet", logo: image },
  { id: 1, name: "ArcJet", logo: image },
  { id: 2, name: "ArcJet", logo: image },
  { id: 3, name: "ArcJet", logo: image },
  { id: 4, name: "ArcJet", logo: image },
  { id: 5, name: "ArcJet", logo: image },
];

const testimonials = [
  {
    id: 0,
    quote:
      "We found our ideal candidate within 48 hours of posting. The quality of applicants was exceptional.",
    author: "Sara Leo",
    company: "TechLead",
  },
  {
    id: 1,
    quote:
      "The platform streamlined our hiring process. We hired faster than ever before.",
    author: "James Carter",
    company: "InnovaWorks",
  },
  {
    id: 2,
    quote:
      "Excellent experience! The candidates we connected with were skilled and highly motivated.",
    author: "Maya Singh",
    company: "BrightPath Solutions",
  },
  {
    id: 3,
    quote:
      "This service saved us weeks of recruitment effort. The interface is clean and easy to use.",
    author: "David Chen",
    company: "NextWave Labs",
  },
  {
    id: 4,
    quote:
      "We rely on this platform for every new hire now. It's become an essential part of our growth.",
    author: "Elena Roberts",
    company: "FutureVision",
  },
];

const stats = [
  {
    id: 0,
    value: "10k+",
    label: "Monthly active job seekers",
  },
  {
    id: 1,
    value: "2k+",
    label: "Verified companies hiring",
  },
  {
    id: 2,
    value: "500+",
    label: "New jobs posted every week",
  },
  {
    id: 3,
    value: "95%",
    label: "Employer satisfaction rate",
  },
];

const getCompany = async (userId: string) => {
  const data = await prisma.company.findUnique({
    where: {
      userId: userId,
    },
    select: {
      name: true,
      location: true,
      about: true,
      logo: true,
      xAccount: true,
      website: true,
    },
  });
  if (!data) redirect("/");
  return data;
};

const PostJob = async () => {
  const session = await requireUser();
  const data = await getCompany(session.id as string);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-5">
      <CreateJobForm
        companyAbout={data.about}
        companyLocation={data.location}
        companyLogo={data.logo}
        companyName={data.name}
        companyWebsite={data.website}
        companyXAccount={data.xAccount}
      />

      <div className="col-span-1">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">
              Trusted by Industry Leaders
            </CardTitle>
            <CardDescription>
              Join thousands of companies hiring top talent.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              {companies.map((company) => (
                <div key={company.id}>
                  <Image
                    src={company.logo}
                    alt={company.name}
                    width={80}
                    height={80}
                    className="rounded-lg opacity-75 transition-opacity hover:opacity-100"
                  />
                </div>
              ))}
            </div>
            <div className="space-y-4">
              {testimonials.map((testimonial) => (
                <blockquote
                  key={testimonial.id}
                  className="border-l-3 border-primary pl-4"
                >
                  <p className="text-sm text-muted-foreground italic">
                    {testimonial.quote}
                  </p>

                  <footer className="mt-2 text-sm font-medium">
                    - {testimonial.author}, {testimonial.company}
                  </footer>
                </blockquote>
              ))}
            </div>

            {/* we will render stats here */}

            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <div key={stat.id} className="rounded-lg bg-muted p-4">
                  <h4 className="text-2xl font-bold ">{stat.value}</h4>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PostJob;

const dd = {
  type: "doc",
  content: [
    {
      type: "paragraph",
      attrs: { textAlign: "left" },
      content: [
        { type: "text", marks: [{ type: "bold" }], text: "Title:" },
        { type: "hardBreak" },
        {
          type: "text",
          text: "Full-Stack Developer for Next.js + Express.js Real Estate Platform",
        },
        { type: "hardBreak" },
        { type: "hardBreak" },
        { type: "text", text: "Project:" },
        { type: "hardBreak" },
        {
          type: "text",
          text: "We are building RedaHomes, a bilingual real estate platform. Development is milestone-based (M0–M12) as described in the attached document.",
        },
        { type: "hardBreak" },
        { type: "hardBreak" },
        { type: "text", text: "Requirements:" },
        { type: "hardBreak" },
        {
          type: "text",
          text: "Strong skills in Next.js 14, Express.js, PostgreSQL/PostGIS, Redis",
        },
        { type: "hardBreak" },
        {
          type: "text",
          text: "Proven experience in performance optimization (Google PageSpeed Insights Mobile ≥80, Desktop ≥90)",
        },
        { type: "hardBreak" },
        { type: "hardBreak" },
        {
          type: "text",
          text: "Deliverables for each milestone: GitHub PR + public preview URL + PSI test evidence",
        },
        { type: "hardBreak" },
        { type: "hardBreak" },
        {
          type: "text",
          text: "Must follow step-by-step milestone development and meet agreed timelines",
        },
        { type: "hardBreak" },
        { type: "hardBreak" },
        { type: "text", text: "Next Steps:" },
        { type: "hardBreak" },
        { type: "text", text: "Please provide:" },
        { type: "hardBreak" },
        { type: "hardBreak" },
        { type: "text", text: "Your GitHub username (for repo access)" },
        { type: "hardBreak" },
        { type: "hardBreak" },
        { type: "text", text: "Estimated timeline per milestone" },
        { type: "hardBreak" },
        { type: "hardBreak" },
        { type: "text", text: "Examples of past performance-focused projects" },
        { type: "hardBreak" },
        { type: "hardBreak" },
        { type: "text", text: "👉 Current website: " },
        {
          type: "text",
          marks: [
            {
              type: "link",
              attrs: {
                href: "https://redahomes.ca",
                target: "_blank",
                rel: "noopener noreferrer nofollow",
                class: null,
              },
            },
            { type: "bold" },
            { type: "underline" },
          ],
          text: "https://redahomes.ca",
        },
        { type: "hardBreak" },
        {
          type: "text",
          text: "📄 Full milestone breakdown is in the attached file.",
        },
      ],
    },
    { type: "paragraph", attrs: { textAlign: null } },
  ],
};
