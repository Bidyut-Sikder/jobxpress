import Link from "next/link";
import React from "react";
import logo from "@/public/logo.png";
import Image from "next/image";
import { buttonVariants } from "../ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { auth } from "@/auth";
import UserDropDown from "./UserDropDown";

async function Navbar() {
  const session = await auth();

  return (
    <nav className="flex justify-between items-center py-5">
      <Link href="/" className=" flex items-center gap-2">
        <Image src={logo} alt="Logo" width={40} height={40} />
        <h1 className="text-2xl font-bold">
          Job<span className="text-primary ">Xpress</span>
        </h1>
      </Link>

      {/* Desktop navigation */}
      <div className="hidden md:flex items-center gap-5">
        <ThemeToggle />
        <Link href={"/post-job"} className={buttonVariants({ size: "lg" })}>
          Post Job
        </Link>
        {session?.user ? (
          <UserDropDown
            name={session.user.name as string}
            image={session.user.image as string}
            email={session.user.email as string}
          />
        ) : (
          <Link
            href={"/login"}
            className={buttonVariants({ variant: "outline", size: "lg" })}
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
