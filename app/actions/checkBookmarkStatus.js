"use server";

import User from "@/models/User";
import connectDB from "@/config/database";
import { getSessionUser } from "@/utils/getSessionUser";

async function checkBookmarkStatus(propertyId) {
  await connectDB();
  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userID)
    throw new Error("User ID is required");

  const { userID } = sessionUser;
  const user = await User.findById(userID);
  let isBookmarked = user.bookmarks.includes(propertyId);

  return {
    isBookmarked,
  };
}

export default checkBookmarkStatus;
