import mongoose from "mongoose";
import FindFriend from "../models/findfriendModel.js";
import Room from "../models/roomModel.js";

async function getAllFindFriendsUsers() {
	const users = await FindFriend.find();
	return users;
}

async function getUser(userId) {
	const user = await FindFriend.findOne({ userId });
	return user;
}

function isEmptySelection(selection) {
	return selection === undefined || selection.length === 0;
}

function merge(arr1, arr2) {
	const map = new Map();

	if (arr1 !== undefined) {
		arr1.forEach((item) => {
			return map.set(item.id, item);
		});
	}

	if (arr2 !== undefined) {
		arr2.forEach((item) => {
			return map.set(item.id, { ...map.get(item.id), ...item });
		});
	}

	const mergedArr = Array.from(map.values());
	return mergedArr;
}

async function randomMatch() {
	const count = await FindFriend.count();
	const emptyFindFriendDB = count === 0;

	if (emptyFindFriendDB) {
		// No user in database to be matched
		return "";
	}

	// Get a random user who is already in database
	const randomMatchUser = await FindFriend.findOne({
		isRandomSelection: true,
		isMatched: false,
	});

	if (randomMatchUser == null) {
		return "";
	}
	const matchedPersonId = randomMatchUser.userId;
	return matchedPersonId;
}

async function findMatchbyGender(genderChoices) {
	const matchingGender = await FindFriend.aggregate([
		{
			$unwind: { path: "$gender", preserveNullAndEmptyArrays: true },
		},
		{
			$match: {
				$and: [{ gender: { $in: genderChoices } }, { isMatched: false }],
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
			$match: {
				$and: [{ art: { $in: artChoices } }, { isMatched: false }],
			},
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
			$match: {
				$and: [{ sport: { $in: sportChoices } }, { isMatched: false }],
			},
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
			$match: {
				$and: [{ music: { $in: musicChoices } }, { isMatched: false }],
			},
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
			$match: {
				$and: [{ faculty: { $in: facultyChoices } }, { isMatched: false }],
			},
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
			totalCount += curr.genderCount;
		}

		if (curr.facultyCount !== undefined) {
			totalCount += curr.facultyCount;
		}

		if (curr.musicCount !== undefined) {
			totalCount += curr.musicCount;
		}

		if (curr.artCount !== undefined) {
			totalCount += curr.artCount;
		}

		if (curr.sportCount !== undefined) {
			totalCount += curr.sportCount;
		}

		curr["totalCount"] = totalCount;
	});

	const sortedMatchResults = matchResults.sort((c1, c2) => {
		return c1.totalCount < c2.totalCount
			? 1
			: c1.totalCount > c2.totalCount
			? -1
			: 0;
	});

	return sortedMatchResults;
}

function findBestMatch(sortedMatchResults, userId) {
	if (sortedMatchResults.length > 0) {
		let isMatched = false;
		let i;

		for (i = 0; i < sortedMatchResults.length; i++) {
			const currMatchPersonId = sortedMatchResults[i]._id;

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
	let matchingGender;
	let matchingArt;
	let matchingSport;
	let matchingMusic;
	let matchingFaculty;

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
	let existingUser = await getUser(userId);

	if (existingUser !== null && existingUser.isMatched) {
		// return room id if the user is exist in FindFriend DB and has matched with someone
		return existingUser.roomId;
	}

	const anyMatch =
		isEmptyArt &&
		isEmptyMusic &&
		isEmptySport &&
		isEmptyGender &&
		isEmptyFaculty;

	if (anyMatch) {
		findFriend.isRandomSelection = true;
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

		const matchResults = merge(
			matchingArt,
			merge(
				matchingSport,
				merge(matchingMusic, merge(matchingGender, matchingFaculty))
			)
		);

		// return match results based on total number of matching selection fields in descending order
		const sortedMatchResults = sortMatchResults(matchResults, userId);

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

	const isSameUser = findFriend.userId === findFriend.matchUserId;
	const noMatchingUser = matchedPersonId === "";

	if (noMatchingUser || isSameUser) {
		if (!existingUser) {
			await findFriend.save();
		}

		return "";
	} else {
		// Only issued room id if there is a match
		const matchedUser = await getUser(matchedPersonId);
		matchedUser.isMatched = true;
		matchedUser.matchUserId = findFriend.userId;
		findFriend.isMatched = true;

		let room = new Room();
		room.users.push(findFriend.userId, matchedUser.userId);
		findFriend.roomId = room._id;
		matchedUser.roomId = room._id;

		await findFriend.save();
		await matchedUser.save();
		await room.save();
		return room._id;
	}
}

async function clearMatch(userId) {
	const user = await FindFriend.findOne({ userId });

	if (user !== null) {
		const matchedPersonId = user.matchUserId;
		const matchingFriend = matchedPersonId !== "";

		if (matchingFriend) {
			const roomId = user.roomId;
			const matchedFriend = await FindFriend.findOne({ _id: matchedPersonId });
			const room = await Room.findOne({ _id: roomId });

			const matchStatus = await FindFriend.deleteOne(matchedFriend);
			const roomStatus = await Room.deleteOne(room);
		}

		const userStatus = await FindFriend.deleteOne({ id: user._id });

		// Return null if user who cancel the match is deleted succesfully
		return null;
	} else {
		// Return "" if user has already been deleted
		return "";
	}
}

export default { getAllFindFriendsUsers, createMatch, clearMatch };
