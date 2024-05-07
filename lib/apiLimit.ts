"use server";

import { auth } from "@clerk/nextjs/server"
import prisma from "./prismadb";
import { MAX_FREE_COUNT } from "@/constants";

export const increaseApiLimit = async () => {
    const { userId } = auth();

    if (!userId) return;

    const userApiLimit = await prisma.userApiLimit.findUnique({
        where: { userId: userId}
    });
    
    if (userApiLimit) {
        await prisma.userApiLimit.update({
            where: { id: userApiLimit.id },
            data: {count: userApiLimit.count + 1}
        });

        return;
    }

    await prisma.userApiLimit.create({
        data: {
            userId: userId,
            count: 1
        }
    });

}

export const checkApiLimit = async () => {
    const { userId } = auth();
    console.log("HEREEE")
    if (!userId) return false

    const userApiLimit = await prisma.userApiLimit.findUnique({
        where: { userId: userId }
    });

    if (!userApiLimit || userApiLimit.count < MAX_FREE_COUNT)
        return true

    return false
}

export const getApiLimitCount = async () => {
    const { userId } = auth();

    if (!userId) return 0

    const userApiLimit = await prisma.userApiLimit.findUnique({
        where: { userId: userId }
    });

    if (!userApiLimit) return 0

    return userApiLimit.count;
}