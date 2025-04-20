import Link from "next/link";
import React from "react";
import logo from "@/public/logo.png";
import Image from "next/image";
import { Button, buttonVariants } from "../ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { auth, signOut } from "@/auth";

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

      <div className="flex items-center gap-4">
        <ThemeToggle />

        {session?.user ? (
          <form
            action={async () => {
              "use server"; //required
              await signOut({ redirectTo: "/" });
            }}
          >
            <Button>Logout</Button>
          </form>
        ) : (
          <Link
            className={buttonVariants({ variant: "outline", size: "lg" })}
            href={"login"}
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
