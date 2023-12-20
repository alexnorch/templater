import { RequestHandler } from "../types";
import AppError from "../utils/AppError";
import User from "../models/userModel";

export const loginUser: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return next(new AppError("Please provide all values", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new AppError("An e-mail address doesn't exists", 400));
    }

    const isPasswordCorrect = await user.comparePassword(
      password,
      user.password!
    );

    if (!isPasswordCorrect) {
      return next(new AppError("Bad credentials, try again please", 401));
    }

    user.password = undefined;

    await user.populate("templates");
    await user.populate("categories");

    const token = user.generateToken(user._id);

    res.json({
      user: { id: user._id, email: user.email },
      data: { templates: user.templates, categories: user.categories },
      token,
    });
  } catch (error) {
    next(error);
  }
};

export const registerUser: RequestHandler = async (req, res, next) => {
  const { email, password, confirmPassword } = req.body;

  try {
    if (!email || !password || !confirmPassword) {
      return next(new AppError("Please provide all values", 400));
    }

    if (password !== confirmPassword) {
      return next(new AppError("Password do NOT match", 400));
    }

    const alreadyExists = await User.findOne({ email });

    if (alreadyExists) {
      return next(new AppError("User already exists", 409));
    }

    const newUser = new User({ email, password });
    const user = await newUser.save();
    const token = user.generateToken(user._id);

    res.json({ user, token });
  } catch (error) {
    next(error);
  }
};
