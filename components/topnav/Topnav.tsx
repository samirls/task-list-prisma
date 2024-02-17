"use client";

import React from "react";
import { FcTodoList } from "react-icons/fc";
import { usePathname } from "next/navigation";
import Link from "next/link";
import SheetComponent from "./SheetComponent";
import { signOutExecuted } from "@/app/actions/auth";
import { paths } from "../utils/paths";

function Topnav() {
  const pathname = usePathname();

  return (
    <div className="flex w-full justify-between items-center py-12 px-4 lg:px-20 shadow-md fixed top-0 h-32 bg-white z-30">
      <div className="text-2xl lg:text-4xl font-bold flex items-center gap-2">
        <FcTodoList />
        Task List App
      </div>

      <div className="gap-10 text-xl hidden lg:flex">
        {(pathname === paths.home() ||
          pathname === paths.login() ||
          pathname === paths.register()) && (
          <>
            <Link href={paths.home()} className="text-blue-400 hover:text-blue-600">
              Home
            </Link>
            <Link
              href={paths.community()}
              className="text-blue-400 hover:text-blue-600"
            >
              Community
            </Link>
            <Link href={paths.login()} className="text-blue-400 hover:text-blue-600">
              Login
            </Link>
            <Link
              href={paths.register()}
              className="text-blue-400 hover:text-blue-600"
            >
              Register
            </Link>
          </>
        )}
        {(pathname === "/tasks" ||
          pathname === "/friends" ||
          pathname === "/logout") && (
          <>
            <Link
              href={paths.community()}
              className="text-blue-400 hover:text-blue-600"
            >
              Community
            </Link>
            <Link href={paths.tasks()} className="text-blue-400 hover:text-blue-600">
              Tasks
            </Link>
            <Link href={paths.friends()} className="text-blue-400 hover:text-blue-600">
              Friends
            </Link>
            <Link
              href={""}
              onClick={() => signOutExecuted()}
              className="text-blue-400 hover:text-blue-600"
            >
              Sign Out
            </Link>
          </>
        )}
      </div>
      <SheetComponent />
    </div>
  );
}

export default Topnav;
