"use server";

import { authConfig } from "@/auth.config";
import bcrypt from "bcrypt";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { z } from "zod";
import { PrismaClient, User } from "@prisma/client";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

const prisma = new PrismaClient();

export async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return undefined;
    }

    return user;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(3) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) return user;
        }

        console.log("Invalid credentials");
        return null;
      },
    }),
  ],
});

export async function authenticate({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    await signIn("credentials", { email, password, redirect: false });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          throw new Error("Invalid credentials.");
        default:
          throw new Error("Something went wrong.");
      }
    }
    throw error;
  }
  redirect("/tasks");
}

const registerFormSchema = z.object({
  name: z.string().min(2),
  email: z.string().min(2),
  password: z.string().min(2),
  sex: z.string(),
  color: z.string(),
  age: z.string(),
});

interface RegisterFormState {
  errors: {
    name?: string[];
    email?: string[];
    password?: string[];
    sex?: string[];
    color?: string[];
    age?: string[];
    _form?: string[];
  };
}

export async function register(
  formState: RegisterFormState,
  formData: FormData
): Promise<RegisterFormState> {
  const result = registerFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    sex: formData.get("sex"),
    color: formData.get("color"),
    age: formData.get("age"),
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  try {
    const hashedPassword = await bcrypt.hash(result.data.password, 10);

    await prisma.user.create({
      data: {
        name: result.data.name,
        email: result.data.email,
        password: hashedPassword,
        sex: result.data.sex,
        color: result.data.color,
        age: result.data.age,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        errors: {
          _form: [error.message],
        },
      };
    } else {
      return {
        errors: {
          _form: ["Something went wrong"],
        },
      };
    }
  }

  redirect("/login");
}
