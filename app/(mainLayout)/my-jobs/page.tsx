import EmptyState from "@/components/general/EmptyState";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { prisma } from "@/lib/db";
import { requireUser } from "@/lib/requireUser";
import {
  DropdownMenuContent,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { CopyCheck, MoreHorizontal, PenBox, XCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const getMyJobs = async (userId: string) => {
  const data = await prisma.jobPost.findMany({
    where: {
      company: {
        userId,
      },
    },
    select: {
      id: true,
      jobTitle: true,
      status: true,
      createdAt: true,
      company: {
        select: {
          name: true,
          logo: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return data;
};

const MyJobList = async () => {
  const user = await requireUser();

  const myJobs = await getMyJobs(user.id as string);

  if (myJobs.length == 0) {
    return (
      <EmptyState
        title="No posts found"
        description="You dont have any job posts yet"
        buttonText="Create posts."
        href="/post-job"
      />
    );
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Jobs</CardTitle>
        <CardDescription>
          Manage your job listings and applications here.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Logo</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Job Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {myJobs.map((job) => (
              <TableRow key={job.id}>
                <TableCell>
                  <Image
                    src={job.company.logo}
                    width={40}
                    height={40}
                    alt="company logo"
                    className="rounded-md size-10"
                  />
                </TableCell>
                <TableCell>{job.company.name}</TableCell>
                <TableCell>{job.jobTitle}</TableCell>
                <TableCell>
                  {job.status.charAt(0).toUpperCase() +
                    job.status.slice(1).toLowerCase()}
                </TableCell>
                <TableCell>
                  {job.createdAt.toLocaleDateString("en-US", {
                    month: "2-digit",
                    day: "2-digit",
                    year: "numeric",
                  })}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant={"ghost"} size={"icon"}>
                        <MoreHorizontal />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem asChild>
                        <Link href={`/my-jobs/${job.id}/edit`}>
                          <PenBox />
                          Edit Job
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/my-jobs/${job.id}`}>
                          <CopyCheck />
                          Copy Job URL
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href={`/my-jobs/${job.id}/delete`}>
                          <XCircle />
                          Delete Job
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default MyJobList;
