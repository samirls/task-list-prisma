import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Login() {
  return (
    <div>
      <div className="flex justify-center text-2xl pt-40 font-bold">Login</div>
      <div className="flex justify-center w-full pt-10">
        <div className="w-64 lg:w-80 bg-blue-100 rounded-lg shadow-lg p-8">
          <form className="w-full font-medium">
            <div>Email</div>
            <Input placeholder="example@gmail.com" className="w-full" />
            <div className="pt-10">Password</div>
            <Input
              placeholder="********"
              name="password"
              type="password"
              className="w-full"
            />
            <div className="font-normal pt-5 text-blue-500 hover:text-blue-300 hover:underline">
              <Link href=''>Forgot your password?</Link>
            </div>

            <Button type="submit" className="w-full mt-10">
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
