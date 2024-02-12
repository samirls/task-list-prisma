"use server";
import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";
import { revalidatePath } from "next/cache";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function fetchTasks(user_id: string) {
  noStore();

  try {
    const data = await prisma.task.findMany({
      where: {
        users: {
          some: {
            id: user_id,
          },
        },
      },
      include: {
        users: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch comments.");
  }
}

export async function createTask(task: string, user_id: string) {
  try {
    await prisma.task.create({
      data: {
        content: task,
        userCreatorId: user_id,
        users: { connect: { id: user_id } },
      },
    });
  } catch (error) {
    console.error("Failed to create task:", error);
    throw new Error("Failed to create task.");
  }
  revalidatePath("/tasks");
}

export async function deleteTask(id: string) {
  try {
    await prisma.task.delete({
      where: {
        id: id,
      },
    });
  } catch (error) {
    console.error("Failed to delete task:", error);
    throw new Error("Failed to delete task.");
  }
  revalidatePath("/tasks");
}

export async function editTask(id: string, editedTask: string) {
  try {
    await prisma.task.update({
      where: {
        id: id,
      },
      data: {
        content: editedTask,
      },
    });
  } catch (error) {
    console.error("Failed to edit task:", error);
    throw new Error("Failed to edit task.");
  }

  revalidatePath("/tasks");
}

export async function shareTask(task_id: string, users_ids: string[]) {
  try {
    const currentUsers = await prisma.task
      .findUnique({
        where: {
          id: task_id,
        },
        select: {
          users: {
            select: {
              id: true,
            },
          },
        },
      })
      .then((task) => task?.users.map((user) => user.id) || []);

    const usersToConnect = users_ids.filter((id) => !currentUsers.includes(id));
    const usersToDisconnect = currentUsers.slice(1).filter(
      (id) => !users_ids.includes(id)
    );

    await prisma.task.update({
      where: {
        id: task_id,
      },
      data: {
        users: {
          connect: usersToConnect.map((id) => ({ id })),
          disconnect: usersToDisconnect.map((id) => ({ id })),
        },
      },
    });
  } catch (error) {
    return {
      message: "Database Error. Failed to share task.",
    };
  }
  revalidatePath("/tasks");
}
