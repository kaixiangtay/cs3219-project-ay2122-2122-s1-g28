let FindFriend = require("../models/findFriendModel");
let userAuth = require("../middlewares/userAuth");

async function getAllFindFriendsUsers() {
  const users = await FindFriend.find();
  return users;
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
  const randomMatch = await FindFriend.findOne().skip(random);

  let matchedPersonId = randomMatch.userId;
  return matchedPersonId;
}

function isEmptySelection(selection) {
  return selection == undefined || selection.length == 0;
}

async function findMatchbyGender(genderChoices) {
  const matchingGender = await FindFriend.aggregate([
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

  return matchingGender;
}

async function findMatchByArt(artChoices) {
  const matchingArt = await FindFriend.aggregate([
    {
      $unwind: { path: "$art", preserveNullAndEmptyArrays: true },
    },
    {
      $match: { art: { $in: artChoices } },
    },
    {
      $group: {
        _id: "$userId",
        artCount: { $sum: 1 },
      },
    },
  ]);

  return matchingArt;
}

async function findMatchBySport(sportChoices) {
  const matchingSport = await FindFriend.aggregate([
    {
      $unwind: { path: "$sport", preserveNullAndEmptyArrays: true },
    },
    {
      $match: { sport: { $in: sportChoices } },
    },
    {
      $group: {
        _id: "$userId",
        sportCount: { $sum: 1 },
      },
    },
  ]);

  return matchingSport;
}

async function findMatchByMusic(musicChoices) {
  const matchingMusic = await FindFriend.aggregate([
    {
      $unwind: { path: "$music", preserveNullAndEmptyArrays: true },
    },
    {
      $match: { music: { $in: musicChoices } },
    },
    {
      $group: {
        _id: "$userId",
        musicCount: { $sum: 1 },
      },
    },
  ]);

  return matchingMusic;
}

async function findMatchByFaculty(facultyChoices) {
  const matchingFaculty = await FindFriend.aggregate([
    {
      $unwind: { path: "$faculty", preserveNullAndEmptyArrays: true },
    },
    {
      $match: { faculty: { $in: facultyChoices } },
    },
    {
      $group: {
        _id: "$userId",
        facultyCount: { $sum: 1 },
      },
    },
  ]);

  return matchingFaculty;
}

function sortMatchResults(matchResults) {
  matchResults.forEach((curr) => {
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

  let sortedMatchResults = matchResults.sort((c1, c2) =>
    c1.totalCount < c2.totalCount ? 1 : c1.totalCount > c2.totalCount ? -1 : 0
  );

  return sortedMatchResults;
}

function findBestMatch(sortedMatchResults, userId) {
  if (sortedMatchResults.length > 0) {
    let isMatched = false;
    for (i = 0; i < sortedMatchResults.length; i++) {
      let currMatchPersonId = sortedMatchResults[i]._id;

      if (currMatchPersonId !== userId) {
        isMatched = true;
        return currMatchPersonId;
      } else {
        continue;
      }
    }

    if (!isMatched) {
      // No suitable match found
      return "";
    }
  } else {
    // No suitable match found
    return "";
  }
}

async function createMatch(interests, userId) {
  let findFriend = new FindFriend();
  let matchedPersonId = "";
  let matchingGender,
    matchingArt,
    matchingSport,
    matchingMusic,
    matchingFaculty;

  const genderChoices = interests.gender;
  const facultyChoices = interests.faculty;
  const artChoices = interests.art;
  const musicChoices = interests.music;
  const sportChoices = interests.sport;

  const isEmptyGender = isEmptySelection(genderChoices);
  const isEmptyArt = isEmptySelection(artChoices);
  const isEmptyMusic = isEmptySelection(musicChoices);
  const isEmptySport = isEmptySelection(sportChoices);
  const isEmptyFaculty = isEmptySelection(facultyChoices);

  const anyMatch =
    isEmptyArt &&
    isEmptyMusic &&
    isEmptySport &&
    isEmptyGender &&
    isEmptyFaculty;

  if (anyMatch) {
    matchedPersonId = await randomMatch();
  } else {
    // preference match

    if (!isEmptyGender) {
      matchingGender = await findMatchbyGender(genderChoices);
    }

    if (!isEmptyArt) {
      matchingArt = await findMatchByArt(artChoices);
    }

    if (!isEmptySport) {
      matchingSport = await findMatchBySport(sportChoices);
    }

    if (!isEmptyMusic) {
      matchingMusic = await findMatchByMusic(musicChoices);
    }

    if (!isEmptyFaculty) {
      matchingFaculty = await findMatchByFaculty(facultyChoices);
    }

    let matchResults = merge(
      matchingArt,
      merge(
        matchingSport,
        merge(matchingMusic, merge(matchingGender, matchingFaculty))
      )
    );

    // return match results based on total number of matching selection fields in descending order
    let sortedMatchResults = sortMatchResults(matchResults, userId);

    // Find the best match result
    matchedPersonId = findBestMatch(sortedMatchResults);
  }

  findFriend.userId = userId;
  findFriend.gender = genderChoices;
  findFriend.art = artChoices;
  findFriend.sport = sportChoices;
  findFriend.music = musicChoices;
  findFriend.faculty = facultyChoices;
  findFriend.matchUserId = matchedPersonId;

  const isSameUser = findFriend.userId == findFriend.matchUserId;
  const noMatchingUser = matchedPersonId == "";

  if (isSameUser) {
    // Do not save in FindFriend database, data exists already
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

async function clearMatch(userId) {
  const user = await FindFriend.findOne({ userId: userId });

  if (user !== null) {
    const status = await FindFriend.deleteOne(user);
    return status.deletedCount;
    // user.matchUserId = "";
    // user.save();
  }
}

module.exports = { getAllFindFriendsUsers, createMatch, clearMatch };
