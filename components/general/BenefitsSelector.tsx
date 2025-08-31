import React, { ReactNode } from "react";
import {
  Briefcase,
  Users,
  Home,
  Stethoscope,
  GraduationCap,
  Plane,
  Gift,
  Coffee,
  Dumbbell,
  Laptop,
  Car,
  BookOpen,
  Shield,
  Globe,
  Sun,
  Clock,
  Heart,
  Baby,
  Building,
  Sparkles,
} from "lucide-react";
import { Badge } from "../ui/badge";
import { ControllerRenderProps } from "react-hook-form";

interface Benefit {
  id: string;
  label: string;
  icon: ReactNode;
}
interface iAppProps {
  field: ControllerRenderProps;
}
const BenefitsSelector = ({ field }: iAppProps) => {
  const toggleBenefit = (benefitId: string) => {
    console.log(field);
    const currentBenefits = field.value || [];
    const newBenefits = currentBenefits.includes(benefitId)
      ? currentBenefits.filter((id: string) => id !== benefitId)
      : [...currentBenefits, benefitId];

    field.onChange(newBenefits);
  };

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        {benefits.map((benefit) => {
          const isSelected = (field.value || []).includes(benefit.id);

          return (
            <Badge
              onClick={() => toggleBenefit(benefit.id)}
              className="cursor-pointer transition-all hover:scale-105
             active:scale-95 text-sm px-4 py-1.5 rounded-full"
              key={benefit.id}
              variant={isSelected ? "default" : "outline"}
            >
              <span className="flex items-center gap-2">
                {benefit.icon}
                {benefit.label}
              </span>
            </Badge>
          );
        })}
      </div>
      <div className="mt-4 text-sm text-muted-foreground">
        Selected Benefits:{" "}
        <span className="text-primary">{(field.value || []).length}</span>
      </div>
    </div>
  );
};

export default BenefitsSelector;

const benefits: Benefit[] = [
  { id: "401k", label: "401(k)", icon: <Briefcase className="w-3 h-3" /> },
  {
    id: "distributed",
    label: "Distributed team",
    icon: <Users className="w-3 h-3" />,
  },
  { id: "remote", label: "Remote work", icon: <Home className="w-3 h-3" /> },
  {
    id: "health",
    label: "Health insurance",
    icon: <Stethoscope className="w-3 h-3" />,
  },
  {
    id: "education",
    label: "Education stipend",
    icon: <GraduationCap className="w-3 h-3" />,
  },
  {
    id: "vacation",
    label: "Paid vacation",
    icon: <Plane className="w-3 h-3" />,
  },
  { id: "bonus", label: "Annual bonus", icon: <Gift className="w-3 h-3" /> },
  { id: "snacks", label: "Free snacks", icon: <Coffee className="w-3 h-3" /> },
  {
    id: "gym",
    label: "Gym membership",
    icon: <Dumbbell className="w-3 h-3" />,
  },
  {
    id: "equipment",
    label: "Work equipment",
    icon: <Laptop className="w-3 h-3" />,
  },
  {
    id: "commute",
    label: "Commuter benefits",
    icon: <Car className="w-3 h-3" />,
  },
  {
    id: "books",
    label: "Book allowance",
    icon: <BookOpen className="w-3 h-3" />,
  },
  {
    id: "insurance",
    label: "Life insurance",
    icon: <Shield className="w-3 h-3" />,
  },
  {
    id: "travel",
    label: "Travel opportunities",
    icon: <Globe className="w-3 h-3" />,
  },
  { id: "flex", label: "Flexible hours", icon: <Clock className="w-3 h-3" /> },
  {
    id: "wellness",
    label: "Wellness programs",
    icon: <Heart className="w-3 h-3" />,
  },
  {
    id: "parental",
    label: "Parental leave",
    icon: <Baby className="w-3 h-3" />,
  },
  {
    id: "office",
    label: "Modern office",
    icon: <Building className="w-3 h-3" />,
  },
  { id: "sun", label: "Summer Fridays", icon: <Sun className="w-3 h-3" /> },
  {
    id: "growth",
    label: "Career growth",
    icon: <Sparkles className="w-3 h-3" />,
  },
];
