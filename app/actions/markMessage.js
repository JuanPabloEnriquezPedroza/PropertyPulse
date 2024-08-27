"use server";

import Message from "@/models/Message";
import connectDB from "@/config/database";
import { revalidatePath } from "next/cache";
import { getSessionUser } from "@/utils/getSessionUser";

async function markMessageAsRead(messageId) {
  await connectDB();
  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userID)
    throw new Error("User ID is required");

  const { userID } = sessionUser;
  const message = await Message.findById(messageId);

  if (!message) throw new Error("Message not found");
  if (message.recipient.toString() !== userID) throw new Error("Unauthorized");

  message.read = !message.read;
  revalidatePath("/messages", "page");
  await message.save();
  return message.read;
}

export default markMessageAsRead;
