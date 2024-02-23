import { RequestHandler } from "../types";
import userService from "../services/userService";

const jwtMaxAge = 30 * 24 * 60 * 60 * 1000; // 30 days

export const loginUser: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { user, refreshToken, accessToken } = await userService.login(
      email,
      password
    );

    res.cookie("refreshToken", refreshToken, {
      maxAge: jwtMaxAge,
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });

    return res.json({ user, accessToken });
  } catch (error) {
    next(error);
  }
};

export const registerUser: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const { user, accessToken, refreshToken } = await userService.register(
      email,
      password
    );

    res.cookie("refreshToken", refreshToken, {
      maxAge: jwtMaxAge,
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });

    return res.json({ user, accessToken });
  } catch (error) {
    next(error);
  }
};

export const logoutUser: RequestHandler = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;
    const token = await userService.logout(refreshToken);

    res.clearCookie("refreshToken");

    return res.json(token);
  } catch (e) {
    next(e);
  }
};

export const refresh: RequestHandler = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;

    const userData = await userService.refresh(refreshToken);

    return res.json(userData);
  } catch (e) {
    next(e);
  }
};
