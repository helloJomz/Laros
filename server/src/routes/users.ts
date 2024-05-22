import { Router } from "express";
import { UserModel } from "../models/User";

const router = Router();

// FOR SIGNUP USERS
router.post("/signup", async (req, res) => {
  const { firstname, lastname, email, password, dateCreated } = req.body;
  try {
    if (!firstname || !lastname || !email || !password)
      return res.status(400).send({
        message:
          "Send all the required fields: firstname, lastname, email, and password!",
      });

    const newUser = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
    };

    const user = await UserModel.create(newUser);

    return res.status(200).send(user);
  } catch (error) {
    console.error(error);
  }
});

export default router;
