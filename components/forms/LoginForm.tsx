"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";
import { authenticate } from "@/app/actions/auth";
import { Ban, Loader2 } from "lucide-react";
import React, { FormEvent, useState } from "react";
import { toast } from "sonner";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      if (email === "" || password === "") {
        return toast.error("Fill all the fields");
      }

      setIsLoading(true);
      await authenticate({ email, password });
      setIsLoading(false);

      setEmail("");
      setPassword("");
      toast.success("You are logged in!");
      //router.push("/tasks");
    } catch (error) {
      setIsLoading(false);
      toast.error(`Error: ${error}`);
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center w-full pt-10">
      <div className="w-64 lg:w-80 bg-blue-100 rounded-lg shadow-lg p-8">
        <form className="w-full font-medium">
          <div>Email</div>
          <Input
            placeholder="example@gmail.com"
            className="w-full"
            id="email"
            type="email"
            name="email"
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <div className="pt-10">Password</div>
          <Input
            className="w-full"
            placeholder="********"
            id="password"
            name="password"
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <div className="font-normal pt-5 text-blue-500 hover:text-blue-300 hover:underline">
            <Link href="">Forgot your password?</Link>
          </div>

          <Button
            type="submit"
            className="w-full mt-10"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Login"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
