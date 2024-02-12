import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import Link from "next/link";

function Footer() {
  return (
    <div className="fixed bottom-0 w-screen h-20 lg:h-24 bg-slate-100 flex flex-col justify-around items-center z-40">
      <div className="text-lg">Created by samirls</div>
      <div className="flex text-2xl gap-5">
        <div className="text-purple-600 hover:text-purple-700 text-3xl">
          <Link
            href="https://github.com/samirls"
            target="_blank"
            rel="noreferrer"
          >
            <FaGithub />
          </Link>
        </div>
        <div className="text-blue-600 hover:text-blue-700 text-3xl">
          <Link
            href="https://www.linkedin.com/in/samir-laguardia/"
            target="_blank"
            rel="noreferrer"
          >
            <FaLinkedin />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Footer;
