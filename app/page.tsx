/* eslint-disable react/no-unescaped-entities */
"use client";

import { MdCheckCircle } from "react-icons/md";
import { FaTools } from "react-icons/fa";

export default function Home() {
  return (
    <main>
      <div className="flex justify-center pt text-3xl font-medium pt-40 lg:pt-44">
        Welcome!
      </div>
      <div className="text-xl flex justify-center text-justify px-5 lg:px-0 pt-4">
        This is a WebApp to help you organize your Tasks. What needs to be done?
        Write it here, envite people, and share what you are doing!
      </div>
      <div className="text-2xl font-medium flex justify-center pt-12 px-5 lg:px-0 text-center">
        What does this App do?
      </div>
      <div className="text-xl flex justify-center text-justify px-5 lg:px-0">
        <div>
          <div className="flex items-center pt-4">
            <div className="text-green-500 pr-2 text-2xl">
              <MdCheckCircle />
            </div>
            <div>
              You can organize your family's Tasks in this App, such as "buy
              butter at the grocery store."
            </div>
          </div>
          <div className="flex items-center pt-2">
            <div className="text-green-500 pr-2 text-2xl">
              <MdCheckCircle />
            </div>
            <div>
              Add Friends to the App so they can read, edit, or delete Tasks.
            </div>
          </div>
          <div className="flex items-center pt-2">
            <div className="text-green-500 pr-2 text-2xl">
              <MdCheckCircle />
            </div>
            <div>
              Say goodbye to notes on the fridge or paper shopping lists!
            </div>
          </div>
          <div className="flex items-center pt-2">
            <div className="text-green-500 pr-2 text-2xl">
              <MdCheckCircle />
            </div>
            <div>Don't forget to open the App and check the Tasks daily!</div>
          </div>
        </div>
      </div>
      <div className="text-2xl font-medium flex justify-center pt-12 px-5 lg:px-0 text-center">
        You can Contribute:
      </div>
      <div className="text-xl flex justify-center text-justify px-5 lg:px-0 pb-32">
        <div>
          <div className="flex items-center pt-4">
            <div className="text-gray-500 pr-2 text-2xl">
              <FaTools />
            </div>
            <div>Give some feedback.</div>
          </div>
          <div className="flex items-center pt-2">
            <div className="text-gray-500 pr-2 text-2xl">
              <FaTools />
            </div>
            <div>Report Bugs and Issues.</div>
          </div>
          <div className="flex items-center pt-2">
            <div className="text-gray-500 pr-2 text-2xl">
              <FaTools />
            </div>
            <div>Suggest new ideas.</div>
          </div>
          <div className="flex items-center pt-2">
            <div className="text-gray-500 pr-2 text-2xl">
              <FaTools />
            </div>
            <div>Contribute with Code.</div>
          </div>
        </div>
      </div>
    </main>
  );
}
