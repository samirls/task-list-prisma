"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { FcTodoList } from "react-icons/fc";
import { IoPersonAddSharp } from "react-icons/io5";
import { BiSolidLogIn, BiSolidLogOut } from "react-icons/bi";
import { FaHome } from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";
import { GiThreeFriends } from "react-icons/gi";
import Link from "next/link";

function SheetComponent() {
  const pathname = usePathname();


  return (
    <>
      <Sheet>
        <SheetTrigger className="absolute top-11 right-3 text-4xl text-black block lg:hidden">
          <IoMdMenu />
        </SheetTrigger>
        <SheetContent side="left" className="w-[200px]">
          <SheetHeader>
            <SheetTitle>Navigation</SheetTitle>
            <SheetDescription>
              <div className="flex flex-col justify-center h-80 p-5">
                <div className="flex flex-col justify-center gap-10 text-xl">
                  {(pathname === "/" ||
                    pathname === "/login" ||
                    pathname === "/register") && (
                    <>
                      <Link
                        href="/"
                        className={`text-blue-500 hover:text-blue-700 flex items-center gap-2 rounded-lg ${pathname === "/" ? "text-blue-800 underline" : ""}`}
                      >
                        <FaHome />
                        Home
                      </Link>
                      <Link
                        href="/login"
                        className={`text-blue-500 hover:text-blue-700 flex items-center gap-2 rounded-lg ${pathname === "/login" ? "text-blue-800 underline" : ""}`}
                      >
                        <BiSolidLogIn />
                        Login
                      </Link>
                      <Link
                        href="/register"
                        className={`text-blue-500 hover:text-blue-700 flex items-center gap-2 rounded-lg ${pathname === "/register" ? "text-blue-800 underline" : ""}`}
                      >
                        <IoPersonAddSharp />
                        Register
                      </Link>
                    </>
                  )}
                  {(pathname === "/tasks" ||
                    pathname === "/friends" ||
                    pathname === "/logout") && (
                    <>
                      <Link
                        href="/tasks"
                        className={`text-blue-500 hover:text-blue-700 flex items-center gap-2 rounded-lg ${pathname === "/tasks" ? "text-blue-800 underline" : ""}`}
                      >
                        <FcTodoList />
                        Tasks
                      </Link>
                      <Link
                        href="/friends"
                        className={`text-blue-500 hover:text-blue-700 flex items-center gap-2 rounded-lg ${pathname === "/friends" ? "text-blue-800 underline" : ""}`}
                      >
                        <GiThreeFriends />
                        Friends
                      </Link>
                      <Link
                        href="/logout"
                        className={`text-blue-500 hover:text-blue-700 flex items-center gap-2 rounded-lg ${pathname === "/logout" ? "text-blue-800 underline" : ""}`}
                      >
                        <BiSolidLogOut />
                        Logout
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default SheetComponent;
