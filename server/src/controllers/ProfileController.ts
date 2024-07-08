import { Request, Response } from "express";
import { UserModel } from "../models/User";
import mongoose from "mongoose";
import { stringToObjectId } from "../helpers";

export const incrementHeartCountOnProfileController = async (
  req: Request,
  res: Response
) => {
  const { yourUID, otherUserUID } = req.body;

  try {
    if (yourUID && otherUserUID) {
      const transformedYourUID = stringToObjectId(yourUID);
      const transformedOtherUserUID = stringToObjectId(otherUserUID);

      const findUserYouLiked = await UserModel.findById(
        transformedOtherUserUID
      );

      if (findUserYouLiked) {
        // Check if the uid exists in the heartcount array
        const uidIndex = findUserYouLiked.heart.findIndex(
          (item) =>
            item.uid && item.uid.toString() === transformedYourUID.toString()
        );

        if (uidIndex !== -1) {
          // Remove the uid if it exists
          findUserYouLiked.heart.splice(uidIndex, 1);
        } else {
          // Add the uid if it does not exist
          findUserYouLiked.heart.push({ uid: transformedYourUID });
        }

        await findUserYouLiked.save();

        return res.status(200).json({ message: "success liked" });
      }
    } else {
      res.status(400).json({ message: "No UIDs were sent!" });
    }
  } catch (error) {
    console.error(error);
  }
};

export const incrementFollowerCountOnProfileController = async (
  req: Request,
  res: Response
) => {
  const { yourUID, otherUserUID } = req.body;

  try {
    if (yourUID && otherUserUID) {
      const transformedYourUID = stringToObjectId(yourUID);
      const transformedOtherUserUID = stringToObjectId(otherUserUID);

      const findUserYouFollowed = await UserModel.findById(
        transformedOtherUserUID
      );

      const findUserWhoFollowed = await UserModel.findById(transformedYourUID);

      if (findUserYouFollowed && findUserWhoFollowed) {
        // Check if the uid exists in the follower array
        const uidIndex = findUserYouFollowed.follower.findIndex(
          (item) =>
            item.uid && item.uid.toString() === transformedYourUID.toString()
        );

        const otherUidIndex = findUserWhoFollowed.following.findIndex(
          (item) =>
            item.uid &&
            item.uid.toString() === transformedOtherUserUID.toString()
        );

        if (uidIndex !== -1) {
          // Remove the uid if it exists
          findUserYouFollowed.follower.splice(uidIndex, 1);
          findUserWhoFollowed.following.splice(otherUidIndex, 1);
        } else {
          // Add the uid if it does not exist
          findUserYouFollowed.follower.push({ uid: transformedYourUID });
          findUserWhoFollowed.following.push({ uid: transformedOtherUserUID });
        }

        await findUserYouFollowed.save();
        await findUserWhoFollowed.save();

        return res.status(200).json({ message: "success liked" });
      }
    } else {
      res.status(400).json({ message: "No UIDs were sent!" });
    }
  } catch (error) {
    console.error(error);
  }
};

export const addBioController = async (req: Request, res: Response) => {
  try {
    const { yourUID, bio } = req.body;

    if (yourUID) {
      const transformedYourUID = stringToObjectId(yourUID);

      const user = await UserModel.updateOne(
        { _id: transformedYourUID },
        { $set: { bio: bio } }
      );

      if (user) {
        return res.status(200).json({ bio: bio });
      } else {
        return res.status(400).json({ message: "Error adding bio." });
      }
    } else {
      return res.status(400).json({ message: "Cannot proceed on adding bio." });
    }
  } catch (error) {
    console.error(error);
  }
};

export const addGenreController = async (req: Request, res: Response) => {
  try {
    const { yourUID, genre } = req.body;

    if (yourUID) {
      const transformedYourUID = stringToObjectId(yourUID);

      const user = await UserModel.findByIdAndUpdate(transformedYourUID, {
        genre: genre,
      });

      if (user) {
        return res.status(200).json({ message: "Successfully updated genre." });
      } else {
        return res.status(200).json({ message: "Error adding genre!" });
      }
    } else {
      return res
        .status(400)
        .json({ message: "Cannot proceed on adding genre." });
    }
  } catch (error) {
    console.error(error);
  }
};

export const checkProfileRelationshipStatusController = async (
  req: Request,
  res: Response
) => {
  try {
    const { yourUID, otherUserUID } = req.params;
    if (yourUID && otherUserUID) {
      const transformedYourUID = stringToObjectId(yourUID);
      const transformedOtherUserUID = stringToObjectId(otherUserUID);

      const isHeart = await UserModel.findOne({
        _id: transformedOtherUserUID,
        "heart.uid": transformedYourUID,
      });

      const user = await UserModel.findById(transformedYourUID, {
        following: 1,
      });

      const isFollowing = user?.following.some(
        (f: any) => f.uid.toString() === otherUserUID
      );

      return res.status(200).json({ heart: !!isHeart, following: isFollowing });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getUserFollowingController = async (
  req: Request,
  res: Response
) => {
  try {
    const { uid } = req.query;
    if (uid) {
      const transformedUID = stringToObjectId(uid as string);

      const user = await UserModel.findOne({ _id: transformedUID }).populate(
        "following",
        "displayname"
      );

      if (!user) {
        return res.status(400).send("User not found");
      }

      const followingList = user.following;

      const enrichedFollowingList = await UserModel.find(
        {
          _id: { $in: followingList.map((f) => f.uid) },
        },
        "displayname imgURL following"
      );

      // Check if the current user is in the following list of each followed user
      const enrichedFollowingWithMutual = await Promise.all(
        enrichedFollowingList.map(async (followedUser) => {
          const isMutual = followedUser.following.some(
            (f) => f.uid!.toString() === uid
          );
          return {
            ...followedUser.toObject(),
            isMutual,
          };
        })
      );

      res.json(enrichedFollowingWithMutual);
    } else {
      return res
        .status(400)
        .json({ message: "There is wrong fetching following." });
    }
  } catch (error) {
    console.error(error);
  }
};

export const unfollowUserController = async (req: Request, res: Response) => {
  try {
    const { yourUID, otherUserUID } = req.body;

    if (!yourUID || !otherUserUID)
      return res.status(400).json({ message: "Cannot process this action." });

    const transformedYourUID = stringToObjectId(yourUID);
    const transformedOtherUserUID = stringToObjectId(otherUserUID);

    const user = await UserModel.findByIdAndUpdate(transformedYourUID, {
      $pull: { following: { uid: transformedOtherUserUID } },
    });

    if (!user)
      return res.status(400).json({ message: "Cannot find the user." });

    res.status(200).json({ isUnfollowed: !!user });
  } catch (error) {
    console.error(error);
  }
};
