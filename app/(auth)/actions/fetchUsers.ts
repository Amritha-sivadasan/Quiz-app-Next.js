"use server"
import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

interface User {
  id: string;
  username: string;
  email: string;
  profilePic: string;
  clerkUserId: string;
  createdAt: Date;
  updatedAt: Date;
}

export const fetchUsers = async () => {
  try {
    const clerkUser = await currentUser();
   
    let mongoUser: User | null = await prisma.user.findUnique({
      where: {
        clerkUserId: clerkUser?.id || undefined // Ensure clerkUser?.id is defined or pass undefined
      }
    });

    if (!mongoUser) {
      let username = clerkUser?.username;
      if (!username) {
        username = clerkUser?.firstName + " " + clerkUser?.lastName;
      }
      const newUser: User = {
        clerkUserId: clerkUser?.id || "",
        username: username || "",
        email: clerkUser?.emailAddresses[0]?.emailAddress || "",
        profilePic: clerkUser?.imageUrl || "",
        id: "", // Ensure all required fields are initialized
        createdAt: new Date(),
        updatedAt: new Date()
      };

      mongoUser = await prisma.user.create({
        data: newUser
      });
    }

    const quizResults = await prisma.quizResult.findMany({
      where: {
        userId: mongoUser.id
      }
    });

    return {
      data: {
        user: mongoUser,
        quizResults
      }
    };
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch user data");
  }
};
