'use client'

import Image from "next/image";
import  { useState } from "react";
import logo from "@/public/logo.png";
import { Card, CardContent } from "@/components/ui/card";
import UserTypeForm from "./UserTypeForm";
import CompanyForm from "@/app/onboarding/CompanyForm";

type UserSelectionType = "jobSeeker" | "company" | null;

function OnboardingForm() {
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState<UserSelectionType>(null);

  const handleUserTypeSelection = (type: UserSelectionType) => {
    setUserType(type);
    setStep(2);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <UserTypeForm onSelect={handleUserTypeSelection} />
      case 2:
        return userType === "company" ? (
             <CompanyForm />
        ) : (
          <p>User is a job seeker</p>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <div className="flex items-center gap-2 mb-10 ">
        <Image src={logo} alt="logo" width={50} height={50} />
        <h1 className="text-4xl font-bold">
          Job<span className="text-primary ">Xpress</span>
        </h1>
      </div>

      <Card className="max-w-lg w-full">
        <CardContent>
            {renderStep()}
        </CardContent>
      </Card>

    </>
  );
}

export default OnboardingForm;
