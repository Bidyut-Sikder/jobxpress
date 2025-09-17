import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { requireUser } from "@/lib/requireUser";
import { Check } from "lucide-react";
import Link from "next/link";
import React from "react";

const PaymentSuccess = async() => {
await requireUser()
  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center px-2">
      <Card className="w-[180px] md:w-[320px] sm:w-[250px] ">
        <div className="p-4 sm:p-6 flex flex-col items-center text-center">
          {/* Success Icon */}
          <div className="flex items-center justify-center w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-green-100 mb-3">
            <Check className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-green-600" />
          </div>
          <div className="mt-2 sm:mt-3 text-center w-full">
            <h2 className="text-sm sm:text-base md:text-lg font-semibold">
              Payment Successful
            </h2>
            <p className="text-[10px] sm:text-xs md:text-sm mt-1 sm:mt-2 text-muted-foreground tracking-tight">
              Congrats, your payment was successful. Your job posting is active!
            </p>
            <Button asChild className="w-full mt-2 sm:mt-3 text-xs sm:text-sm">
              <Link href={"/"}>Go back to Homepage</Link>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PaymentSuccess;
