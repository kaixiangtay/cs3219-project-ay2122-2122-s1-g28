import findFriendService from "../services/findfriendService.js";
import userAuth from "../middlewares/userAuth.js";

const index = [
  async (req, res) => {
    try {
      const findFriendUsers = await findFriendService.getAllFindFriendsUsers();
      const emptyDatabase = findFriendUsers.length === 0;

      if (emptyDatabase) {
        return res.status(200).json({
          status: "success",
          msg: "No FindFriend Users in database found",
        });
      } else {
        return res.status(200).json({
          status: "success",
          msg: "FindFriend Users retrieved successfully",
          data: findFriendUsers,
        });
      }
    } catch (err) {
      return res.status(400).json({
        status: "error",
        msg: err.toString(),
      });
    }
  },
];

const clearMatch = [
  userAuth.decodeToken,
  async (req, res) => {
    try {
      const userId = req.userId;
      const deleted = await findFriendService.clearMatch(userId);
      const isDeletedMatch = deleted == null;

      if (isDeletedMatch) {
        return res.status(200).json({
          status: "success",
          msg: "Match deleted!",
        });
      } else {
        return res.status(404).json({
          status: "error",
          msg: "User already deleted!",
        });
      }
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        status: "error",
        msg: err.toString(),
      });
    }
  },
];

const createMatch = [
  userAuth.decodeToken,
  async (req, res) => {
    try {
      const userId = req.userId;
      const interests = req.body.interests;
      // return a chat room if there is a match
      const roomId = await findFriendService.createMatch(interests, userId);
      const noMatch = roomId === "";

      if (noMatch) {
        return res.status(404).json({
          status: "error",
          msg: "No suitable match found at the moment",
        });
      } else {
        return res.status(200).json({
          status: "success",
          msg: "Congratulations! You have a new match!",
          data: { roomId },
        });
      }
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        status: "error",
        msg: err.toString(),
      });
    }
  },
];

export default { index, clearMatch, createMatch };
