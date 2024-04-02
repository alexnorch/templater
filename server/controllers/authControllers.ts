import { RequestHandler } from "../types";
import userService from "../services/authService";
import { CookieOptions } from "express";

const jwtMaxAge = 30 * 24 * 60 * 60 * 1000; // 30 days

const cookieOptions: CookieOptions = {
  maxAge: jwtMaxAge,
  httpOnly: true,
  sameSite: "none",
  secure: true,
  domain: "templatecraft-api.onrender.com",
};

export const loginUser: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { user, refreshToken, accessToken } = await userService.login(
      email,
      password
    );

    res.cookie("refreshToken", refreshToken, cookieOptions);

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

    res.cookie("refreshToken", refreshToken, cookieOptions);

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

export const changePassword: RequestHandler = async (req, res, next) => {};
