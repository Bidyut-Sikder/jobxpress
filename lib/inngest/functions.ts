import { Resend } from "resend";
import { prisma } from "../db";
import { inngest } from "./client";
import EmailTemplate from "@/components/resend/EmailTemplate";

const resend = new Resend(process.env.RESEND_API_KEY);

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "30s");
    await step.sleep("wait-a-moment", "2s");
    return {
      message: `Hello Bidyut Sikder with Email ${JSON.stringify(event.data)}!`,
    };
  }
);

export const helloWorld2 = inngest.createFunction(
  { id: "hello-world2" },
  { event: "test/hello.world2" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "25s");
    await step.sleep("wait-a-moment", "5s");
    return {
      message: `Hello Bidyut Sikder with Email ${JSON.stringify(event.data)}!`,
    };
  }
);

//for organization
export const jobExpiratinHandler = inngest.createFunction(
  {
    id: "job-expiration",
    cancelOn: [//for cancelling the function if the job is filled before expiration date
      {
        event: "job/cancel.expiration", // The event name that cancels this function
        // Ensure the cancellation event (async) and the triggering event (event)'s reminderId are the same:
        if: "async.data.jobId == event.data.jobId",
      },
    ],
  },
  { event: "trigger/job-expiration" },
  async ({ event, step }) => {
    const { jobId, expirationDays } = event.data;

    await step.sleep("wait-for-expiration", `${expirationDays}d`);
    await step.run("update-job-status", async () => {
      await prisma.jobPost.update({
        where: {
          id: jobId,
        },
        data: {
          status: "EXPIRED",
        },
      });
    });
    return {
      message: "Successfully updated job expiration.",
    };
  }
);

//for job seekers
export const sendPeriodicJobListingEmail = inngest.createFunction(
  {
    id: "job-listing-email",
  },
  { event: "trigger/job-listing-email" },
  async ({ event, step }) => {
    const { userId } = event.data;

    const totalDays = 30;
    //emaill will be sent to the jobSeeker every 2 days for 30 days
    const intervalDays = 2;
    let currentDay = 0;

    while (currentDay < totalDays) {
      // await step.sleep("wait-interval", `5s`);
      await step.sleep("wait-interval", `${intervalDays}d`);
      currentDay += intervalDays;
      const recentJobs = await step.run("fetch-recent-jobs", async () => {
        return await prisma.jobPost.findMany({
          where: {
            status: "ACTIVE",
          },
          include: {
            company: {
              select: {
                name: true,
                logo: true,
              },
            },
          },
          take: 10,
          orderBy: {
            createdAt: "desc",
          },
        });
      });

      if (recentJobs.length > 0) {
        await step.run("send-email", async () => {
          const jobListingHtml = recentJobs
            .map(
              (job) => `
                    <div style="
                      display: flex;
                      align-items: flex-start;
                      padding: 16px;
                      margin-bottom: 20px;
                      border: 1px solid #e0e0e0;
                      border-radius: 8px;
                      background-color: #ffffff;
                      box-shadow: 0 2px 6px rgba(0,0,0,0.05);
                      transition: transform 0.2s, box-shadow 0.2s;
                    ">
                      <!-- Left: Company Logo -->
                      <img 
                        src="${job.company.logo}" 
                        alt="${job.company.name} Logo" 
                        style="width:70px; height:70px; object-fit:contain; border-radius:8px; margin-right:16px;"
                      />

                      <!-- Right: Job Details -->
                      <div ">
                        <h3 style="margin:0 0 6px 0; font-size:18px; font-weight:700; color:#111;">
                          ${job.jobTitle}
                        </h3>
                        <p style="margin:0 0 8px 0; font-size:14px; color:#666;">
                          ${job.company.name} • ${job.location}
                        </p>
                        <p style="margin:0; font-size:14px; color:#007bff; font-weight:600;">
                          ${job.salaryFrom.toLocaleString()} – ${job.salaryTo.toLocaleString()}
                        </p>
                      </div>
                    </div>`
            )
            .join("");

          await resend.emails.send({
            from: "JobXpress <onboarding@resend.dev>",
            to: ["bidyutsikder2001@gmail.com"],
            //after domain registration on Resend.com.
            //  we can use user's email address to send email.
            subject: "Latest Job Opportunities for You",
            react: EmailTemplate(
              jobListingHtml,
              process.env.NEXT_PUBLIC_URL as string
            ),
          });
        });
      }
    }
    return {
      userId,
      message: `completed ${totalDays} day job listing notifications`,
    };
  }
);

//     const jobListingHtml = recentJobs
//       .map(
//         (job) => `
//  <div style='margin-bottom:20px; padding:15px; border:1px solid #eee; border-radius:5px'} >
//   <h3 style="margin:0">${job.jobTitle} </h3>
//   <p style="margin:5x 0">${job.company.name} * ${job.location}</p>

//   <p style="margin:5x 0">${job.salaryFrom.toLocaleString()}-${job.salaryTo.toLocaleString()}</p>
// </div>
// `
//       )
//       .join("");
//     await resend.emails.send({
//       from: "JobXpress <onboarding@resend.dev>",
//       to: ["bidyutsikder2001@gmail.com"],
//       subject: "Latest Job opportunities for you",
//       html: `
//     <div style="font-family:Arial,sans-serif; max-width:60px; margin:0 auto;">
//     <h2> Latest job oppertunities </h2>
//      ${jobListingHtml}
//      <div style="marging-top:30px; text-align:center">
//      <a href="${process.env.NEXT_PUBLIC_URL}"
//      style="background-color:#007bff; color:white; padding:10px 20px; text-decoration:none;border-radius:5px;">
//      View More Jobs </a>

//      </div>
//   </div>

//       `,  });
