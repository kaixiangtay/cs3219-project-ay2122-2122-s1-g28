let FindFriend = require("../models/findFriendModel");
const findFriendService = require("../services/findFriendService");
const userAuth = require("../middlewares/userAuth");

exports.index =  async (req, res) => {
    try {
      const findFriendUsers = await findFriendService.getAllFindFriendsUsers();
      const emptyDatabase = findFriendUsers.length == 0;
  
      if (emptyDatabase) {
        return res.status(200).json({
          status: "success",
          msg: "No Users in database found",
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
       
exports.clearMatch = async (req, res) => {
    FindFriend.findOne({userId:req.body.userId}, function (err, user) {
        if (user == null) {
            res.status(404).json({ error: "User not found!"});
        } else {
            user.matchUserId = "";
            user.save();

            res.status(200).json({
                status: "Success",
                message: "Match deleted",
                data: user,
            });
        }
    })
} 

exports.clearMatch = [ userAuth.authenticateToken,
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
            const matchedPersonId = await findFriendService.createMatch(req.body.interests, authHeader);

            const noMatch = matchedPersonId == "";
        
            if (noMatch) {
                return res.status(404).json({
                    status: "error",
                    msg: "No suitable match found at the moment",
                });
            } else {
                return res.status(200).json({
                    status: "success",
                    msg: "Congratulations! You have a new match!",
                    data: { matchedPersonId: matchedPersonId},
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

