import bcrypt from "bcryptjs";
import User, { IUser } from "../models/userModel";
import TokenService from "./tokenService";
import ApiError from "../utils/ApiError";

class AuthService {
  async login(email: string, password: string) {
    if (!email || !password) {
      throw ApiError.BadRequest("Please provide all values");
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      throw ApiError.BadRequest("An e-mail address doesn't exists");
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password!);

    if (!isPasswordCorrect) {
      throw ApiError.BadRequest("Bad credentials, try again please");
    }

    user.password = undefined;
    const tokens = TokenService.generateTokens(user._id);
    await TokenService.saveToken(user._id, tokens.refreshToken);

    return { user, ...tokens };
  }

  async register(email: string, password: string) {
    if (!email || !password) {
      throw ApiError.BadRequest("Please provide all values");
    }

    const candidate = await User.findOne({ email });

    if (candidate) {
      throw ApiError.BadRequest(
        "User with this e-mail address is already exists"
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword });
    const tokens = TokenService.generateTokens(user._id);

    await TokenService.saveToken(user._id, tokens.refreshToken);

    return { user, ...tokens };
  }

  async logout(refreshToken: string) {
    const token = await TokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }

    const decodedPayload = TokenService.verifyRefreshToken(refreshToken);
    const foundToken = await TokenService.findToken(refreshToken);

    if (!foundToken) {
      throw ApiError.UnauthorizedError();
    }

    if (!decodedPayload || typeof decodedPayload === "string") {
      throw ApiError.UnauthorizedError();
    }

    const user = (await User.findById(decodedPayload.userId)) as IUser;
    const accessToken = TokenService.generateAccessToken(user._id);

    return { user, accessToken };
  }
}

export default new AuthService();
