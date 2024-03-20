import ApiError from "../exceptions/ApiError";
import User, { IUser } from "../models/userModel";
import bcrypt from "bcryptjs";

class UserService {
  private userId: string;

  constructor(userId: string) {
    this.userId = userId;
  }

  async changePassword(passwords: {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) {
    const { oldPassword, newPassword, confirmPassword } = passwords;
    const user = (await User.findById(this.userId).select(
      "+password"
    )) as IUser;

    if (!newPassword || !confirmPassword || !oldPassword) {
      throw ApiError.BadRequest("Please provide all values");
    }

    const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password!);

    if (!isPasswordCorrect) {
      throw ApiError.BadRequest("Incorrect old password provided");
    }

    if (newPassword !== confirmPassword) {
      throw ApiError.BadRequest("Passwords doesn't match");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    const updatedUser = await user.save();

    user.password = undefined;

    return updatedUser;
  }
}

export default UserService;
