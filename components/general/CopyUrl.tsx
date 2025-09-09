"use client";

import React from "react";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { Link2 } from "lucide-react";
import { toast } from "sonner";

const CopyUrl = ({ jobUrl }: { jobUrl: string }) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(jobUrl);
      toast.success("URL copied to clipboard");
    } catch (error) {
      console.log(error);
      toast.error("Failed to copy URL");
    }
  };
  return (
    <DropdownMenuItem onSelect={handleCopy}>
      <Link2 /> <span> Copy URL</span>
    </DropdownMenuItem>
  );
};

export default CopyUrl;
