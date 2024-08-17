import axios from "axios";
import { Request, Response } from "express";
import { APIKEY } from "../constants";

export const getGameByGuidController = async (req: Request, res: Response) => {
  const { guid } = req.query;
  try {
    if (!guid) return res.status(400).json({ message: "No guid found!" });

    const gameResponse = await axios.get(
      `https://www.giantbomb.com/api/game/${guid.toString()}/?api_key=${APIKEY!}`,
      {
        params: {
          format: "json",
        },
      }
    );
    res.status(200).json(gameResponse.data.results);
  } catch (error) {
    console.error(error);
  }
};
