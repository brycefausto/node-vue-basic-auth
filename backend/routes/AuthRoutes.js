import express from "express";
import passport from "passport";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";
import User from "../models/UserModel.js";
import bcrypt from "bcrypt";

const router = express.Router();

router.post(
  "/login",
  passport.authenticate("local"),
  (req, res) => {
    res.json(req.user);
  }
);

router.post("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.end();
  });
});

router.get("/user", AuthMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.session.passport.user);
    res.send({ user: user });
  } catch (error) {
    res.status(404).send("User not found");
  }
});

router.post("/register", async (req, res) => {
  req.body.password = bcrypt.hashSync(
    req.body.password,
    bcrypt.genSaltSync(10)
  );

  const user = new User(req.body);
  try {
    const createdUser = await user.save();
    req.login(user, function (err) {
      if (err) {
        next(err);
      } else {
        res.json(createdUser);
      }
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Some error occurred while registering the user.");
  }
});

export default router;
