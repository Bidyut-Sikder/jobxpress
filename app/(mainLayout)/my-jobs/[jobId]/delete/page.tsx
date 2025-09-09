import { DeleteJobPost } from "@/app/actions";
import SubmitButton from "@/components/general/SubmitButton";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { requireUser } from "@/lib/requireUser";
import { ArrowLeft, TrainIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

type Params = {
  jobId: string;
};

const page = async ({ params }: { params: Params }) => {
  const { jobId } = await params;
  await requireUser();

  return (
    <div>
      <Card className="max-w-lg mx-auto mt-28">
        <CardHeader>
          <CardTitle> Are you sure?</CardTitle>
          <CardDescription>
            This action cannot be undone.This will permamently delete your job
            and remove all of your data from the database.
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex items-center justify-between">
          <Link
            href={"/my-jobs"}
            className={buttonVariants({ variant: "secondary" })}
          >
            <ArrowLeft /> Go Back
          </Link>

          <form
            action={async () => {
              "use server";
              await DeleteJobPost(jobId);
              redirect("/my-jobs");
            }}
          >
            <SubmitButton
              text="Delete Job"
              variant="destructive"
              icon={<TrainIcon />}
            />
          </form>
        </CardFooter>
      </Card>
    </div>
  );
};

export default page;
