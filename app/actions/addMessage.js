"use server";

import Message from "@/models/Message";
import connectDB from "@/config/database";
import { getSessionUser } from "@/utils/getSessionUser";

async function addMessage(previousState, formData) {
  await connectDB();
  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userID)
    throw new Error("User ID is required");

  const { userID } = sessionUser;
  const recipient = formData.get("recipient");

  if (userID === recipient)
    return { error: "You can not send a message to yourself" };

  console.log(formData);

  const newMessage = new Message({
    sender: userID,
    recipient,
    property: formData.get("property"),
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    body: formData.get("body"),
  });

  await newMessage.save();

  return { submitted: true };
}

export default addMessage;
