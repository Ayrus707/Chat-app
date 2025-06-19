import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { pusherServer } from "@/app/libs/pusher";

export async function DELETE() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Step 1: Find all conversations the user is a part of
    const conversations = await prisma.conversation.findMany({
      where: {
        userIds: {
          has: currentUser.id,
        },
      },
      include: {
        users: true,
      },
    });

    // Step 2: Delete all these conversations
    for (const conversation of conversations) {
      await prisma.conversation.delete({
        where: { id: conversation.id },
      });

      // Optional: Notify other users via Pusher
      for (const user of conversation.users) {
        if (user.email && user.id !== currentUser.id) {
          await pusherServer.trigger(user.email, "conversation:delete", {
            id: conversation.id,
          });
        }
      }
    }

    // Step 3: Finally delete the user
    await prisma.user.delete({
      where: {
        id: currentUser.id,
      },
    });
    await pusherServer.trigger("global", "user:delete", {
  userId: currentUser.id,
});

    return new NextResponse("User and all their conversations deleted", {
      status: 200,
    });
  } catch (error) {
    console.error("[USER_DELETE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
