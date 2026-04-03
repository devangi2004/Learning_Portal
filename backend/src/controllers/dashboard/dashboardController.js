import User from "../../models/User.js";
import PracticeResult from "../../models/PracticeResult.js";

export const getDashboard = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId);
    const recentResults = await PracticeResult.find({ userId: req.user.userId })
      .sort({ createdAt: -1 })
      .limit(10);

    res.json({
      streakCount: user.streakCount,
      xp: user.xp,
      level: user.level,
      recentResults,
    });
  } catch (error) {
    next(error);
  }
};

export const addXp = async (req, res, next) => {
  try {
    const { points = 10 } = req.body;
    const user = await User.findById(req.user.userId);
    user.xp += points;
    user.level = Math.max(1, Math.floor(user.xp / 100) + 1);

    const today = new Date().toDateString();
    if (user.lastActiveAt?.toDateString() !== today) {
      user.streakCount += 1;
      user.lastActiveAt = new Date();
    }

    await user.save();
    res.json({ xp: user.xp, level: user.level, streakCount: user.streakCount });
  } catch (error) {
    next(error);
  }
};
