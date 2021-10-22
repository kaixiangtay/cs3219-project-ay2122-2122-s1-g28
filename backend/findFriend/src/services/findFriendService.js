let FindFriend = require("../models/findFriendModel");
let userAuth = require("../middlewares/userAuth");

async function getAllFindFriendsUsers() {
  const users = await FindFriend.find();
  return users;
}

function splitString(data) {
  const dataArr = data.length > 0 ? data.split(",") : "";
  return dataArr;
}

const merge = (arr1, arr2) => {
  let hash = new Map();

  arr1.concat(arr2).forEach((obj) => {
    hash.set(obj._id, Object.assign(hash.get(obj._id) || {}, obj));
  });

  let a3 = Array.from(hash.values());
  return a3;
};

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

async function createMatch(interests, authHeader) {
  const userID = userAuth.decodeAuthToken(authHeader);

  let findFriend = new FindFriend();
  let matchedPersonId = "";

  findFriend.userId = userID;
  const genderChoices = interests.gender;
  const facultyChoices = interests.faculty;
  const artChoices = interests.art;
  const musicChoices = interests.music;
  const sportChoices = interests.sport;
  const isEmptyGender = genderChoices == undefined || genderChoices.length == 0;
  const isEmptyArt = artChoices == undefined || artChoices.length == 0;
  const isEmptyMusic = musicChoices == undefined || musicChoices.length == 0;
  const isEmptySport = sportChoices == undefined || sportChoices.length == 0;
  const isEmptyFaculty =
    facultyChoices == undefined || facultyChoices.length == 0;

  const anyMatch =
    isEmptyArt &&
    isEmptyMusic &&
    isEmptySport &&
    isEmptyGender &&
    isEmptyFaculty;

  if (anyMatch) {
    matchedPersonId = await randomMatch();
  }

  let matchingGender,
    matchingArt,
    matchingSport,
    matchingMusic,
    matchingFaculty;

  if (genderChoices !== undefined || genderChoices > 0) {
    matchingGender = await FindFriend.aggregate([
      {
        $unwind: { path: "$gender", preserveNullAndEmptyArrays: true },
      },
      {
        $match: {
          gender: { $in: genderChoices },
        },
      },
      {
        $group: {
          _id: "$userId",
          genderCount: { $sum: 1 },
        },
      },
    ]);
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

  const result = merge(
    matchingArt,
    merge(
      matchingSport,
      merge(matchingMusic, merge(matchingGender, matchingFaculty))
    )
  );

  result.forEach((curr) => {
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
  let sortedMatch = result.sort((c1, c2) =>
    c1.totalCount < c2.totalCount ? 1 : c1.totalCount > c2.totalCount ? -1 : 0
  );

  if (sortedMatch.length > 0) {
    matchedPersonId = sortedMatch[0]._id;
  }

  findFriend.gender = genderChoices;
  findFriend.art = artChoices;
  findFriend.sport = sportChoices;
  findFriend.music = musicChoices;
  findFriend.faculty = facultyChoices;
  findFriend.matchUserId = matchedPersonId;

  // console.log(sortedMatch);

  const isSameUser = findFriend.userId == findFriend.matchUserId;
  const noMatchingUser = matchedPersonId == "";

  if (isSameUser) {
    return "";
  } else {
    findFriend.save();

    if (noMatchingUser) {
      return matchedPersonId;
    }

    // Only issued matchedPerson jwt token if there is a match
    const matchedPersonToken = userAuth.createMatchingToken(matchedPersonId);
    return matchedPersonToken;
  }
}

async function clearMatch(authHeader) {
  const userID = userAuth.decodeAuthToken(authHeader);

  const user = await FindFriend.findOne({ userId: userID });

  if (user !== null) {
    const status = await FindFriend.deleteOne(user);
    return status.deletedCount;
    // user.matchUserId = "";
    // user.save();
  }
}

module.exports = { getAllFindFriendsUsers, createMatch, clearMatch };
