import { saveJobPost, UnSaveJobPost } from "@/app/actions";
import { auth } from "@/auth";
import { benefits } from "@/components/general/BenefitsSelector";
import JsonToHtml from "@/components/general/JsonToHtml";
import LikeSubmit from "@/components/general/LikeSubmit";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import arcjet, { detectBot, tokenBucket } from "@/lib/arcjet";
import { prisma } from "@/lib/db";

import { getFlagEmoji } from "@/lib/utils";
import { request } from "@arcjet/next";

import { Heart } from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

const aj = arcjet.withRule(
  detectBot({
    mode: "LIVE",
    allow: ["CATEGORY:SEARCH_ENGINE", "CATEGORY:PREVIEW"],
  })
);

const getClient = (session: boolean) => {
  if (session) {
    return aj.withRule(
      tokenBucket({
        mode: "DRY_RUN",
        capacity: 100,
        interval: 60,
        refillRate: 30,
      })
    );
  } else {
    return aj.withRule(
      tokenBucket({
        mode: "DRY_RUN",
        capacity: 100,
        interval: 60,
        refillRate: 10,
      })
    );
  }
};

const getJob = async (jobId: string, userId?: string) => {
  const [jobData, savedJob] = await Promise.all([
    await prisma.jobPost.findUnique({
      where: {
        id: jobId,
        status: "ACTIVE",
      },
      select: {
        jobTitle: true,
        jobDescription: true,
        salaryFrom: true,
        salaryTo: true,
        employmentType: true,
        location: true,
        benefits: true,
        createdAt: true,
        listingDuration: true,
        company: {
          select: {
            name: true,
            logo: true,
            location: true,
            about: true,
          },
        },
      },
    }),
    userId
      ? await prisma.savedJobPosts.findUnique({
          where: {
            userId_jobPostId: {
              userId: userId,
              jobPostId: jobId,
            },
          },
          select: {
            id: true,
          },
        })
      : null,
  ]);

  if (!jobData) {
    return notFound();
  }
  return { jobData, savedJob };
};
type Params = Promise<{ jobId: string }>;

const JobIdPage = async ({ params }: { params: Params }) => {
  const { jobId } = await params;
  const req = await request();
  const session = await auth();

  const decision = await getClient(!!session).protect(req, { requested: 10 });

  if (decision.isDenied()) {
    throw new Error("Not Allowed");
  }

  const { jobData, savedJob } = await getJob(jobId, session?.user?.id);
  // await new Promise((res) => setTimeout(res, 2000));
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 px-2 sm:px-4 md:px-6 py-4 md:py-8 w-full max-w-screen-xl mx-auto overflow-hidden">
      {/* Left section */}
      <div className="space-y-6 col-span-2">
        {/* Job Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-6">
          <div className="flex flex-col min-w-0">
            <h1 className="text-lg sm:text-2xl md:text-3xl font-bold truncate">
              {jobData.jobTitle}
            </h1>

            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-2 text-sm sm:text-base">
              <p className="font-medium truncate">{jobData.company.name}</p>

              <Badge
                className="rounded-full text-xs sm:text-sm"
                variant="secondary"
              >
                {jobData.employmentType}
              </Badge>

              <span className="hidden md:inline text-muted-foreground">*</span>

              <Badge className="rounded-full text-xs sm:text-sm">
                {getFlagEmoji(jobData.location) && (
                  <span className="mr-1">{getFlagEmoji(jobData.location)}</span>
                )}
                {jobData.location}
              </Badge>
            </div>
          </div>

          {session ? (
            <form
              action={
                savedJob
                  ? UnSaveJobPost.bind(null, savedJob.id)
                  : saveJobPost.bind(null, jobId)
              }
            >
              <LikeSubmit savedJob={!!savedJob} />
            </form>
          ) : (
            // <Link
            //   className={`${buttonVariants({
            //     variant: "outline",
            //   })} flex items-center gap-1 text-xs sm:text-sm px-2 sm:px-3 py-1`}
            //   href="/login"
            // >
            //   <Heart className="size-3 sm:size-4" />
            //   Save
            // </Link>
            <Link
              className={`${buttonVariants({
                variant: "outline",
              })} w-[80px] flex items-center gap-1 text-xs sm:text-sm px-1 sm:px-2 py-1`}
              href="/login"
            >
              <Heart className="size-3 sm:size-4" />
              Save
            </Link>
          )}
        </div>

        {/* Job Description */}
        <section className="overflow-hidden text-sm sm:text-base">
          <JsonToHtml json={JSON.parse(jobData.jobDescription)} />
        </section>

        {/* Benefits Section */}
        <section>
          <h3 className="font-semibold text-base sm:text-lg mb-2">Benefits</h3>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {benefits.map((benefit) => {
              const isOffered = jobData.benefits.includes(benefit.id);

              return (
                <Badge
                  className="cursor-not-allowed text-xs sm:text-sm px-3 py-1.5 rounded-full"
                  key={benefit.id}
                  variant={isOffered ? "default" : "outline"}
                >
                  <span className="flex items-center gap-1 sm:gap-2">
                    {benefit.icon}
                    {benefit.label}
                  </span>
                </Badge>
              );
            })}
          </div>
        </section>
        <Card className="p-4 sm:p-6 text-sm sm:text-base">
          <div className="space-y-3 sm:space-y-4">
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
              <Image
                src={jobData.company.logo}
                className="rounded-full size-10 sm:size-12 object-cover"
                width={48}
                height={48}
                alt="company logo"
              />
              <div className="flex flex-col min-w-0">
                <h3 className="font-semibold truncate">
                  {jobData.company.name}
                </h3>
                <p className="text-muted-foreground text-xs sm:text-sm line-clamp-2 break-words">
                  {jobData.company.about}
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Right Section */}
      <div className="space-y-4 col-span-2 lg:col-span-1">
        {/* Apply Card */}
        <Card className="p-4 sm:p-6">
          <div className="space-y-3 sm:space-y-4 text-sm sm:text-base">
            <div>
              <h3 className="font-semibold text-base sm:text-lg">Apply Now</h3>
              <p className="text-muted-foreground mt-1 text-xs sm:text-sm leading-relaxed">
                Submit your application today and take the next step in your
                career.
              </p>
            </div>
            <Button className="w-full text-sm sm:text-base py-2 sm:py-3">
              Apply Now
            </Button>
          </div>
        </Card>

        {/* Job Details */}
        <Card className="p-4 sm:p-6 text-sm sm:text-base">
          <h3 className="font-semibold text-base sm:text-lg mb-2">
            About The Job
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between text-xs sm:text-sm">
              <span className="text-muted-foreground">Apply Before</span>
              <span>
                {new Date(
                  jobData.createdAt.getTime() +
                    jobData.listingDuration * 24 * 60 * 60 * 1000
                ).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>

            <div className="flex justify-between text-xs sm:text-sm">
              <span className="text-muted-foreground">Posted On</span>
              <span>
                {jobData.createdAt.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>

            <div className="flex justify-between text-xs sm:text-sm">
              <span className="text-muted-foreground">Employment Type</span>
              <span>{jobData.employmentType.toUpperCase()}</span>
            </div>

            <div className="flex justify-between text-xs sm:text-sm">
              <span className="text-muted-foreground">Location</span>
              <span className="truncate">
                {getFlagEmoji(jobData.location) && (
                  <span className="mr-1">{getFlagEmoji(jobData.location)}</span>
                )}
                {jobData.location}
              </span>
            </div>
          </div>
        </Card>

        {/* Company Details */}
        {/* <Card className="p-4 sm:p-6 text-sm sm:text-base">
          <div className="space-y-3 sm:space-y-4">
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
              <Image
                src={jobData.company.logo}
                className="rounded-full size-10 sm:size-12 object-cover"
                width={48}
                height={48}
                alt="company logo"
              />
              <div className="flex flex-col min-w-0">
                <h3 className="font-semibold truncate">{jobData.company.name}</h3>
                <p className="text-muted-foreground text-xs sm:text-sm line-clamp-2 break-words">
                  {jobData.company.about}
                </p>
              </div>
            </div>
          </div>
        </Card> */}
      </div>
    </div>
  );
};

export default JobIdPage;

//////////

// import { saveJobPost, UnSaveJobPost } from "@/app/actions";
// import { auth } from "@/auth";
// import { benefits } from "@/components/general/BenefitsSelector";
// import JsonToHtml from "@/components/general/JsonToHtml";
// import LikeSubmit from "@/components/general/LikeSubmit";
// import { Badge } from "@/components/ui/badge";
// import { Button, buttonVariants } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import arcjet, { detectBot, tokenBucket } from "@/lib/arcjet";
// import { prisma } from "@/lib/db";

// import { getFlagEmoji } from "@/lib/utils";
// import { request } from "@arcjet/next";

// import { Heart } from "lucide-react";

// import Image from "next/image";
// import Link from "next/link";
// import { notFound } from "next/navigation";
// import React from "react";

// const aj = arcjet.withRule(
//   detectBot({
//     mode: "LIVE",
//     allow: ["CATEGORY:SEARCH_ENGINE", "CATEGORY:PREVIEW"],
//   })
// );

// const getClient = (session: boolean) => {
//   if (session) {
//     return aj.withRule(
//       tokenBucket({
//         mode: "DRY_RUN",
//         capacity: 100,
//         interval: 60,
//         refillRate: 30,
//       })
//     );
//   } else {
//     return aj.withRule(
//       tokenBucket({
//         mode: "DRY_RUN",
//         capacity: 100,
//         interval: 60,
//         refillRate: 10,
//       })
//     );
//   }
// };

// const getJob = async (jobId: string, userId?: string) => {
//   const [jobData, savedJob] = await Promise.all([
//     await prisma.jobPost.findUnique({
//       where: {
//         id: jobId,
//         status: "ACTIVE",
//       },
//       select: {
//         jobTitle: true,
//         jobDescription: true,
//         salaryFrom: true,
//         salaryTo: true,
//         employmentType: true,
//         location: true,
//         benefits: true,
//         createdAt: true,
//         listingDuration: true,
//         company: {
//           select: {
//             name: true,
//             logo: true,
//             location: true,
//             about: true,
//           },
//         },
//       },
//     }),
//     userId
//       ? await prisma.savedJobPosts.findUnique({
//           where: {
//             userId_jobPostId: {
//               userId: userId,
//               jobPostId: jobId,
//             },
//           },
//           select: {
//             id: true,
//           },
//         })
//       : null,
//   ]);

//   if (!jobData) {
//     return notFound();
//   }
//   return { jobData, savedJob };
// };
// type Params = Promise<{ jobId: string }>;

// const JobIdPage = async ({ params }: { params: Params }) => {
//   const { jobId } = await params;
//   const req = await request();
//   const session = await auth();

//   const decision = await getClient(!!session).protect(req, { requested: 10 });

//   if (decision.isDenied()) {
//     throw new Error("Not Allowed");
//   }

//   const { jobData, savedJob } = await getJob(jobId, session?.user?.id);
//   await new Promise((res) => setTimeout(res, 2000));
//   return (
//     <div className="grid lg:grid-cols-3 gap-8 bg-amberr-300">
//       <div className="space-y-8 col-span-2">
//         <div className="flex items-center justify-between">
//           <div className="">
//             <h1 className="text-3xl font-bold "> {jobData.jobTitle}</h1>
//             <div className="flex items-center gap-2 mt-2">
//               <p className="font-medium"> {jobData.company.name}</p>
//               <Badge className="rounded-full " variant={"secondary"}>
//                 {jobData.employmentType}
//               </Badge>
//               <span className="hidden md:inline text-muted-foreground">*</span>
//               <Badge className="rounded-full">
//                 {getFlagEmoji(jobData.location) && (
//                   <span className="mr-1">{getFlagEmoji(jobData.location)}</span>
//                 )}
//                 {jobData.location}
//               </Badge>
//             </div>
//           </div>

//           {session ? (
//             <form
//               action={
//                 savedJob
//                   ? UnSaveJobPost.bind(null, savedJob.id)
//                   : saveJobPost.bind(null, jobId)
//               }
//             >
//               <LikeSubmit savedJob={!!savedJob} />
//             </form>
//           ) : (
//             <Link
//               className={buttonVariants({ variant: "outline" })}
//               href={"/login"}
//             >
//               <Heart className="size-4 " />
//
//             </Link>
//           )}
//         </div>
//         <section>
//           <JsonToHtml json={JSON.parse(jobData.jobDescription)} />
//         </section>
//         <section>
//           <h3 className="font-semibold">Benefits</h3>
//           <div className="flex flex-wrap gap-3">
//             {benefits.map((benefit) => {
//               const isOffered = jobData.benefits.includes(benefit.id);

//               return (
//                 <Badge
//                   className="cursor-not-allowed text-sm px-4 py-1.5 rounded-full"
//                   key={benefit.id}
//                   variant={isOffered ? "default" : "outline"}
//                 >
//                   <span className="flex items-center gap-2">
//                     {benefit.icon}
//                     {benefit.label}
//                   </span>
//                 </Badge>
//               );
//             })}
//           </div>
//         </section>
//       </div>

//       <div className="space-y-6 col-span-1">
//         <Card className="p-6">
//           <div className="space-y-4">
//             <div>
//               <h3 className=" font-semibold">Apply Now</h3>
//               <p className="text-sm text-muted-foreground mt-1">
//                 Submit your application today and take the next step in your
//                 career. Our team will review your profile and get back to you
//                 shortly.
//               </p>
//             </div>
//             <Button className="w-full">Apply Now</Button>
//           </div>
//         </Card>
//         <Card className="p-6">
//           <h3 className="font-semibold ">About The Job</h3>
//           <div className="space-y-2">
//             <div className="flex justify-between">
//               <span className="text-sm text-muted-foreground">
//                 Apply Before
//               </span>
//               <span className="text-sm ">
//                 {new Date(
//                   jobData.createdAt.getTime() +
//                     jobData.listingDuration * 24 * 60 * 60 * 1000
//                 ).toLocaleDateString("en-US", {
//                   month: "long",
//                   day: "numeric",
//                   year: "numeric",
//                 })}
//               </span>
//             </div>

//             <div className="flex justify-between">
//               <span className="text-sm text-muted-foreground ">Posted on</span>
//               <span className="text-sm">
//                 {jobData.createdAt.toLocaleDateString("en-US", {
//                   month: "long",
//                   day: "numeric",
//                   year: "numeric",
//                 })}
//               </span>
//             </div>
//             <div className="flex justify-between">
//               <span className="text-sm text-muted-foreground ">
//                 Employment Type
//               </span>
//               <span className="text-sm">
//                 {jobData.employmentType.toUpperCase()}
//               </span>
//             </div>
//             <div className="flex justify-between">
//               <span className="text-sm text-muted-foreground ">Location</span>
//               <span className="text-sm">
//                 {getFlagEmoji(jobData.location) && (
//                   <span className="mr-1">{getFlagEmoji(jobData.location)}</span>
//                 )}{" "}
//                 {jobData.location}
//               </span>
//             </div>
//           </div>
//         </Card>

//         {/* company details */}
//         <Card className="p-6">
//           <div className="space-y-4">
//             <div className="flex items-center gap-3">
//               <Image
//                 src={jobData.company.logo}
//                 className="rounded-full size-12 "
//                 width={48}
//                 height={48}
//                 alt="company logo"
//               />
//               <div className="flex flex-col ">
//                 <h3 className="font-semibold"> {jobData.company.name}</h3>
//                 <p className="text-sm text-muted-foreground line-clamp-2">
//                   {jobData.company.about}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default JobIdPage;
