const findFriendService = require("../services/findFriendService");
const userAuth = require("../middlewares/userAuth");
let FindFriend = require("../models/findFriendModel");

exports.index =  async (req, res) => {
    try {
      const findFriendUsers = await findFriendService.getAllFindFriendsUsers();
      const emptyDatabase = findFriendUsers.length == 0;
  
      if (emptyDatabase) {
        return res.status(200).json({
          status: "success",
          msg: "No FindFriend Users in database found",
        });
      } else {
        return res.status(200).json({
          status: "success",
          msg: "FindFind Users retrieved successfully",
          data: findFriendUsers,
        });
      }
    } catch (err) {
      return res.status(400).json({
        status: "error",
        msg: err.toString(),
      });
    }
} 
       

exports.clearMatch = [userAuth.authenticateToken,
    async (req, res) => {
        try {
            const authHeader = req.headers["authorization"];
            const deletedCount = await findFriendService.clearMatch(authHeader);
            const isDeletedMatch = deletedCount == 1;
        
            if (isDeletedMatch) {
                return res.status(200).json({
                    status: "success",
                    msg: "Match deleted!",
                });
            } 
        } catch (err) {
            return res.status(400).json({
                status: "error",
                msg: err.toString(),
            });
        }
    }     
]   


exports.createMatch = [userAuth.authenticateToken,
    async (req, res) => {
        try {
            const authHeader = req.headers["authorization"];
            const interests = req.body.interests;
            const matchedPersonToken = await findFriendService.createMatch(interests, authHeader);

            const noMatch = matchedPersonToken == "";
        
            if (noMatch) {
                return res.status(404).json({
                    status: "error",
                    msg: "No suitable match found at the moment",
                });
            } else {
                return res.status(200).json({
                    status: "success",
                    msg: "Congratulations! You have a new match!",
                    data: { matchedPersonToken: matchedPersonToken},
                });
            }
        } catch (err) {
            return res.status(400).json({
                status: "error",
                msg: err.toString(),
            });
        }
    }     
]   
