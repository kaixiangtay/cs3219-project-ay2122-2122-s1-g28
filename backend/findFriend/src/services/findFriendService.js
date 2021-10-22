let FindFriend = require("../models/findFriendModel");
let userAuth = require("../middlewares/userAuth");

async function getAllFindFriendsUsers() {
    const users = await FindFriend.find();
    return users;
  }

function splitString(data) {
    const dataArr = data.length > 0 ? data.split(',') : "";
    return dataArr;
}

const merge = (arr1, arr2) => {
    let hash = new Map();

    arr1.concat(arr2).forEach((obj) => {
        hash.set(obj._id, Object.assign(hash.get(obj._id) || {}, obj))
    });

    let a3 = Array.from(hash.values());
    return a3;
}

async function randomMatch() {
    const count = await FindFriend.count();

    if (count == 0) {
        // No user in database to be matched
        return "";
    }
    
    let random = Math.floor(Math.random() * count);

    // Get a random user who is already in database
    const result = await FindFriend.findOne().skip(random);

    let matchedPersonId = result.userId;
    return matchedPersonId;
}

async function createMatch(inputData, authHeader) {
    const userID = userAuth.decodeAuthToken(authHeader);


    let findFriend = new FindFriend();
    let matchedPersonId = "";

    findFriend.userId = userID;

    const genderChoices = inputData.gender;
    const facultyChoices= inputData.faculty;
    const artChoices = inputData.art;
    const musicChoices = inputData.music;
    const sportChoices = inputData.sport;
    const anyMatch = (genderChoices.length == 0 && facultyChoices.length == 0 && artChoices.length == 0 && musicChoices.length == 0 && sportChoices.length == 0);

    if (anyMatch) {
        matchedPersonId = randomMatch();
        return matchedPersonId;
    } 

    let matchingGender, matchingArt, matchingSport, matchingMusic, matchingFaculty;

    if (genderChoices.length > 0) {
        matchingGender = await FindFriend.aggregate([
            {
                $unwind: { path: "$gender", preserveNullAndEmptyArrays: true }
            },
            {
                $match: {
                    gender: {$in: genderChoices},
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

    if (artChoices.length > 0) {
        matchingArt = await FindFriend.aggregate([
            {
                $unwind: { path: "$art", preserveNullAndEmptyArrays: true }
            },
            {
                $match: { art: {$in: artChoices} },
            },
            {
                $group: {
                    _id: '$userId',
                    artCount: { $sum: 1 }
                }
            }
        ]);
    }

    if (sportChoices > 0) {
        matchingSport = await FindFriend.aggregate([
            {
                $unwind: { path: "$sport", preserveNullAndEmptyArrays: true }
            },
            {
                $match: { sport: {$in: sportChoices} },
            },
            {
                $group: {
                    _id: '$userId',
                    sportCount: { $sum: 1 }
                  }
            }
        ]);
    }

    if (musicChoices.length > 0) {
        matchingMusic = await FindFriend.aggregate([
            {
                $unwind: { path: "$music", preserveNullAndEmptyArrays: true }
            },
            {
                $match: { music: {$in: musicChoices} },
            },
            {
                $group: {
                    _id: '$userId',
                    musicCount: { $sum: 1 }
                  }
            }
        ]);
    }

    if (facultyChoices.length > 0) {
        matchingFaculty = await FindFriend.aggregate([
            {
                $unwind: { path: "$faculty", preserveNullAndEmptyArrays: true }
            },
            {
                $match: { faculty: {$in: facultyChoices} },
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
   
   if (sortedMatch.length > 0) {
       matchedPersonId = sortedMatch[0]._id;
   }

   findFriend.gender = genderChoices;
   findFriend.art = artChoices;
   findFriend.sport = sportChoices;
   findFriend.music = musicChoices;
   findFriend.faculty = facultyChoices;
   findFriend.matchUserId = matchedPersonId;

   findFriend.save();

   return matchedPersonId;
}

async function clearMatch(authHeader) {
    const userID = userAuth.decodeAuthToken(authHeader);

    const user = await FindFriend.findOne({userId: userID});
    
    if (user !== null) {
        const status = await FindFriend.deleteOne(user);
        return status.deletedCount;
        // user.matchUserId = "";
        // user.save();
    }
}



module.exports = { getAllFindFriendsUsers, createMatch, clearMatch }