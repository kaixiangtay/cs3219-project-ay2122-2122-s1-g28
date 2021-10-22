let FindFriend = require("../models/findFriendModel");

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


exports.customMatch = async function (req, res) {
    
    var findFriend = new FindFriend();
    findFriend.userId = req.body.userId;
    const inputGender = req.body.gender;
    const inputFaculty = req.body.faculty;
    const inputArt = req.body.art;
    const inputMusic = req.body.music;
    const inputSport = req.body.sport;
    const genderArr = inputGender.split(',');
    const facultyArr = inputFaculty.split(',');
    const artArr = inputArt !== undefined ? inputArt.split(',') : "";
    const musicArr = inputMusic !== undefined ? inputMusic.split(',') : "";
    const sportArr = inputSport !== undefined ? inputSport.split(',') : "";

    genderArr.forEach((curr) => {
        findFriend.gender.push(curr);
    })
   
    facultyArr.forEach((curr) => {
        findFriend.faculty.push(curr);
    })
 
    artArr.forEach((curr) => {
        findFriend.art.push(curr);
    })
    
    musicArr.forEach((curr) => {
        findFriend.music.push(curr);
    })

    sportArr.forEach((curr) => {
        findFriend.sport.push(curr);
    })
    // findFriend.art.push(req.body.art);
    // findFriend.sport.push(req.body.sport);
    // findFriend.music.push(req.body.music);

    let matchingGender, matchingArt, matchingSport, matchingMusic, matchingFaculty;

    if (findFriend.gender.length > 0) {
        matchingGender = await FindFriend.aggregate([
            {
                $unwind: { path: "$gender", preserveNullAndEmptyArrays: true }
            },
            {
                $match: {
                    gender: {$in: findFriend.gender},
                }
            },
            {
                $group: {
                    _id: '$userId',
                    genderCount: { $sum: 1 }
                },
            },
        ])
    }

    if (findFriend.art.length > 0) {
        matchingArt = await FindFriend.aggregate([
            {
                $unwind: { path: "$art", preserveNullAndEmptyArrays: true }
            },
            {
                $match: { art: {$in: findFriend.art} },
            },
            {
                $group: {
                    _id: '$userId',
                    artCount: { $sum: 1 }
                }
            }
        ]);
    }

    if (findFriend.sport.length > 0) {
        matchingSport = await FindFriend.aggregate([
            {
                $unwind: { path: "$sport", preserveNullAndEmptyArrays: true }
            },
            {
                $match: { sport: {$in: findFriend.sport} },
            },
            {
                $group: {
                    _id: '$userId',
                    sportCount: { $sum: 1 }
                  }
            }
        ]);
    }

    if (findFriend.music.length > 0) {
        matchingMusic = await FindFriend.aggregate([
            {
                $unwind: { path: "$music", preserveNullAndEmptyArrays: true }
            },
            {
                $match: { music: {$in: findFriend.music} },
            },
            {
                $group: {
                    _id: '$userId',
                    musicCount: { $sum: 1 }
                  }
            }
        ]);
    }

    if (findFriend.faculty.length > 0) {
        matchingFaculty = await FindFriend.aggregate([
            {
                $unwind: { path: "$faculty", preserveNullAndEmptyArrays: true }
            },
            {
                $match: { faculty: {$in: findFriend.faculty} },
            },
            {
                $group: {
                    _id: '$userId',
                    facultyCount: { $sum: 1 }
                }
            },
        ]);
    }

    const result = merge(matchingArt, merge(matchingSport, merge(matchingMusic, merge(matchingGender, matchingFaculty))));
    
    result.forEach(curr => {
        let totalCount = 0;

        if (curr.genderCount !== undefined) {
            totalCount = totalCount + curr.genderCount;
        }

        if (curr.facultyCount !== undefined) {
            totalCount = totalCount + curr.facultyCount;
        }

        if (curr.musicCount !== undefined) {
            totalCount = totalCount + curr.musicCount;
        }

        if (curr.artCount !== undefined) {
            totalCount = totalCount + curr.artCount;
        }

        if (curr.sportCount !== undefined) {
            totalCount = totalCount + curr.sportCount;
        }

        curr["totalCount"] = totalCount;
       });
       
    // return total number of matches in descending order
   let sortedMatch = result.sort((c1, c2) => (c1.totalCount < c2.totalCount) ? 1 : (c1.totalCount > c2.totalCount) ? -1 : 0);
   console.log(sortedMatch);
   findFriend.matchUserId = sortedMatch[0]._id;
    
   // findFriend.save();   
  return res.status(200).json({msg:"OK", data: findFriend});
}


const merge = (arr1, arr2) => {
    let hash = new Map();

    arr1.concat(arr2).forEach((obj) => {
        hash.set(obj._id, Object.assign(hash.get(obj._id) || {}, obj))
    });

    let a3 = Array.from(hash.values());
    return a3;
}
