import { prisma } from "../db";
import { inngest } from "./client";

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

export const jobExpiratinHandler = inngest.createFunction(
  {
    id: "job-expiration",
  },
  { event: "trigger/job-expiration" },
  async ({ event, step }) => {
    const { jobId, expirationDays } = event.data;

    await step.sleep("wait-for-expiration", `${expirationDays}s`);
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
