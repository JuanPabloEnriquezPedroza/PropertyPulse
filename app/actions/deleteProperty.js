"use server";

import Property from "@/models/Property";
import connectDB from "@/config/database";
import { revalidatePath } from "next/cache";
import cloudinary from "@/config/cloudinary";
import { getSessionUser } from "@/utils/getSessionUser";

async function deleteProperty(propertyId) {
  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userID) throw new Error("User ID is required");

  const { userID } = sessionUser;

  const property = await Property.findById(propertyId);

  if (!property) throw new Error("Property not found");

  if (property.owner.toString() !== userID) throw new Error("Unauthorized");

  const publicIds = property.images.map((imageUrl) => {
    const parts = imageUrl.split("/");
    return parts.at(-1).split(".").at(0);
  });

  if (publicIds.lenght > 0)
    for (let publicId of publicIds)
      await cloudinary.uploader.destroy("propertypulse/" + publicId);

  await property.deleteOne();

  revalidatePath("/", "layout");
}

export default deleteProperty;
