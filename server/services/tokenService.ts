import jwt from "jsonwebtoken";
import Token from "../models/tokenModel";

class TokenService {
  generateTokens(userId: string) {
    const accessToken = jwt.sign({ userId }, process.env.JWT_ACCESS_SECRET!, {
      expiresIn: "24h",
    });

    const refreshToken = jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET!, {
      expiresIn: "30d",
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  generateAccessToken(userId: string) {
    return jwt.sign({ userId }, process.env.JWT_ACCESS_SECRET!, {
      expiresIn: "24h",
    });
  }

  verifyAccessToken(token: string) {
    try {
      return jwt.verify(token, process.env.JWT_ACCESS_SECRET!);
    } catch (error) {
      return null;
    }
  }

  verifyRefreshToken(token: string) {
    try {
      return jwt.verify(token, process.env.JWT_REFRESH_SECRET!);
    } catch (error) {
      return null;
    }
  }

  async saveToken(userId: string, refreshToken: string) {
    const foundToken = await Token.findOne({ user: userId });

    if (foundToken) {
      foundToken.refreshToken = refreshToken;
      return foundToken.save();
    }

    const token = await Token.create({ user: userId, refreshToken });

    return token;
  }

  async removeToken(refreshToken: string) {
    const deletedToken = await Token.findOneAndDelete({ refreshToken });

    return deletedToken;
  }

  async findToken(refreshToken: string) {
    const foundToken = await Token.findOne({ refreshToken });

    return foundToken;
  }
}

export default new TokenService();
