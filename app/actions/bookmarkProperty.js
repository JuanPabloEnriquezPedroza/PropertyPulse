"use server";

import User from "@/models/User";
import connectDB from "@/config/database";
import { revalidatePath } from "next/cache";
import { getSessionUser } from "@/utils/getSessionUser";

async function bookmarkProperty(propertyId) {
  await connectDB();
  const sessionUser = await getSessionUser();
  
  if (!sessionUser || !sessionUser.userID)
    throw new Error("User ID is required");

  const { userID } = sessionUser;
  const user = await User.findById(userID);
  let isBookmarked = user.bookmarks.includes(propertyId);
  let message;
  if (isBookmarked) {
    user.bookmarks.pull(propertyId);
    message = "Bookmark Removed";
    isBookmarked = false;
  } else {
    user.bookmarks.push(propertyId);
    message = "Bookmark Added";
    isBookmarked = true;
  }

  await user.save();
  revalidatePath("/properties/saved", "page");

  return {
    message,
    isBookmarked,
  };
}

export default bookmarkProperty;
