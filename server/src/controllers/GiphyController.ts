import { Request, Response } from "express";
import axios from "axios";
import { GIPHY_APIKEY2 } from "../constants";
import { randomVerifiedGiphyGameChannelsGif } from "../helpers/index";

export const randomBgGifController = async (req: Request, res: Response) => {
  try {
    const gameChannelUsername: string = randomVerifiedGiphyGameChannelsGif();

    const response = await axios.get("https://api.giphy.com/v1/gifs/random/", {
      params: {
        api_key: GIPHY_APIKEY2,
        tag: gameChannelUsername,
      },
    });

    const responseData = response.data.data;

    const giphyResultObject = {
      mp4_link: responseData.images.hd
        ? responseData.images.hd.mp4
        : responseData.images.original_mp4.mp4,
      user: {
        avatar_url: responseData.user.avatar_url,
        display_name: responseData.user.display_name,
        username: responseData.user.username,
        profile_url: responseData.user.profile_url,
      },
    };

    return res.status(200).json(giphyResultObject);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
