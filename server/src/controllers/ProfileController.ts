import { Request, Response } from "express";
import { UserModel } from "../models/User";
import mongoose from "mongoose";
import { stringToObjectId } from "../helpers";

export const addHeartController = async (req: Request, res: Response) => {
  const { yourUID, otherUserUID } = req.body;

  try {
    if (yourUID && otherUserUID) {
      const transformedYourUID = stringToObjectId(yourUID);
      const transformedOtherUserUID = stringToObjectId(otherUserUID);

      const addToYourGivenHeart = await UserModel.updateOne(
        { _id: transformedYourUID },
        { $push: { "heart.given": { uid: transformedOtherUserUID } } }
      );

      const addToOtherUserReceived = await UserModel.updateOne(
        { _id: transformedOtherUserUID },
        { $push: { "heart.received": { uid: transformedYourUID } } }
      );

      if (addToYourGivenHeart && addToOtherUserReceived) {
        return res.status(200).json({ message: "Successfully given heart." });
      } else {
        return res
          .status(400)
          .json({ message: "There is an error adding heart." });
      }
    } else {
      res.status(400).json({ message: "No UIDs were sent!" });
    }
  } catch (error) {
    console.error(error);
  }
};

export const minusHeartController = async (req: Request, res: Response) => {
  const { yourUID, otherUserUID } = req.body;

  try {
    if (yourUID && otherUserUID) {
      const transformedYourUID = stringToObjectId(yourUID);
      const transformedOtherUserUID = stringToObjectId(otherUserUID);

      const minusToYourGivenHeart = await UserModel.updateOne(
        { _id: transformedYourUID },
        { $pull: { "heart.given": { uid: transformedOtherUserUID } } }
      );

      const minusToOtherUserReceived = await UserModel.updateOne(
        { _id: transformedOtherUserUID },
        { $pull: { "heart.received": { uid: transformedYourUID } } }
      );

      if (minusToYourGivenHeart && minusToOtherUserReceived) {
        return res
          .status(200)
          .json({ message: "Successfully deducting heart." });
      } else {
        return res
          .status(400)
          .json({ message: "There is an error subtracting heart." });
      }
    } else {
      res.status(400).json({ message: "No UIDs were sent!" });
    }
  } catch (error) {
    console.error(error);
  }
};

export const getAllHeartController = async (req: Request, res: Response) => {
  const { uid } = req.query;
  try {
    if (uid) {
      const transformedUID = stringToObjectId(uid as string);

      const user = await UserModel.findOne(
        { _id: transformedUID },
        { "heart.received.uid": 1 }
      );

      if (!user) return res.status(400).json({ message: "User not found!" });

      const userList = user.heart?.received;

      const enrichedUserList = await UserModel.find(
        { _id: { $in: userList?.map((h) => h.uid) } },
        "displayname imgURL"
      );

      return res.status(200).json(enrichedUserList);
    } else {
      return res.status(400).json({ message: "No userid was found!" });
    }
  } catch (error) {
    console.error(error);
  }
};

export const addFollowController = async (req: Request, res: Response) => {
  const { yourUID, otherUserUID } = req.body;

  try {
    if (yourUID && otherUserUID) {
      const transformedYourUID = stringToObjectId(yourUID);
      const transformedOtherUserUID = stringToObjectId(otherUserUID);

      const setFollowerToOtherUser = await UserModel.findByIdAndUpdate(
        transformedOtherUserUID,
        { $set: { follower: { uid: transformedYourUID } } }
      );

      const setFollowingToYou = await UserModel.findByIdAndUpdate(
        transformedYourUID,
        { $set: { following: { uid: transformedOtherUserUID } } }
      );

      if (setFollowerToOtherUser && setFollowingToYou) {
        return res.status(200).json({ message: "Success on adding follow." });
      } else {
        return res
          .status(200)
          .json({ message: "There is an error adding follow." });
      }
    } else {
      res.status(400).json({ message: "No UIDs were sent!" });
    }
  } catch (error) {
    console.error(error);
  }
};

export const minusFollowController = async (req: Request, res: Response) => {
  const { yourUID, otherUserUID } = req.body;

  try {
    if (yourUID && otherUserUID) {
      const transformedYourUID = stringToObjectId(yourUID);
      const transformedOtherUserUID = stringToObjectId(otherUserUID);

      const setFollowerToOtherUser = await UserModel.findByIdAndUpdate(
        transformedOtherUserUID,
        { $pull: { follower: { uid: transformedYourUID } } }
      );

      const setFollowingToYou = await UserModel.findByIdAndUpdate(
        transformedYourUID,
        { $pull: { following: { uid: transformedOtherUserUID } } }
      );

      if (setFollowerToOtherUser && setFollowingToYou) {
        return res
          .status(200)
          .json({ message: "Success on deducting follow." });
      } else {
        return res
          .status(200)
          .json({ message: "There is an error deducting follow." });
      }
    } else {
      res.status(400).json({ message: "No UIDs were sent!" });
    }
  } catch (error) {
    console.error(error);
  }
};

export const getAllFollowersController = async (
  req: Request,
  res: Response
) => {
  const { uid } = req.query;
  try {
    if (uid) {
      const transformedUID = stringToObjectId(uid as string);

      const user = await UserModel.findOne(
        { _id: transformedUID },
        { "follower.uid": 1 }
      );

      if (!user) return res.status(400).json({ message: "User not found!" });

      const userList = user.follower;

      const enrichedUserList = await UserModel.find(
        { _id: { $in: userList?.map((f) => f.uid) } },
        "displayname imgURL"
      );

      return res.status(200).json(enrichedUserList);
    } else {
      return res.status(400).json({ message: "No userid was found!" });
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
        "heart.received.uid": transformedYourUID,
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
