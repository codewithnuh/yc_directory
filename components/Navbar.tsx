import { auth } from "@/auth";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = async () => {
  const session = await auth();
  return (
    <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href={"/"}>
          <Image src={"/logo.png"} width={144} height={30} alt="YC" />
        </Link>
        <div className="flex items-center gap-5">
          {session && session?.user ? (
            <>
              <Link href={"/startup/create"}>Create</Link>
              <button>
                <span>Logout</span>
              </button>
            </>
          ) : (
            <button>Sign In</button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
