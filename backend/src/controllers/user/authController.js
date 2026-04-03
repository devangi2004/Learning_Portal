import bcrypt from "bcryptjs";
import User from "../../models/User.js";
import { signToken } from "../../utils/token.js";

export const signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const existing = await User.findOne({ email });

    if (existing) {
      return res.status(409).json({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    const token = signToken({ userId: user._id, email: user.email });

    res.status(201).json({ token, user: { id: user._id, name, email } });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = signToken({ userId: user._id, email: user.email });

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, xp: user.xp, level: user.level },
    });
  } catch (error) {
    next(error);
  }
};
