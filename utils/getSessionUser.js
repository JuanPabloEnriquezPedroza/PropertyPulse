import { authOptions } from "./authOptions";
import { getServerSession } from "next-auth";

export const getSessionUser = async () => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) return null;
  return {
    user: session.user,
    userID: session.user.id,
  };
};
