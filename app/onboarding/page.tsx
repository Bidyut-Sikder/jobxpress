import OnboardingForm from "@/components/forms/onboarding/OnboardingForm";
import { prisma } from "@/lib/db";
import { requireUser } from "@/lib/requireUser";
import { redirect } from "next/navigation";

import React from "react";

const checkIfUserHasFinishedOnboarding = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      onboardingCompleted: true,
    },
  });
  if (user?.onboardingCompleted === true) {
    return redirect("/");
  }
  console.log(user)
  return user;
};

async function page() {
  const session = await requireUser();
  await checkIfUserHasFinishedOnboarding(session.id as string);
  return (
    <div className="flex-col min-h-screen w-screen flex justify-center items-center">
      <OnboardingForm />
    </div>
  );
}

export default page;
