import { RequestHandler } from "../types";
import UserService from "../services/userServices";

export const changePassword: RequestHandler = async (req, res, next) => {
  const userService = new UserService(req.userId);

  try {
    const updatedUser = await userService.changePassword(req.body);
    res.send(updatedUser);
  } catch (error) {
    next(error);
  }
};
