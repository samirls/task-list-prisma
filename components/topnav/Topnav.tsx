"use client";

import React from "react";
import { FcTodoList } from "react-icons/fc";
import { usePathname } from "next/navigation";
import Link from "next/link";
import SheetComponent from "./SheetComponent";


function Topnav() {
  const pathname = usePathname();

  return (
    <div className="flex w-full justify-between items-center py-12 px-4 lg:px-20 shadow-md fixed top-0 h-32 bg-white z-10">
      <div className="text-2xl lg:text-4xl font-bold flex items-center gap-2">
        <FcTodoList />
        Task List App
      </div>

      <div className="gap-10 text-xl hidden lg:flex">
        {(pathname === "/" ||
          pathname === "/login" ||
          pathname === "/register") && (
          <>
            <Link href="/" className="text-blue-400 hover:text-blue-600">
              Home
            </Link>
            <Link href="/login" className="text-blue-400 hover:text-blue-600">
              Login
            </Link>
            <Link
              href="/register"
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
            <Link href="/tasks" className="text-blue-400 hover:text-blue-600">
              Tasks
            </Link>
            <Link
              href="/friends"
              className="text-blue-400 hover:text-blue-600"
            >
              Friends
            </Link>
            <Link
              href="/logout"
              className="text-blue-400 hover:text-blue-600"
            >
              Logout
            </Link>
          </>
        )}
      </div>
      <SheetComponent />
    </div>
  );
}

export default Topnav;
