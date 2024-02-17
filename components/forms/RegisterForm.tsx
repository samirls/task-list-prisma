"use client";

/* eslint-disable react/no-unescaped-entities */
//above code is to avoid errors using '
import { Input } from "@nextui-org/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useFormState } from "react-dom";
import { register } from "@/auth";
import { Select, SelectItem } from "@nextui-org/react";

export default function RegisterForm() {
  const [formState, action] = useFormState(register, {
    errors: {},
  });

  return (
    <div className="flex justify-center w-full pt-8">
      <div className="w-220 lg:w-[600px] bg-blue-100 rounded-lg shadow-lg p-8">
        <form className="w-full font-medium" action={action}>
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="pt-2">
              <Input
                label="Name"
                radius="sm"
                labelPlacement="outside"
                name="name"
                type="name"
                isInvalid={!!formState.errors.name}
                errorMessage={formState.errors.name?.join(", ")}
              />
            </div>
            <div className="pt-2">
              <Input
                label="Email"
                radius="sm"
                labelPlacement="outside"
                name="email"
                type="email"
                isInvalid={!!formState.errors.email}
                errorMessage={formState.errors.email?.join(", ")}
              />
            </div>
            <div className="pt-2">
              <Input
                label="Password"
                radius="sm"
                labelPlacement="outside"
                name="password"
                type="password"
                isInvalid={!!formState.errors.password}
                errorMessage={formState.errors.password?.join(", ")}
              />
            </div>
            {/*             <div className="pt-2">
              <Input
                label="Confirm Password"
                radius="sm"
                labelPlacement="outside"
                type="password"
                isInvalid={!!formState.errors.passwordConfirm}
                errorMessage={formState.errors.passwordConfirm?.join(", ")}
              />
            </div> */}
            <div className="pt-2">
              <Select labelPlacement="outside" label="Sex" name="sex">
                <SelectItem key={"male"} value="male">
                  Male
                </SelectItem>
                <SelectItem key={"female"} value="female">
                  Female
                </SelectItem>
                <SelectItem key={"no-answer"} value="no-answer">
                  Don't answer
                </SelectItem>
              </Select>
            </div>
            <div className="pt-2">
              <Select labelPlacement="outside" label="Color" name="color">
                <SelectItem key={"blue"} value="blue">
                  Blue
                </SelectItem>
                <SelectItem key={"pink"} value="pink">
                  Pink
                </SelectItem>
                <SelectItem key={"green"} value="green">
                  Green
                </SelectItem>
              </Select>
            </div>
            <div className="pt-2">
              <Select labelPlacement="outside" label="Age" name="age">
                <SelectItem key={"18orLess"} value="18orLess">
                  18 or less
                </SelectItem>
                <SelectItem key={"19to25"} value="19to25">
                  19 to 25
                </SelectItem>
                <SelectItem key={"26to35"} value="26to35">
                  26 to 35
                </SelectItem>
                <SelectItem key={"36to45"} value="36to45">
                  36 to 45
                </SelectItem>
                <SelectItem key={"46orAbove"} value="46orAbove">
                  46 or above
                </SelectItem>
              </Select>
            </div>
            <div className="col-span-2 font-normal">
              Already have an account?{" "}
              <span className="text-blue-500 font-medium hover:text-blue-300 hover:underline">
                <Link href="/login">Login</Link>
              </span>
            </div>

            <Button type="submit" className="w-full mt-8 col-span-2">
              Register
            </Button>
            {formState.errors._form ? (
              <div className="rounded p-2 bg-red-200 border border-red-400">
                {formState.errors._form?.join(", ")}
              </div>
            ) : null}
          </div>
        </form>
      </div>
    </div>
  );
}
