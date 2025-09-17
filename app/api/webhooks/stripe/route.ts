import { prisma } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import Stripe from "stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const headersList = await headers();

  const signature = headersList.get("Stripe-Signature");
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature as string,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (error) {
    return new Response("Webhook error", {
      status: 400,
      statusText: error as string,
    });
  }
  const session = event.data.object as Stripe.Checkout.Session;
  if (event.type === "checkout.session.completed") {
    const customerId = session.customer;
    const jobId = session.metadata?.jobId;
    if (!jobId) {
      return new Response("NO JOB FOUND.", { status: 400 });
    }
    const company = await prisma.user.findUnique({
      where: {
        stripeCustomerId: customerId as string,
      },
      select: {
        Company: {
          select: {
            id: true,
          },
        },
      },
    });
    if (!company) {
      return new Response("NO COMPANY FOUND.", { status: 400 });
    }

    await prisma.jobPost.update({
      where: {
        id: jobId, //we can use only jobId  to update database
        companyId: company?.Company?.id as string,
      },
      data: {
        status: "ACTIVE",
      },
    });
  }
  return new Response(null, { status: 200 });
}
