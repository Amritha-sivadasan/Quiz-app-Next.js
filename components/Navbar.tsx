"use client";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { MdQuiz } from "react-icons/md";
import UserMenu from "./UserMenu";
import { SignInButton, SignedOut } from "@clerk/nextjs";

const Navbar = () => {
  return (
    <div className="pt-4  w-full">
      <div className="max-w-[1500px] mx-auto w-[99%] flex justify-between items-center border-b pb-5">
        <div>
          <Link href="/" className="flex gap-1 items-center text-2xl">
            <h1 className=" text-dark font-bold"> Brain-quiz</h1>
            <MdQuiz className="text-primary " />
          </Link>
        </div>
        <div className="md:block hidden  text-nowrap  ">
          <span className=" bg-blue-600  px-5 py-3 rounded-md text-white">
            Today's category is Javascript
          </span>
        </div>

        <div className="flex items-center gap-5 ">
          <SignedOut>
            {" "}
            <SignInButton />
          </SignedOut>
          <UserMenu />
          <UserButton />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
