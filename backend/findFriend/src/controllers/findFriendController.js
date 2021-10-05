var FindFriend = require("../models/findFriendModel");

exports.index = function (req, res) {
	FindFriend.get(function (err, users) {
		if (err) {
			return res.status(404).json({
				status: "error",
				message: "No FindFriend users in database found",
			});
		} else {
			res.status(200).json({
				status: "success",
				message: "FindFriend users retrieved successfully",
				data: users,
			});
		}	
	});
};

exports.setMatch = function (req, res) {
    var findFriend = new FindFriend();
    findFriend.userId = req.body.userId;
    findFriend.gender.push(req.body.gender);
    findFriend.art.push(req.body.art);
    findFriend.sport.push(req.body.sport);
    findFriend.music.push(req.body.music);
    findFriend.faculty.push(req.body.faculty);

    findFriend.save(function (err) {
        if (err) {
            res.json(err);
        } else {
            res.status(200).json({
                message: "New FindFriend match preferences created!",
                data: findFriend,
            });
        }
    });
}

exports.randomMatch = function (req, res) {
    var matchId = "";
    FindFriend.count().exec(function (err, count) {
        var random = Math.floor(Math.random() * count)
        
        FindFriend.findOne({userId:req.body.userId}, function (err, user) {
            FindFriend.findOne( { userId: { $nin: req.body.userId } }).skip(random).exec(function (err, match) {
                if (match !== null) {
                    user['matchUserId'] = match['userId']; 
                    user.save(); 
                    
                    res.status(200).json({
                        message: "New match found!",
                        matchId: matchId,
                        userData: user,
                        matchData: match,
                    });          
                } else {
                    res.status(404).json({
                        error: "Match not found!",
                    });
                }
            }); 
        });         
    })
}

exports.clearMatch = function (req, res) {
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