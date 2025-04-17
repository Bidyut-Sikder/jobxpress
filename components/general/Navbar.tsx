import Link from "next/link";
import React from "react";
import logo from "@/public/logo.png";
import Image from "next/image";
import { Button } from "../ui/button";
import { ThemeToggle } from "./ThemeToggle";

function Navbar() {
  return (
    <nav className="flex justify-between items-center py-5">
      <Link href="/" className=" flex items-center gap-2">
        <Image src={logo} alt="Logo" width={40} height={40} />
        <h1 className="text-2xl font-bold">
          Job<span className="text-primary ">Xpress</span>
        </h1>
      </Link>

      <div className="flex items-center gap-4">
        <ThemeToggle />
        <Button>Login</Button>
      </div>
    </nav>
  );
}

export default Navbar;
