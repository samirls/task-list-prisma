"use server";

import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { unstable_noStore as noStore } from "next/cache";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function fetchFriends(user_id: string | undefined) {
  noStore();

  try {
    const data = await prisma.friends.findMany({
      where: {
        userId: user_id,
      },
      include: {
        friend: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch friends.");
  }
}

export async function addFriend(user_id: string, add_friend_email: string) {
  try {
    const friend = await prisma.user.findUnique({
      where: {
        email: add_friend_email,
      },
    });

    if (!friend) {
      throw new Error(`User with email ${add_friend_email} not found.`);
    }

    const existingFriend = await prisma.friends.findFirst({
      where: {
        userId: user_id,
        friendId: friend.id,
      },
    });

    if (existingFriend) {
      throw new Error("User already exists in your list");
    }

    await prisma.friends.create({
      data: {
        userId: user_id,
        friendId: friend.id,
      },
    });
  } catch (error) {
    console.error("Database Error:", error);
    throw error;
  }
  revalidatePath("/friends");
}

export async function deleteFriend(
  user_id: string,
  added_friend_id: string
) {
  try {
    await prisma.friends.deleteMany({
      where: {
        userId: user_id,
        friendId: added_friend_id,
      },
    });
    
  } catch (error) {
    throw error;
  }
  revalidatePath("/tasks");
}
