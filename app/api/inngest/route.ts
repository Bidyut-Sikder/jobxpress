import { inngest } from "@/lib/inngest/client";
import {
  helloWorld,
  helloWorld2,
  jobExpiratinHandler,
  sendPeriodicJobListingEmail,
} from "@/lib/inngest/functions";
import { serve } from "inngest/next";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    helloWorld, // <-- This is where you'll always add all your functions
    helloWorld2, // <-- This is where you'll always add all your functions
    jobExpiratinHandler,
    sendPeriodicJobListingEmail
  ],
});
