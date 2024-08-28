"use server";

import Message from "@/models/Message";
import { revalidatePath } from "next/cache";
import { getSessionUser } from "@/utils/getSessionUser";

async function deleteMessage(messageId) {
  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userID)
    throw new Error("User ID is required");

  const { userID } = sessionUser;
  const message = await Message.findById(messageId);

  if (message.recipient.toString() !== userID) throw new Error("Unauthorized");

  await message.deleteOne();

  revalidatePath("/", "layout");
}

export default deleteMessage;
