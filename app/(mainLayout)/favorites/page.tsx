import EmptyState from "@/components/general/EmptyState";
import JobCard from "@/components/general/JobCard";
import { prisma } from "@/lib/db";
import { requireUser } from "@/lib/requireUser";
import React from "react";

const getFavorites = async (userId: string) => {
  const favoritePosts = await prisma.savedJobPosts.findMany({
    where: {
      userId: userId,
    },
    select: {
      jobPost: {
        select: {
          id: true,
          jobTitle: true,
          salaryFrom: true,
          salaryTo: true,
          employmentType: true,
          location: true,
          createdAt: true,
          company: {
            select: {
              name: true,
              logo: true,
              location: true,
              about: true,
            },
          },
        },
      },
    },
  });
  return favoritePosts;
};

const page = async () => {
  const session = await requireUser();
  const data = await getFavorites(session?.id as string);
  if (data.length === 0) {
    return (
      <EmptyState
        title="No Favorites"
        description="You dont have any favorites"
        buttonText="Find a job"
        href="/"
      />
    );
  }
  
  return <div className="grid grid-cols-1 mt-5 gap-4">
    {
      data.map(favorite=>(
        <JobCard key={favorite.jobPost.id} job={favorite.jobPost} />
      ))
    }

  </div>;
};

export default page;

////////////////////





// import EmptyState from "@/components/general/EmptyState";
// import { prisma } from "@/lib/db";
// import { requireUser } from "@/lib/requireUser";
// import React from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { MapPin, Calendar, Briefcase } from "lucide-react";


// const getFavorites = async (userId: string) => {
//   const favoritePosts = await prisma.savedJobPosts.findMany({
//     where: {
//       userId,
//     },
//     select: {
//       jobPost: {
//         select: {
//           id: true,
//           jobTitle: true,
//           salaryFrom: true,
//           salaryTo: true,
//           employmentType: true,
//           location: true,
//           createdAt: true,
//           company: {
//             select: {
//               name: true,
//               logo: true,
//               location: true,
//               about: true,
//             },
//           },
//         },
//       },
//     },
//   });
//   return favoritePosts;
// };

// const Page = async () => {
//   const session = await requireUser();
//   const data = await getFavorites(session?.id as string);

//   if (data.length === 0) {
//     return (
//       <EmptyState
//         title="No Favorites"
//         description="You don’t have any favorites yet"
//         buttonText="Find a job"
//         href="/jobs"
//       />
//     );
//   }

//   return (
//     <div className="max-w-6xl mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-6">Your Favorite Jobs</h1>
//       <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//         {data.map((fav) => {
//           const job = fav.jobPost;
//           return (
//             <Card
//               key={job.id}
//               className="rounded-2xl shadow-sm hover:shadow-md transition-all"
//             >
//               <CardHeader className="flex flex-row items-center gap-4">
//                 <img
//                   src={job.company.logo}
//                   alt={job.company.name}
//                   className="w-12 h-12 rounded-md object-contain border"
//                 />
//                 <div>
//                   <CardTitle className="text-lg font-semibold">
//                     {job.jobTitle}
//                   </CardTitle>
//                   <p className="text-sm text-gray-500">{job.company.name}</p>
//                 </div>
//               </CardHeader>
//               <CardContent className="space-y-3">
//                 <div className="flex items-center text-sm text-gray-600 gap-2">
//                   <Briefcase className="h-4 w-4" />
//                   <span>{job.employmentType}</span>
//                 </div>
//                 <div className="flex items-center text-sm text-gray-600 gap-2">
//                   <MapPin className="h-4 w-4" />
//                   <span>{job.location}</span>
//                 </div>
//                 <div className="flex items-center text-sm text-gray-600 gap-2">
//                   <Calendar className="h-4 w-4" />
           
//                 </div>
//                 <div className="flex flex-wrap gap-2">
//                   <Badge variant="secondary">
//                     ${job.salaryFrom} - ${job.salaryTo}
//                   </Badge>
//                 </div>
//                 <Button className="w-full mt-3" asChild>
//                   <a href={`/job/${job.id}`}>View Details</a>
//                 </Button>
//               </CardContent>
//             </Card>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default Page;


