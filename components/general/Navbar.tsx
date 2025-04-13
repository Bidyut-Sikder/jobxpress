import Link from "next/link";
import React from "react";

function Navbar() {
  return (
    <nav className="flex justify-between items-center py-5">
      <Link href="/" className="text-2xl font-bold text-gray-800">
       <h1 className="text-2xl font-bold">Job<span className="text-primary ">Xpress</span></h1>
      </Link>

    </nav>
  );
}

export default Navbar;
