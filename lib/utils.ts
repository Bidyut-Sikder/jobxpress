import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { countryList } from "./countriesList";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

// export const formatTimef = (date: Date) => {
//   const now = new Date();
//   const diffInDays = Math.floor(
//     (now.getTime() - new Date(date).getTime()) / (1000 * 60 * 60 * 24)
//   );
//   if (diffInDays === 0) {
//     return "Posted Today.";
//   } else if (diffInDays === 1) {
//     return "Posted 1 day ago.";
//   } else {
//     return `Posted ${diffInDays} ago.`;
//   }
// };

export const formatTime = (date: Date) => {
  const now = new Date();
  const diffInMs = now.getTime() - new Date(date).getTime();

  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) {
    return "Posted Today.";
  } else if (diffInDays < 7) {
    return `Posted ${diffInDays} day${diffInDays > 1 ? "s" : ""} ago.`;
  } else if (diffInDays < 30) {
    const weeks = Math.floor(diffInDays / 7);
    const days = diffInDays % 7;
    let result = weeks === 1 ? "1 week" : `${weeks} weeks`;
    if (days > 0) result += ` ${days} day${days > 1 ? "s" : ""}`;
    return `Posted ${result} ago.`;
  } else if (diffInDays < 365) {
    const months = Math.floor(diffInDays / 30);
    const days = diffInDays % 30;
    let result = months === 1 ? "1 month" : `${months} months`;
    if (days > 0) result += ` ${days} day${days > 1 ? "s" : ""}`;
    return `Posted ${result} ago.`;
  } else {
    const years = Math.floor(diffInDays / 365);
    const months = Math.floor((diffInDays % 365) / 30);
    let result = years === 1 ? "1 year" : `${years} years`;
    if (months > 0) result += ` ${months} month${months > 1 ? "s" : ""}`;
    return `Posted ${result} ago.`;
  }
};

export function getFlagEmoji(location: string) {
  const cleanLocation = location.trim().toLocaleLowerCase();

  const country = countryList.find((country) =>
    cleanLocation.includes(country.name.trim().toLocaleLowerCase())
  );
  return country?.flagEmoji || "";
}
