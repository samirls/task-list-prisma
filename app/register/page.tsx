/* eslint-disable react/no-unescaped-entities */
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

export default function Register() {
  return (
    <div className="pb-32">
      <div className="flex justify-center text-2xl pt-40 font-bold">
        Register
      </div>
      <div className="flex justify-center w-full pt-8">
        <div className="w-220 lg:w-[600px] bg-blue-100 rounded-lg shadow-lg p-8">
          <form className="w-full font-medium">
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="pt-2">
                <div>Name</div>
                <Input placeholder="John Doe" className="w-full" />
              </div>
              <div className="pt-2">
                <div>Email</div>
                <Input placeholder="johndoe@gmail.com" className="w-full" />
              </div>
              <div className="pt-2">
                <div>Password</div>
                <Input
                  placeholder="********"
                  name="password"
                  type="password"
                  className="w-full"
                />
              </div>
              <div className="pt-2">
                <div>Confirm Password</div>
                <Input
                  placeholder="********"
                  name="confirmPassword"
                  type="password"
                  className="w-full"
                />
              </div>
              <div className="pt-2">
                <div>Sex</div>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select your sex" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="apple">Male</SelectItem>
                      <SelectItem value="banana">Female</SelectItem>
                      <SelectItem value="blueberry">Don't answer</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="pt-2">
                <div>Color</div>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a color" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="apple">Blue</SelectItem>
                      <SelectItem value="banana">Pink</SelectItem>
                      <SelectItem value="blueberry">Green</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="pt-2">
                <div>Age</div>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select your age" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="apple">18 or less</SelectItem>
                      <SelectItem value="banana">19 to 25</SelectItem>
                      <SelectItem value="blueberry">26 to 35</SelectItem>
                      <SelectItem value="blueberry">36 to 45</SelectItem>
                      <SelectItem value="blueberry">46 or above</SelectItem>
                    </SelectGroup>
                  </SelectContent>
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
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
